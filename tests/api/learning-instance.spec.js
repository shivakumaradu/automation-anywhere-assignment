const { test, expect } = require('@playwright/test');
const fs = require('fs');

test.describe('Use Case 3: Learning Instance API Flow', () => {

  test('Create and Validate Learning Instance v3', async ({ request }) => {

    // ---- Load auth token ----
    const authData = JSON.parse(fs.readFileSync('auth.json', 'utf-8'));
    const apiToken = authData.capturedToken;

    expect(apiToken, 'Auth token must exist').toBeTruthy();

    // ---- Load required IDs from env ----
    const DOMAIN_ID = process.env.DOMAIN_ID;
    const DOMAIN_LANGUAGE_ID = process.env.DOMAIN_LANGUAGE_ID;
    const DOMAIN_LANGUAGE_PROVIDER_ID = process.env.DOMAIN_LANGUAGE_PROVIDER_ID;

    expect(DOMAIN_ID).toBeTruthy();
    expect(DOMAIN_LANGUAGE_ID).toBeTruthy();
    expect(DOMAIN_LANGUAGE_PROVIDER_ID).toBeTruthy();

    const instanceName = `API_LI_V3_${Date.now()}`;
    const startTime = Date.now();

    // 2) Create Learning Instance with ONE valid field
    const response = await request.post('/cognitive/v3/learninginstances', {
      headers: {
        'X-Authorization': apiToken,
        'Content-Type': 'application/json'
      },
      data: {
        name: instanceName,
        description: '',
        domainId: DOMAIN_ID,
        domainLanguageId: DOMAIN_LANGUAGE_ID,
        domainLanguageProviderId: DOMAIN_LANGUAGE_PROVIDER_ID,
        fields: [
          {
            name: 'custom_text_1',
            displayName: 'Custom Text 1',
            dataType: 'TEXT',
            featureType: 'KEY_VALUE',
            isCustom: true
          }
        ],
        genaiProvider: 'Open_AI',
        useGenai: true,
        isGenAIEnabled: true,
        isHeuristicFeedbackEnabled: true,
        locale: 'en-US',
        isDefault: true,
        isCloudExtraction: false,
        tables: []
      }
    });

    const responseTime = Date.now() - startTime;
    const responseBodyText = await response.text();

    // ---- VALIDATIONS ----
    expect(
      [200, 201],
      `Unexpected status: ${response.status()} - ${responseBodyText}`
    ).toContain(response.status());

    expect(responseTime).toBeLessThan(15000);

    const body = JSON.parse(responseBodyText);

    // Schema validation
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('status');

    // Functional accuracy
    expect(body.name).toBe(instanceName);

    console.log(`✅ Learning Instance created successfully: ${body.id}`);
  });

});

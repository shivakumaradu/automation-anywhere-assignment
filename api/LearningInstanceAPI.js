const { expect } = require('@playwright/test');

class LearningInstanceAPI {
    constructor(request, baseUrl) {
        this.request = request;
        this.baseUrl = baseUrl.replace(/\/$/, ""); // Ensure no trailing slash
        this.token = '';
    }

    async login(username, password) {
        const response = await this.request.post(`${this.baseUrl}/v1/authentication`, {
            data: { username, password }
        });
        
        const body = await response.json();
        this.token = body.token;
        return this.token;
    }

    async createLearningInstance(instanceName) {
        const startTime = Date.now();
        // Updated endpoint commonly used in Community Edition for Learning Instances
        const response = await this.request.post(`${this.baseUrl}/v1/AI/learning-instances`, {
            headers: { 
                'X-Authorization': this.token,
                'Content-Type': 'application/json'
            },
            data: {
                name: instanceName,
                description: "API Test Instance",
                // Ensure documentTypeId matches the system's internal keys (e.g. 1 for Invoices)
                documentTypeId: "1", 
                language: "English"
            }
        });

        const duration = Date.now() - startTime;
        return { response, duration };
    }
}

module.exports = { LearningInstanceAPI };
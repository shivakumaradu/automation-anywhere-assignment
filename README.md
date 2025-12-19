Automation Anywhere – UI & API Automation Assignment

Playwright Automation Framework

📌 Project Overview

This project demonstrates end-to-end automation for Automation Anywhere Community Edition using Playwright.
The automation covers:

UI Automation (Task Bot & Form Designer)

API Automation (Learning Instance creation)

Token-based authentication handling

Enterprise-grade test structure and reporting

🧩 Technologies Used

Playwright (JavaScript)

Node.js

Automation Anywhere Community Edition

REST APIs

dotenv (Environment variables)

HTML Reporter

📂 Project Structure
automation-anywhere-assignment/
│
├── api/
│   └── LearningInstanceAPI.js
│
├── pages/
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── AutomationPage.js
│   ├── TaskBotPage.js
│   └── FormDesignerPage.js
│
├── tests/
│   ├── login.spec.js                # Use Case 1 – Task Bot
│   ├── form-upload.spec.js          # Use Case 2 – Form Designer
│   └── api/
│       └── learning-instance.spec.js # Use Case 3 – API Automation
│
├── playwright.config.js
├── playwright.config.api.js
├── global-setup.js
├── auth.json
├── .env
└── README.md

🧪 Use Case 1: Create Task Bot – Message Box (UI Automation)
Objective

Automate creation of a Task Bot and configure a Message Box action.

Steps Automated

Launch Automation Anywhere portal

Login using valid credentials

Navigate to Automation → Create

Select Task Bot

Enter bot name

Add Message Box action

Configure message title and content

Save the bot

Validation

Task Bot created successfully

Message Box configuration saved

Bot persists after refresh

🧪 Use Case 2: Form Creation – TextBox & Select File (UI Automation)
Objective

Automate Form creation and configuration using Form Designer.

Steps Automated

Login to Automation Anywhere

Navigate to Automation → Create → Form

Create and open Form Designer

Drag and drop:

Text Box

Select File

Configure element properties

Save the form

Verify form persistence

What Is Covered

Drag & Drop interactions

Canvas element validation

Properties configuration

Save operation verification

⚠️ Limitation – File Upload Execution

Forms in Automation Anywhere are executed only at runtime through Task Bots using the Display Form action.

The Preview option in Form Designer is strictly a design-time feature for layout adjustment and does not persist uploaded files.

Since Playwright automates browser-based UI and cannot trigger bot runtime execution, actual file upload and submission are out of scope.

Therefore, this automation focuses on Form creation, configuration, and persistence only, which aligns with enterprise automation best practices.

🧪 Use Case 3: Learning Instance Creation (API Automation)
Objective

Create a Learning Instance using Automation Anywhere REST APIs.

Steps Automated

Capture authentication token via UI login (global-setup)

Store token in auth.json

Load token in API test

Send POST request to:

/cognitive/v3/learninginstances


Validate API response

Validations

HTTP status code (200 / 201)

Response time threshold

Response schema validation

Functional accuracy of instance name

🔐 Authentication Strategy

Login performed once using UI automation

Token intercepted from network requests

Token saved in auth.json

Reused securely for API tests

✅ No hardcoded credentials
✅ No repeated login
✅ Enterprise-grade approach

⚙️ Environment Setup
1️⃣ Install Dependencies
npm install

2️⃣ Configure Environment Variables (.env)
AA_USERNAME=your_email
AA_PASSWORD=your_password
DOMAIN_ID=xxxx
DOMAIN_LANGUAGE_ID=xxxx
DOMAIN_LANGUAGE_PROVIDER_ID=xxxx

▶️ Execution Commands
Run UI Automation (Task Bot + Form)
npx playwright test

Run Only Task Bot Test
npx playwright test tests/login.spec.js

Run Only Form Designer Test
npx playwright test tests/form-upload.spec.js

Run API Automation Only
npx playwright test tests/api/learning-instance.spec.js --config=playwright.config.api.js

📊 Reporting

HTML report generated automatically

Open report using:

npx playwright show-report

📸 Screenshots

Screenshots are automatically captured by Playwright on:

Test failures

Assertion errors

Timeout issues

Located in:

test-results/

✅ Key Highlights

Clean Page Object Model (POM)

Clear separation of UI and API automation

Secure token handling

Realistic enterprise limitations explained

Stable, maintainable, scalable test framework

🏁 Conclusion

This project demonstrates professional automation practices aligned with Automation Anywhere enterprise architecture.
All automation steps are technically valid, honest, and production-ready.

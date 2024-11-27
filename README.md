# System for Managing Professional Internship Applications

An application to manage **professional internship applications**. It provides a public page for students to fill out a form with their details and a private section for the department director to manage submissions. Submitted data can be sent via email and optionally stored in a database.

---

## **Table of Contents**

1. [Overview](#overview)
2. [Features](#features)
3. [User Stories](#user-stories)
4. [Infrastructure Overview](#infrastructure-overview)
5. [Folder Structure](#folder-structure)
6. [Deployment to AWS Amplify](#deployment-to-aws-amplify)
7. [Amazon SES Setup](#amazon-ses-setup)
8. [Testing](#testing)
9. [References](#references)

---

## **Overview**

### **Features**

#### For Students

- A public page with:
  - A form to submit required information.
  - Mandatory fields with dropdowns for specific data.
  - Real-time validations for completeness and correctness.
  - Email validation for common domains (e.g., Gmail, Hotmail).

#### For Department Directors

- A private dashboard with:
  - Options to view, edit, and download student data.
  - An ability to update the destination email for submissions.
  - (Optional) Modify the form fields as needed.

---

#### Nice to Have

- Limit the number of emails per day to avoid spam and attacks.
- A modal displaying a message if a user attempts to submit data outside of service hours.

## **User Stories**

### **Student**

1. Access the form via a shared URL.
2. Complete and submit the form.
3. Receive a confirmation page after successful submission.

### **Department Director**

1. Log in using an email and password.
2. Access a dashboard with the following options:
   - View and filter submitted applications.
   - Download data as a CSV file.
   - Update the email recipient for submissions.
   - (Optional) Modify form fields.

---

## **Infrastructure Overview**

- **DynamoDB:** Stores student data securely.
- **Next.js:** Full-stack framework for front-end and back-end.
- **Node.js:** Server-side integration within Next.js.
- **JWT:** Secures private pages and authenticates users.
- **AWS Amplify:** Hosts the application and manages deployments.
- **AWS SES:** Sends emails to department directors.

---

## Folder structure

```bash
/internship-applications
├── /app
│   ├── /amplify         // Created when running `amplify init`. Serves as the central hub for managing AWS cloud resources.
│   ├── /api             // Folder and its content are created manually by the developer and contain the application endpoints.
│   │   ├── /email
│   │   │   └── route.ts             // API route responsible for sending an email to the Director and saving data to DynamoDB.
│   │   ├── /login
│   │   │   └── route.ts             // API route for handling user login.
│   │   ├── /logout
│   │   │   └── route.ts             // API route for handling user logout.
│   │   └── /register
│   │       └── route.ts             // API route for registering a new user.
│   ├── /components        // Folder and its content are created manually by the developer. Contains all UI components.
│   │   ├── /button
│   │   │   └── Button.tsx
│   │   ├── /card
│   │   │   └── Card.tsx
│   │   ├── /error
│   │   │   └── Error.tsx
│   │   ├── /filter
│   │   │   ├── Filter.tsx     // Filter UI, uses a StudentFilter instance to handle filtering. Calls Select and Table components.
│   │   │   └── utilities.ts   // Filter controller, StudentFilter definition using a Facade pattern allowing multiple instances.
│   │   ├── /footer
│   │   │   └── Footer.tsx
│   │   ├── /forms
│   │   │   ├── /login
│   │   │   │     ├── LoginForm.tsx
│   │   │   │     └── loginSchema.ts
│   │   │   ├── /register
│   │   │   │     ├── RegisterForm.tsx
│   │   │   │     └── registerSchema.ts
│   │   │   └── /student
│   │   │         ├── StudentForm.tsx
│   │   │         └── studentSchema.ts
│   │   ├── /header
│   │   │   └── Header.tsx
│   │   ├── /select
│   │   │   └── Select.tsx
│   │   ├── /table
│   │   │   └── Table.tsx
│   ├── /students
│   │   ├── page.tsx                   // Public page with the form for student applications.
│   │   └── /success
│   │       └── page.tsx               // Public page for successful submission redirect.
│   ├── /private                       // Private pages, only accessible after successful login.
│   │   ├── /queries
│   │   │     ├── page.tsx             // Page for the Director to search student applications stored in the system.
│   │   │     └── /studentDetail
│   │   │           └── /[numeroControl]  // This folder [syntax] is used to dynamically generate a number in the URL.
│   │   │                 └── page.tsx
│   ├── /register
│   │     └── page.tsx                 // Public page containing the RegisterForm component. Its URL is: /register.
│   ├── /page.tsx                      // HOME PAGE, main page.
│   └── layout.ts                      // Custom layout component for all pages.
├── /lib
│   ├── dynamodb.ts                   // Utility to interact with DynamoDB.
│   └── email.ts                      // Utility to send emails.
├── /security
│   ├── logout.ts                     // Function to fetch the logout route, clear localStorage, and redirect to the login page.
│   └── password.ts                   // Utility to hash passwords before saving them in DynamoDB.
├── /types
│   ├── login.ts                      // Type definitions related to login (e.g., LoginData, CleanedItem).
│   └── student.ts                    // Type definitions related to students (e.g., StudentDynamoDB, StudentFormData).
├── /public
│   └── favicon.ico                   // Favicon and other static assets.
├── .env.local                        // Environment variables for sensitive data.
├── .gitignore                        // Git ignore file.
├── middleware.ts                     // Middleware configuration file.
├── package.json                      // Project dependencies and scripts, created by `npx create-next-app`.
└── README.md                         // Project documentation.
```

## **Deployment to AWS Amplify**

AWS Amplify is an Amazon service that allows you to host interactive applications, unlike S3, which is mainly for static site hosting. Amplify handles interaction with other Amazon services with less effort, making it ideal for full-stack applications. Since our app is developed in Next.js, which is a "full stack framework," AWS Amplify is a perfect fit for hosting and managing our app's backend and frontend.

### Getting Started with AWS Amplify

There are hundreds of tutorials and videos showing how to clone the official AWS Amplify skeleton repository for Next.js and then modify it according to specific needs. However, in this case, the project was started without the idea of using Amplify to host the app. Therefore, some configurations were needed to fit Amplify to this project, but these adjustments were relatively straightforward.

### Preparing the Repository for Amplify

1. **Install AWS Amplify CLI (optional):**

   - Install the Amplify CLI if it is not already installed on your machine. Run the following command:
     ```bash
     npm install -g @aws-amplify/cli
     ```

2. **Integrate Amplify with the Current Project:**
   - Use the following command to initialize Amplify in your project directory:
     ```bash
     npm create amplify@latest
     ```
   - This command initializes the Amplify project and creates the necessary files and folders, such as `amplify/`, `amplify.yml`, and `amplify/backend/`.

### Create an Application in Amplify

1. **Navigate to AWS Amplify Console:**

   - Go to [AWS Amplify Console](https://us-east-2.console.aws.amazon.com/amplify/) in your browser.

2. **Create a New App:**

   - Click on the "Create app" button.
   - Select "GitHub" as the source for your code repository.

3. **Connect Your GitHub Repository:**

   - Select the repository. If this is your first time connecting GitHub, a pop-up will ask for permissions for AWS Amplify to access your repositories or a specific repository.
   - After granting permissions, select the project repository from the list.

4. **Choose a Branch:**

   - Select a branch that will be used as the production branch. This does not have to be your main branch.

5. **Deploy the Application:**
   - This will initiate the first-time deployment and build process. It typically takes around 4 minutes for the initial deployment. Once the deployment is complete, use the deployment URL to test the app and confirm that all functionality is working correctly.

### Amazon SES Setup

#### Register Sender and Recipient Email Addresses with Amazon SES

Amazon SES (Simple Email Service) is an Amazon service for sending emails that can be integrated with our application. To configure it for our app, follow these steps:

1. **Navigate to the Amazon SES Console:**

   - Go to the [Amazon SES Console](https://us-east-2.console.aws.amazon.com/amazon-ses/).

2. **Verify Email Addresses:**

   - Register the sender email. It can be from any domain. This process is called "Verify Identity."
   - Register the recipient email. It can be from any domain. This is also done through "Verify Identity."

3. **Complete the Verification Process:**
   - Follow the steps to complete the verification, which includes clicking on a link sent to the email address to verify ownership. Therefore, you need access to the email address.

_For development and QA environments, this is all that is needed to send and receive emails through Amazon SES. However, to send emails to unverified email addresses, additional steps are required to move out of the SES sandbox environment._

#### Create Permissions to Send Emails

1. **Create a New IAM User for SES:**

   - Create a new IAM user dedicated to sending emails via SES.

2. **Create and Save Access Keys:**

   - Generate an access key ID and secret access key for the IAM user. These will be set in your repository and in Amplify as environment variables to allow your app to send emails through Amazon SES.

3. **Create a Policy with SES Permissions:**

   - Create a custom IAM policy that grants permissions to send emails using SES.

4. **Create a Group and Assign the Policy:**
   - Create an IAM group, attach the SES policy to this group, and assign the new IAM user to this group.

### Install Amazon SES Dependencies in the Repository

1. **Install AWS SDK for SES:**
   - Run the following command to install the AWS SDK for SES:
   ```bash
   npm install @aws-sdk/client-ses
   ```
2. **Add follwing enviroment variables to your _.env.local_ file**
   ```
   SES_REGION=us-east-2
   SES_ACCESS_KEY_ID=your-access-key-id
   SES_SECRET_ACCESS_KEY=your-secret-access-key
   SES_FROM_EMAIL=your-verified-sender-email@example.com
   ```
3. **Modify the /lib/email.ts file to use Amazon SES instead of Nodemailer.**

   ```ts
   // /lib/email.tsx
   import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

   const sesClient = new SESClient({
     region: process.env.SES_REGION,
     credentials: {
       accessKeyId: process.env.SES_ACCESS_KEY_ID || "",
       secretAccessKey: process.env.SES_SECRET_ACCESS_KEY || "",
     },
   });

   export const sendEmail = async (
     email: string,
     nombre: string,
     nombreEmpresa: string
   ) => {
     if (!process.env.SES_ACCESS_KEY_ID || !process.env.SES_SECRET_ACCESS_KEY) {
       console.error("Missing AWS SES credentials in environment variables.");
       throw new Error("AWS SES credentials are not properly configured.");
     }

     const params = {
       Source: process.env.SES_FROM_EMAIL,
       Destination: {
         ToAddresses: [email],
       },
       Message: {
         Subject: {
           Data: nombre,
         },
         Body: {
           Text: {
             Data: nombreEmpresa,
           },
         },
       },
     };

     try {
       const command = new SendEmailCommand(params);
       const response = await sesClient.send(command);
       console.log("Email sent successfully:", response);
       return response;
     } catch (error) {
       console.error(
         `Error at /lib/email.ts sending email: ${error} Val params: ${JSON.stringify(
           params
         )}`
       );
       throw new Error("Failed to send email");
     }
   };
   ```

4. **Start up the app locally, you should be able to send email through SES locally now.**
   ```bash
   npm run dev
   ```

#### Deploy the App to Amplify

1. **Create Environment Variables in the Amplify App:**

   - Navigate to **Hosting** > **Environment variables** in the Amplify console and replicate the environment variables from your `.env.local` file.

2. **Update `amplify.yml` to Use New Variables:**

   - Navigate to **Hosting** > **Building Settings** and add following lines to make sure these variables are used

   ```yaml
   commands:
     - env | grep -e SES_REGION -e SES_ACCESS_KEY_ID -e SES_SECRET_ACCESS_KEY -e SES_FROM_EMAIL >> .env.production
     - "echo SES_ACCESS_KEY_ID: $SES_ACCESS_KEY_ID"
     - "echo SES_SECRET_ACCESS_KEY: $SES_SECRET_ACCESS_KEY"
   ```

3. **Run a Manual Deploy or Trigger a New Deployment:**

   - You can either manually trigger a deployment from the Amplify console or make a minor change (e.g., to `README.md`) to trigger a new deployment. This should take between 2-3 minutes.

4. **Test the Application:**
   - Use the deployment URL provided by Amplify to open the app and test it. If everything works, your app is successfully deployed and configured to send emails via Amazon SES.

_IMPORTANT: to debug and see any error or logs, navigate to **Hosting > Monitoring > Hosting compute logs** and click on the link below **CloudWatch log streams**_

#### Testing

##### Unit testing: Jest

###### Initial set up

1. Install following dependencies:

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-jest @types/jest @types/react @types/react-dom
```

2. Configure Jest for Next.js. Create a `jest.config.js` file at the root of your project:

```javascript
module.exports = {
  preset: "ts-jest", // Use ts-jest for transpilation
  testEnvironment: "jsdom", // Use jsdom for DOM-related tests
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Include custom setup
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transpile TypeScript and JSX
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json",
    },
  },
};
```

3. Create a `jest.setup.js` file to include any additional setup for Jest, like importing `@testing-library/jest-dom`:

```javascript
require("@testing-library/jest-dom");
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;
```

4. Create a `tsconfig.jest.json` file which is a `tsconfig.json` file extension but only to be used by Jest and adding some settings exclusively to be used by Jest to use TS.

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "node"
  }
}
```

###### Run tests

To run all tests, use:

```bash
npm run test
```

To run a specific test by file name you can use regex

```bash
npm test -- Filename.test
```

## References

- [Crea Aplicacion en tiempo Record con Nextjs y AWS Amplify (Gen2)](https://www.youtube.com/watch?v=EJjiK16Lw_8&t=829s)
- [Deploy Next.js (Miro) App on AWS Amplify w/ Env Variables in 10 min!!!](https://www.youtube.com/watch?v=-7pPvRzvYjM)
- [Why I love AWS Amplify - Deploy Next.js (T3 Stack) in 5 minutes](https://www.youtube.com/watch?v=0B-hMvMggm8)
- [Uniforms - Basic uniforms usage](https://uniforms.tools/docs/tutorials-basic-uniforms-usage/)
- [`NextRouter` was not mounted](https://nextjs.org/docs/messages/next-router-not-mounted)
- [Next.js Jest test, extended-expect](https://nextjs.org/docs/app/building-your-application/testing/jest)

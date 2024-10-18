# README

## System for Managing Professional Internship Applications

An application to handle requests for **professional internship applications**. The app will have a page where students can fill out a form with their information. After submission, this data will be sent via email to the **department director**. Optionally, the data can also be stored in a database.

The app will help **students** to:

- Avoid sending incomplete data that could delay their application.
- Verify the data they are submitting to reduce the chances of rejection by the department director.

The app will help the **department director** to:

- Reduce back-and-forth communication due to incomplete information.
- Process only complete student information.

## Requirements

This application should have:

- A public page for students with:

  - A form for students to fill out and submit their data. The form should have the following:
    - Mandatory fields
    - Fields with options displayed as dropdowns
    - Validations to ensure fields are not submitted empty
    - Validation before submission
    - Email validation for common domains (e.g., Gmail, Hotmail)

- A login page for the administrator to access the private pages of the app:
  - A page for the administrator with links to the following subpages:
    - View data from the database
    - Update the email address where data is sent
    - Update the form (desirable but not essential) by adding, removing, or updating fields

### Nice to Have

- Limit the number of emails per day to avoid spam and attacks.
- A modal displaying a message if a user attempts to submit data outside of service hours.

#### Actors:

- **Department Director**
- **Students**

#### User Stories

**Student**

1. Accesses the form through a URL sent manually via email or WhatsApp.
2. Fills out their information in the form. If the data is incomplete or incorrect, the form will indicate that there is an issue and prompt the user to review their input.
3. After reviewing the form, the student will click on "Submit."
4. Once the server confirms that the data has been successfully sent, the user will be redirected to another page indicating that the process is complete.

**Department Director**

1. Accesses a public page with a form requesting their email and password.
2. After logging in, they are redirected to a page with buttons for the following options:
   - Download data as a CSV file
   - Update the email address where the data is sent
   - Update the form (desirable but not essential) by adding, removing, or updating fields
   - View data from the database

## Infrastructure Overview

- **DynamoDB**: As the database to store student data
- **Next.js**: As the framework to build both the front-end and back-end
- **Node.js**: Integrated within Next.js
- **JWT**: To secure private pages
- **AWS Amplify**: Amazon service to host interactive applications, perfect for our project
- **AWS SES**: Amazon SES (Simple Email Service) is an Amazon service for sending emails

## Folder structure

```bash
/internship-applications
├── /app
│   ├── /components
│   │   ├── /button
│   │   │   └── Button.tsx
│   │   ├── /card
│   │   │   └── Card.tsx
│   │   ├── /error
│   │   │   └── Error.tsx
│   │   ├── /filter
│   │   │   ├── Filter.tsx
│   │   │   └── utilities.ts
│   │   ├── /footer
│   │   │   └── Footer.tsx
│   │   ├── /forms
│   │   │   ├── /login
│   │   │   │     ├── LoginForm.tsx
│   │   │   │     └── loginScheme.ts
│   │   │   ├── /register
│   │   │   │     ├── RegisterForm.tsx
│   │   │   │     └── registerScheme.ts
│   │   │   └── /student
│   │   │   │     ├── StudentForm.tsx
│   │   │   │     └── studentScheme.ts
│   │   ├── /header
│   │   │   └── Header.tsx
│   │   ├── /select
│   │   │   └── Select.tsx
│   │   ├── /table
│   │   │   └── Table.tsx
│   ├── /students
│   │   ├── page.tsx                   // Public page with the form for student applications
│   │   └── /success
│   │       └── page.tsx               // Public page for successful submission redirect
│   ├── /private
│   │   ├── /login
│   │   │   └── page.tsx               // Login page for private user type
│   │   ├── /dashboard
│   │   │   └── page.tsx               // Dashboard page after login with buttons to other private pages
│   │   ├── /page1
│   │   │   └── page.tsx               // First private page
│   │   └── /page2
│   │       └── page.tsx               // Second private page
│   ├── /api
│   │   ├── /email
│   │   │   └── route.ts             // API route to handle form submission and store data in DynamoDB
│   │   └── /auth
│   │       └── login.ts              // API route for handling user login
│   └── layout.ts                     // Custom layout component for all pages
├── /lib
│   ├── dynamodb.ts                   // Utility to interact with DynamoDB
│   └── email.ts                      // Utility to send emails
├── /utils
│   ├── auth.ts                       // Utility functions for authentication
│   └── validate.ts                   // Utility for form validation
├── /styles
│   ├── globals.css                   // Global styles
│   └── StudentForm.module.css        // Styles specific to StudentForm component
├── /public
│   └── favicon.ico                   // Favicon and other static assets
├── /types
│   ├── student.ts                    // Type definitions related to students (e.g., StudentDynamoDB, CleanedItem)
├── .env                              // Environment variables for sensitive data
├── .gitignore                        // Git ignore file
├── package.tson                      // Project dependencies and scripts
└── README.md                         // Project documentation
```

## Deployment to AWS Amplify

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

## References

- [Crea Aplicacion en tiempo Record con Nextjs y AWS Amplify (Gen2)](https://www.youtube.com/watch?v=EJjiK16Lw_8&t=829s)
- [Deploy Next.js (Miro) App on AWS Amplify w/ Env Variables in 10 min!!!](https://www.youtube.com/watch?v=-7pPvRzvYjM)
- [Why I love AWS Amplify - Deploy Next.js (T3 Stack) in 5 minutes](https://www.youtube.com/watch?v=0B-hMvMggm8)
- [Uniforms - Basic uniforms usage](https://uniforms.tools/docs/tutorials-basic-uniforms-usage/)
- [`NextRouter` was not mounted](https://nextjs.org/docs/messages/next-router-not-mounted)

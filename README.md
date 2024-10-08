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
- **Nodemailer**: As a dependency to send form data to the **department director**
- **Node.js**: Integrated within Next.js
- **AWS S3**: To host the system
- No domain is needed at this time, as the link will be sent directly to the **students**
- **JWT**: To secure private pages

## Folder structure

```bash
/internship-applications
├── /app
│   ├── /students
│   │   ├── page.js               // Public page with the form for student applications
│   │   └── success               // Folder for the success page route
│   │       └── page.js           // Public page for successful submission redirect
│   ├── /private
│   │   ├── /login
│   │   │   └── page.js           // Login page for private user type
│   │   ├── /dashboard
│   │   │   └── page.js           // Dashboard page after login with buttons to other private pages
│   │   ├── /page1
│   │   │   └── page.js           // First private page
│   │   └── /page2
│   │       └── page.js           // Second private page
│   ├── /api
│   │   ├── /students
│   │   │   └── submit.js         // API route to handle form submission and store data in DynamoDB
│   │   └── /auth
│   │       └── login.js          // API route for handling user login
│   └── layout.js                 // Custom layout component for all pages
├── /components
│   ├── StudentForm.js            // Component for the student application form
│   ├── LoginForm.js              // Component for the login form
│   ├── DashboardButtons.js       // Component to display buttons on the dashboard
│   └── PrivatePageLayout.js      // Layout component for private pages
├── /lib
│   ├── dynamodb.js               // Utility to interact with DynamoDB
│   └── email.js                  // Utility to send emails
├── /utils
│   ├── auth.js                   // Utility functions for authentication
│   └── validate.js               // Utility for form validation
├── /styles
│   ├── globals.css               // Global styles
│   └── StudentForm.module.css    // Styles specific to StudentForm component
├── /public
│   └── favicon.ico               // Favicon and other static assets
├── .env                          // Environment variables for sensitive data
├── .gitignore                    // Git ignore file
├── package.json                  // Project dependencies and scripts
└── README.md                     // Project documentation

```

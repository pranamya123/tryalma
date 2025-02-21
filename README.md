# TryAlma - Next.js Project

## Table of Contents

1. [Overview](#overview)
2. [Demo](#demo)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Authentication](#authentication)
6. [Folder Structure](#folder-structure)
7. [Technologies Used](#technologies-used)
8. [State Management using Redux](#state-mgmt)
9. [Mock APIs](#mock-api)
10. [License](#license)

## Overview

**TryAlma** is a Next.js web application designed to provide a seamless experience for managing leads. The app includes two main pages:
- **Lead Form** - A page for submitting lead information.
- **Leads Dashboard** - A page for viewing the submitted leads.

The application includes authentication functionality and requires users to log in before accessing the Leads Dashboard.

## Demo

Lead Form-1

<img width="1440" alt="Screen Shot 2025-02-21 at 11 48 56 AM" src="https://github.com/user-attachments/assets/609ab954-618c-40ee-9a62-38becddab629" />


Lead Form-2

<img width="1440" alt="Screen Shot 2025-02-21 at 11 49 03 AM" src="https://github.com/user-attachments/assets/046f1fca-a771-4274-a207-fc21f244f29e" />


Form Submission confirmation

<img width="1440" alt="Screen Shot 2025-02-21 at 11 49 42 AM" src="https://github.com/user-attachments/assets/1c61311b-bc98-4f01-80ef-a8e54c26df46" />


Form Validation

<img width="1440" alt="Screen Shot 2025-02-21 at 11 50 06 AM" src="https://github.com/user-attachments/assets/ba3a7db9-a96a-4318-bbe1-406f7f6e3d86" />


Login Screen

<img width="1440" alt="Screen Shot 2025-02-21 at 11 49 20 AM" src="https://github.com/user-attachments/assets/535cf6cb-8170-4824-83c1-2c9e4c535172" />


Admin Leads Table

<img width="1440" alt="Screen Shot 2025-02-21 at 11 53 53 AM" src="https://github.com/user-attachments/assets/737e1963-c3f0-4145-9e1b-6f3fb704fb68" />



## Installation

To get started with this project, clone the repository and install the necessary dependencies.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/pranamya123/tryalma.git
   cd tryalma
   ```

2. **Install dependencies:**

   Run the following command to install all required dependencies listed in the `package.json` file.

   ```bash
   npm install
   ```

## Usage

Once the project is set up, you can start the development server.

1. **Run the development server:**

   ```bash
   npm run dev
   ```

   This will start the application on [http://localhost:3000](http://localhost:3000).

2. **Pages Available:**
   - **Lead Form**: [http://localhost:3000/lead-form](http://localhost:3000/lead-form) – A page where users can submit lead information.
   - **Leads Dashboard**: [http://localhost:3000/leads](http://localhost:3000/leads) – A page that displays all the submitted leads (requires authentication).

### Authentication

To access the Leads Dashboard page, you need to log in. Use the following credentials to log in as an admin user:

- **Email**: `admin@test.com`
- **Password**: `admin`

If you are not authenticated, you will be redirected to the login page.

## Folder Structure

Here's an overview of the key directories and files in the project:

```
TRYALMA (Project Root)
├── .next                   # Next.js build directory
├── node_modules            # Project dependencies
├── public                  # Static files (e.g., images, favicon.ico)
├── src
│   └── app
│       ├── api
│       │   └── leads
│       │       └── route.ts    # API route for handling leads data
│       ├── lead-form
│       │   └── page.tsx        # Lead Form Page
│       └── leads
│           ├── page.test.tsx   # Test file for the Leads Page
│           └── page.tsx        # Leads Dashboard Page
├── lib
│   └── leads.ts             # Utility functions for handling leads data
├── login
│   └── page.tsx             # Login Page for Authentication
├── favicon.ico              # App Favicon
├── globals.css              # Global styles
├── layout.tsx               # Main layout for pages
├── leadsSlice.ts            # Redux slice for managing leads state
├── page.tsx                 # Main page component
├── providers.tsx            # Context providers
├── store.ts                 # Redux store configuration
├── eslint.config.mjs        # ESLint configuration file
├── next-env.d.ts            # TypeScript environment definitions
├── next.config.ts           # Next.js configuration
├── package-lock.json        # Lock file for dependencies
├── package.json             # Project dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── postcss.config.mjs       # Alternative PostCSS configuration
├── README.md                # Project Documentation
├── tailwind.config.js       # Tailwind CSS configuration
├── tailwind.config.ts       # TypeScript Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration

```

## Technologies Used

- **Next.js**: React framework for server-side rendering (SSR) and static site generation (SSG).
- **React**: JavaScript library for building user interfaces.
- **CSS**: For styling the components and pages.
- **Node.js**: JavaScript runtime for backend server functionality.

## State Management using Redux

- This application utilizes Redux for state management, allowing us to efficiently handle the application's data flow. Below is an overview of how the Redux store is configured and how state is managed throughout the app.
- The main state of the app is managed within the leadsSlice.ts file. This slice of the store is responsible for holding and updating the leads data, as well as controlling the search, sorting, and filtering states.
The state is structured as follows:
```
interface LeadsState {
  leads: Lead[];            // Array of lead objects
  searchQuery: string;      // Search query for filtering leads
  sortBy: keyof Lead;       // Field by which the leads are sorted
  sortOrder: 'asc' | 'desc'; // Sorting order
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Status of the data fetching
  error: string | null;     // Error message in case of failure
}
```

## Mock APIs

- In this application, the API calls are mocked using a mock data array to simulate CRUD operations for the leads. This is particularly useful for testing and developing the frontend without needing to connect to a real backend.

### Mocked Leads Data
The mock data is an array of lead objects, each containing details like the lead's name, email, resume, visa type, and message. Each lead also has a state property, which tracks whether the lead has been reached out to or is still in a pending state.
```
let leads = [
  {
    id: '1',
    firstName: 'Jorge',
    lastName: 'Ruiz',
    email: 'jorge.ruiz@example.com',
    linkedin: 'linkedin.com/in/jorgeruiz',
    visas: 'H1B',
    resume: { name: 'resume.pdf' },
    message: 'Interested in a job',
    state: 'Pending',
    createdAt: new Date().toISOString(),
    country: 'Mexico'
  },
  // More mock leads here
];
```

### API Endpoints
Three API endpoints are defined:

- GET /api/leads - Fetches the list of leads.

This returns all the leads from the mock data.

- POST /api/leads - Submits a new lead.

This simulates the process of submitting a lead, and the lead is added to the mock data array.

- PATCH /api/leads - Updates the status of a lead.

This simulates the process of updating the lead status to "Reached Out".

## License

This project is for Alma Frontend Engineer Take Home Exercise only, if being used otherwise, please contact Pranamya Vadlamani

# Frontend Application

This is a single-page application built with React and TypeScript that provides the user interface for the HD Notes app.

### Key Areas

-   **/src/components**: Contains all the UI components, like `Signup.tsx`, `Login.tsx`, and the main `Dashboard.tsx`.
-   **/src/api**: Holds our configured `axios` instance which automatically adds the auth token to requests.
-   **`App.tsx`**: The main component that manages the application's state and switches between different views (e.g., showing the login form vs. the dashboard).

### Quick Start

1.  Run `npm install` to install dependencies.
2.  Run `npm start` to launch the development server.

*Note: This app uses a proxy in `package.json` to communicate with the backend server during development.*

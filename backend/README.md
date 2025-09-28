# Backend Server

This is a Node.js and Express API built with TypeScript. It handles user authentication, manages notes, and connects to the MongoDB database.

### Key Directories

-   **/src/models**: Defines the Mongoose schemas for our `User` and `Note` collections.
-   **/src/routes**: Maps the API endpoints (e.g., `/api/users/login`) to the controller functions.
-   **/src/controllers**: Contains the core logic for handling requests, like creating a user or deleting a note.
-   **/src/middleware**: Holds the `auth.middleware.ts` which protects our routes using JWTs.

### Quick Start

1.  Run `npm install` to install dependencies.
2.  Set up your `.env` file as described in the root README.
3.  Run `npm run dev` to start the server.

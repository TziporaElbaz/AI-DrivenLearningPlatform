# AI-Driven Learning Platform

A mini production-grade learning platform with AI-generated lessons, user management, and admin dashboard.

## Features
- User registration and login
- Select category & sub-category
- Submit prompts to AI and receive lessons
- View learning history
- Admin dashboard for users and prompt history

## Tech Stack
- Backend: Node.js (Express), PostgreSQL, Sequelize, OpenAI API
- Frontend: React
- Auth: JWT (bonus)
- Docker Compose for DB

## Setup Instructions
- Clone this repo to your local machine:
- git clone <repository_url>
- Create .env files
- Copy the .env.example file from both the backend and frontend directories and rename them to .- - env.
- Fill in the necessary values like database connection details, OpenAI API key, etc.

- Start PostgreSQL database using Docker Compose
- Run the following command to start the PostgreSQL container:

- docker-compose up -d
- Run Backend and Frontend

## Backend
- The backend uses JWT for authentication, and cookies for session management.
- To run the backend, use the following command:
- tsx node-ts src/index.ts
## Frontend
- Similarly, follow the frontend README to set up the React app and connect to the backend:

- cd frontend
- npm install
- npm start
- Access the Application
- Once both backend and frontend are running, you can access the platform at http://localhost:3000.
- The backend API will be available at http://localhost:5000.

## Authentication & Session Management
- JWT (JSON Web Token) is used for secure user authentication.

- Cookies are used for storing the JWT on the client side and managing the user’s session. 
- This allows the backend to authenticate users without requiring them to log in on every request.

## Example .env File
- Backend .env
- DB_HOST=localhost
- DB_PORT=5432
- DB_USER=user
- DB_PASSWORD=123456
- DB_NAME=learning_platform
- OPENAI_API_KEY=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
- JWT_SECRET=your_jwt_secret

- Frontend .env
- REACT_APP_BACKEND_URL=http://localhost:5000
- REACT_APP_OPENAI_API_KEY=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

## Notes:
- Make sure you have Docker installed to run PostgreSQL in a container.

- Ensure the backend and frontend services are running on the correct ports, 
- and that the frontend can successfully communicate with the backend.

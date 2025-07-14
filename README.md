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
1. Copy `.env.example` files in both `backend` and `frontend` to `.env` and fill in values
2. Run `docker-compose up -d` to start PostgreSQL
3. Follow backend and frontend README for local run

## Assumptions
- Only basic user info (name, phone) is required
- OpenAI API key is required for lesson generation

## How to Run Locally
See backend and frontend README files for details.

## Example .env
See `.env.example` in each folder.

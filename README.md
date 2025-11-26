StatMax — Basketball Training & Stats Tracker

StatMax is a full-stack basketball performance tracker designed for players who want to level up their game through data. Users can log sessions, track their statistics over time, view personalized dashboards, and compare their performance on a global rankings board.

Built with a modern MERN + TypeScript architecture, StatMax focuses on speed, simplicity, and meaningful insights.

🚀 Features
📊 Create & Track Sessions

Log new training sessions with stats for:

Points

Assists

Rebounds

Blocks

Steals

Shots Made

Shots Attempted

True Shooting Percentage

All sessions are stored per user and tied to their account.

📈 Personal Dashboard

Displays recent stats and trend lines using Recharts.

Showcases session history and performance trends.

Quick navigation to start new sessions or view rankings.

🏆 Global Rankings Board

Compare yourself with all other StatMax users.

Rankings are auto-sorted for:

Points

Rebounds

Assists

Blocks

Steals

Switch between categories without reloading.

🔐 Authentication System

Secure signup and login using JWT tokens.

Enforced unique usernames and emails.

Persistent login session via AuthContext + Protected Routes.

🧭 Smooth User Flow

Sign Up → Log In → Dashboard → Sessions → Rankings

Clean UI optimized for speed and readability.

🛠️ Tech Stack
Frontend

React + TypeScript

React Router

Context API (Auth Provider)

Custom components for forms, stats, sessions, and rankings

CSS-based responsive styling

Backend

Node.js + Express

MongoDB + Mongoose

JWT-based authentication

REST API for sessions, users, stats, and rankings

📡 API Overview
Auth Routes

POST /api/auth/signup — Create a new user

POST /api/auth/login — Log in and receive token

Sessions Routes

POST /api/sessions — Create a new drill session

GET /api/sessions — Get user’s sessions

PUT /api/sessions/:id — Update a session

DELETE /api/sessions/:id — Remove a session

Rankings Route

GET /api/rankings — Returns sorted leaderboard data for all stat categories

🔐 User Authentication Flow

User signs up with email, username, and password

Backend validates uniqueness of username and email

User logs in and receives a JWT token

Token is stored in AuthContext and sent with each secure request

Protected pages validate authentication before access

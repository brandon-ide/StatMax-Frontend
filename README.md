StatMax — Basketball Training & Stats Tracker

StatMax is a full-stack basketball performance tracker designed for players who want to level up their game through data. Users can log sessions, track their statistics over time, view personalized dashboards, and compare their performance on a global rankings board.

Built with a modern MERN + TypeScript architecture, StatMax focuses on speed, simplicity, and meaningful insights.

🏀 AI Coach Max — Your Personal Basketball Development Assistant

StatMax includes AI Coach Max, an intelligent training assistant designed to help players understand their performance, improve their game, and stay motivated.

🔥 What Coach Max Does

Coach Max analyzes a player’s real basketball session data—including totals, trends, and recent performances—and uses that information to provide:

Personalized coaching tips

Motivational messages based on your actual stats

Actionable feedback tailored to your strengths and weaknesses

Performance insights across points, rebounds, assists, steals, and blocks

Session-specific breakdowns that help you track progress over time

💡 How It Works

When a user sends Coach Max a message, StatMax:

Gathers the player’s full historical and recent session data

Builds a structured prompt for the AI

Sends it to Max (powered by OpenAI’s API)

Returns a short, specific, performance-driven response

Displays the full chat exchange in a clean interface

🤝 What Makes Coach Max Special

He never gives generic advice — everything is based on your stats

He stays strictly focused on basketball development

He avoids unrealistic claims, unsafe advice, or medical guidance

He keeps feedback short, positive, and immediately useful

✨ Example Use Cases

“How can I improve my rebounding based on my last few sessions?”

“What should I focus on next time?”

“Where am I improving the most right now?”

Coach Max turns your raw stats into meaningful guidance — making StatMax not just a tracker, but a real training partner.

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

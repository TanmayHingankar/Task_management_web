Task Management Web Application
Video url : https://drive.google.com/file/d/1OeA10nbR1DFT8MyOSiWjtHshscltm79p/view?usp=sharing

A professional, production-ready Task Management Web Application built with the PERN stack (PostgreSQL, Express, React, Node.js).

🚀 Features
User Authentication: Secure registration and login using session-based authentication and password hashing.
Task CRUD: Complete flow for creating, reading, updating, and deleting tasks.
Dashboard Overview: Modern dashboard with statistics and task management.
View Toggles: Switch between Grid (Cards) and List (Table) views.
Filtering & Sorting: Filter tasks by status and sort by title or date.
Responsive Design: Fully responsive UI that works on mobile, tablet, and desktop.
Modern UI: Built with Tailwind CSS and Shadcn UI components for a clean, professional look.
🛠 Tech Stack
Frontend: React (Vite), Tailwind CSS, Framer Motion, TanStack Query, Shadcn UI.
Backend: Node.js, Express, Passport.js (Authentication).
Database: PostgreSQL with Drizzle ORM.
Deployment: Optimized for Replit and Vercel/Render.
🏁 Setup Instructions
Prerequisites
Node.js (v18 or higher)
PostgreSQL database
Environment Variables
Create a .env file in the root directory (or use Replit Secrets):

DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_secure_session_secret
Installation
Clone the repository
Install dependencies:
npm install
Push the database schema:
npm run db:push
Start the development server:
npm run dev
📸 Screenshots
Dashboard - Grid View	Task Creation Modal
Dashboard	Task Form
(Note: Replace these with actual screenshots frScreenshot 2026-01-22 112448 Screenshot 2026-01-22 112507 Screenshot 2026-01-22 112547 Screenshot 2026-01-22 112627 Screenshot 2026-01-22 112323 Screenshot 2026-01-22 112345 Screenshot 2026-01-22 112407 om your running application)

📄 API Endpoints
Auth
POST /api/register: Create a new account
POST /api/login: Sign in
POST /api/logout: Sign out
GET /api/user: Get current user info
Tasks
GET /api/tasks: List all tasks (supports search, status, sort query params)
POST /api/tasks: Create a new task
GET /api/tasks/:id: Get a specific task
PATCH /api/tasks/:id: Update a task (partial)
DELETE /api/tasks/:id: Remove a task
Video url : https://drive.google.com/file/d/1OeA10nbR1DFT8MyOSiWjtHshscltm79p/view?usp=sharing Built with ❤️ by Tanmay Hingankar

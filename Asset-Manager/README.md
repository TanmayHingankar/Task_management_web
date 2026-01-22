# Task Management Web Application

Video url : https://drive.google.com/file/d/1OeA10nbR1DFT8MyOSiWjtHshscltm79p/view?usp=sharing

A professional, production-ready Task Management Web Application built with the PERN stack (PostgreSQL, Express, React, Node.js).

## 🚀 Features

- **User Authentication**: Secure registration and login using session-based authentication and password hashing.
- **Task CRUD**: Complete flow for creating, reading, updating, and deleting tasks.
- **Dashboard Overview**: Modern dashboard with statistics and task management.
- **View Toggles**: Switch between Grid (Cards) and List (Table) views.
- **Filtering & Sorting**: Filter tasks by status and sort by title or date.
- **Responsive Design**: Fully responsive UI that works on mobile, tablet, and desktop.
- **Modern UI**: Built with Tailwind CSS and Shadcn UI components for a clean, professional look.

## 🛠 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, TanStack Query, Shadcn UI.
- **Backend**: Node.js, Express, Passport.js (Authentication).
- **Database**: PostgreSQL with Drizzle ORM.
- **Deployment**: Optimized for Replit and Vercel/Render.

## 🏁 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database

### Environment Variables
Create a `.env` file in the root directory (or use Replit Secrets):
```env
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_secure_session_secret
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Push the database schema:
   ```bash
   npm run db:push
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📸 Screenshots

| Dashboard - Grid View | Task Creation Modal |
|-----------------------|---------------------|
| ![Dashboard](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/og.png) | ![Task Form](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/og.png) |

*(Note: Replace these with actual screenshots fr<img width="1919" height="924" alt="Screenshot 2026-01-22 112448" src="https://github.com/user-attachments/assets/812bb972-731b-4cea-85a1-f95f37155a44" />
<img width="1919" height="917" alt="Screenshot 2026-01-22 112507" src="https://github.com/user-attachments/assets/b41e2d2f-3fcb-4bbb-9d96-ed943691d10d" />
<img width="1339" height="637" alt="Screenshot 2026-01-22 112547" src="https://github.com/user-attachments/assets/6b4a985d-929f-4b9c-a85f-90e7c229c980" />
<img width="1916" height="914" alt="Screenshot 2026-01-22 112627" src="https://github.com/user-attachments/assets/f9743146-1e71-4b0b-b60d-2aa9c50c7459" />
<img width="1919" height="926" alt="Screenshot 2026-01-22 112323" src="https://github.com/user-attachments/assets/ecdc2bff-abb3-4370-b817-14071701573c" />
<img width="1919" height="914" alt="Screenshot 2026-01-22 112345" src="https://github.com/user-attachments/assets/4a429bc6-28d8-462a-8be2-fc14324c5010" />
<img width="1918" height="922" alt="Screenshot 2026-01-22 112407" src="https://github.com/user-attachments/assets/f5eddfc5-7555-43ad-8940-c6a4325e59ef" />
om your running application)*

## 📄 API Endpoints

### Auth
- `POST /api/register`: Create a new account
- `POST /api/login`: Sign in
- `POST /api/logout`: Sign out
- `GET /api/user`: Get current user info

### Tasks
- `GET /api/tasks`: List all tasks (supports `search`, `status`, `sort` query params)
- `POST /api/tasks`: Create a new task
- `GET /api/tasks/:id`: Get a specific task
- `PATCH /api/tasks/:id`: Update a task (partial)
- `DELETE /api/tasks/:id`: Remove a task

---


Video url : https://drive.google.com/file/d/1OeA10nbR1DFT8MyOSiWjtHshscltm79p/view?usp=sharing
Built with ❤️ by [Tanmay Hingankar](https://github.com/TanmayHingankar)

# TaskFlow – Full Stack CRUD App

A full-stack Task Manager built with **React**, **Node.js/Express**, and **MongoDB**.

## Project Structure

```
crud-app/
├── server/                 # Node.js + Express backend
│   ├── models/Task.js      # Mongoose schema
│   ├── routes/tasks.js     # REST API routes
│   ├── index.js            # Entry point
│   ├── .env.example        # Environment variables template
│   └── package.json
│
└── client/                 # React frontend
    ├── src/
    │   ├── api/tasks.js        # Axios API calls
    │   ├── components/
    │   │   ├── TaskForm.jsx    # Create/Edit form
    │   │   └── TaskCard.jsx    # Task display card
    │   ├── App.jsx             # Main component
    │   └── App.css             # Styles
    └── package.json
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))

### 1. Set up the Backend

```bash
cd server
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env and set your MONGO_URI

npm run dev      # Development (nodemon)
# or
npm start        # Production
```

### 2. Set up the Frontend

```bash
cd client
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) — the frontend proxies API calls to `localhost:5000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (supports `?status=`, `?priority=`, `?search=`) |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## Task Schema

```json
{
  "title": "string (required, max 100)",
  "description": "string (optional, max 500)",
  "status": "todo | in-progress | done",
  "priority": "low | medium | high"
}
```

## Features
- ✅ Full CRUD (Create, Read, Update, Delete)
- 🔍 Search & filter by status/priority
- 📊 Task statistics in header
- 🌙 Dark theme UI
- 📱 Responsive design
- ⚡ Debounced search
- 🕐 Relative timestamps

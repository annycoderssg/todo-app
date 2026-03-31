# ToDoApp

A full-stack **To-Do application** built with **FastAPI** (Python) on the backend and **React + Vite** on the frontend.

---

## Project Structure

```
ToDoApp/
├── app/                        # Backend — FastAPI
│   ├── main.py                 # API routes & application entry point
│   ├── requirements.txt        # Python dependencies
│   └── venv/                   # Virtual environment (not committed)
│
└── view-services/
    └── TodoAPP/                # Frontend — React + Vite
        ├── public/
        │   └── favicon.svg
        ├── src/
        │   ├── App.jsx         # Root React component
        │   ├── App.css         # Component styles
        │   ├── Task.jsx        # Task list & form component
        │   ├── index.css       # Global styles & design tokens
        │   └── main.jsx        # React entry point
        ├── index.html
        ├── package.json
        └── vite.config.js
```

---

## Prerequisites

Make sure the following are installed on your machine:

| Tool | Version | Download |
|------|---------|----------|
| Python | 3.10+ | https://www.python.org/downloads/ |
| Node.js | 18+ | https://nodejs.org/ |
| npm | 9+ | Bundled with Node.js |

---

## Backend Setup (FastAPI)

### 1. Navigate to the app folder
```bash
cd "C:\Users\Anand S\Study\Projects\ToDoApp\app"
```

### 2. Create a virtual environment
```bash
python -m venv venv
```

### 3. Activate the virtual environment

**Windows:**
```bash
venv\Scripts\activate
```

**macOS / Linux:**
```bash
source venv/bin/activate
```

### 4. Install dependencies
```bash
pip install -r requirements.txt
```

### 5. Start the server
```bash
venv\Scripts\uvicorn main:app --reload
```

The API will be running at: **http://127.0.0.1:8000**

---

## Frontend Setup (React + Vite)

### 1. Navigate to the frontend folder
```bash
cd "C:\Users\Anand S\Study\Projects\ToDoApp\view-services\TodoAPP"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

The app will be running at: **http://localhost:5173**

---

## API Reference

Base URL: `http://127.0.0.1:8000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Retrieve all tasks |
| `GET` | `/tasks/{id}` | Retrieve a task by ID |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/{id}` | Update an existing task |
| `DELETE` | `/tasks/{id}` | Delete a task |

### Request Body — POST `/tasks`
```json
{
  "task_name": "Buy groceries",
  "due_date": "2026-04-01",
  "status": "Pending"
}
```

### Request Body — PUT `/tasks/{id}`
```json
{
  "task_name": "Buy groceries (updated)",
  "due_date": "2026-04-02",
  "status": "In Progress"
}
```

> All fields are optional in PUT — only provided fields will be updated.

### Response Format
```json
{
  "data": { ... },
  "status": 200,
  "success": true
}
```

### Interactive API Docs
FastAPI auto-generates documentation:
- **Swagger UI** → http://127.0.0.1:8000/docs
- **ReDoc**       → http://127.0.0.1:8000/redoc

---

## Features

- Add tasks with a name, due date, and status
- Edit existing tasks inline
- Delete tasks
- Toggle task completion via checkbox
- Status labels: `Pending`, `In Progress`, `Completed`
- Responsive design — works on mobile & desktop
- Dark mode support (follows system preference)

---

## Dependencies

### Backend
| Package | Purpose |
|---------|---------|
| `fastapi` | Web framework |
| `uvicorn[standard]` | ASGI server |
| `sqlalchemy` | ORM / database access |
| `pydantic` | Data validation |
| `python-dotenv` | Environment variable management |

### Frontend
| Package | Purpose |
|---------|---------|
| `react` | UI library |
| `react-dom` | DOM rendering |
| `vite` | Build tool & dev server |

---

## Running Both Servers

Open **two terminals** simultaneously:

**Terminal 1 — Backend:**
```bash
cd "C:\Users\Anand S\Study\Projects\ToDoApp\app"
venv\Scripts\uvicorn main:app --reload
```

**Terminal 2 — Frontend:**
```bash
cd "C:\Users\Anand S\Study\Projects\ToDoApp\view-services\TodoAPP"
npm run dev
```

Then open your browser at **http://localhost:5173**

---

## Build for Production

```bash
cd "C:\Users\Anand S\Study\Projects\ToDoApp\view-services\TodoAPP"
npm run build
```

Output will be in the `dist/` folder, ready to be served by any static host.

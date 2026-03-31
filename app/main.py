from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import date

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store
tasks = []
counter = 1

class Task(BaseModel):
    task_name: str
    due_date: Optional[str] = None
    status: Optional[str] = "Pending"

class TaskUpdate(BaseModel):
    task_name: Optional[str] = None
    due_date: Optional[str] = None
    status: Optional[str] = None


@app.get("/tasks")
def getTaskList():
    return {"data": tasks, "status": 200, "success": True}

@app.get("/tasks/{id}")
def getTaskById(id: int):
    task = next((t for t in tasks if t["id"] == id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"data": task, "status": 200, "success": True}

@app.post("/tasks")
def saveTask(task: Task):
    global counter
    new_task = {
        "id": counter,
        "task_name": task.task_name,
        "due_date": task.due_date,
        "status": task.status,
    }
    tasks.append(new_task)
    counter += 1
    return {"data": new_task, "status": 201, "success": True}

@app.put("/tasks/{id}")
def updateTask(id: int, task: TaskUpdate):
    existing = next((t for t in tasks if t["id"] == id), None)
    if not existing:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.task_name is not None:
        existing["task_name"] = task.task_name
    if task.due_date is not None:
        existing["due_date"] = task.due_date
    if task.status is not None:
        existing["status"] = task.status
    return {"data": existing, "status": 200, "success": True}

@app.delete("/tasks/{id}")
def deleteTask(id: int):
    global tasks
    task = next((t for t in tasks if t["id"] == id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    tasks = [t for t in tasks if t["id"] != id]
    return {"message": "Task deleted", "status": 200, "success": True}

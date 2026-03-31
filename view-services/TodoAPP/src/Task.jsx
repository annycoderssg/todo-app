import { useState, useEffect } from 'react'
import './App.css'

const API = 'http://127.0.0.1:8000'

export function TaskList() {
  const [tasks, setTasks]   = useState([])
  const [form, setForm]     = useState({ task_name: '', due_date: '', status: 'Pending' })
  const [editId, setEditId] = useState(null)
  const [error, setError]   = useState('')

  const fetchTasks = async () => {
    const res  = await fetch(`${API}/tasks`)
    const json = await res.json()
    setTasks(json.data)
  }

  useEffect(() => { fetchTasks() }, [])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.task_name.trim()) {
      setError('Task name is required.')
      return
    }

    if (editId !== null) {
      await fetch(`${API}/tasks/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setEditId(null)
    } else {
      await fetch(`${API}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    }

    setForm({ task_name: '', due_date: '', status: 'Pending' })
    fetchTasks()
  }

  const handleEdit = (task) => {
    setEditId(task.id)
    setForm({ task_name: task.task_name, due_date: task.due_date || '', status: task.status })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE' })
    fetchTasks()
  }

  const handleToggle = async (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed'
    await fetch(`${API}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    fetchTasks()
  }

  const cancelEdit = () => {
    setEditId(null)
    setError('')
    setForm({ task_name: '', due_date: '', status: 'Pending' })
  }

  const getBadgeClass = (status) => {
    if (status === 'Completed')  return 'badge badge-completed'
    if (status === 'In Progress') return 'badge badge-in-progress'
    return 'badge badge-pending'
  }

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="app-header">
        <h1>📝 ToDo App</h1>
        <p>Stay organised — track your tasks in one place</p>
      </header>

      <main className="container">
        {/* Form */}
        <form className="task-form" onSubmit={handleSubmit} noValidate>
          <p className="form-title">
            {editId !== null ? '✏️ Edit Task' : '➕ New Task'}
          </p>

          {error && (
            <div className="form-error">
              ⚠️ {error}
            </div>
          )}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="task_name">Task Name</label>
              <input
                id="task_name"
                name="task_name"
                placeholder="What needs to be done?"
                value={form.task_name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="due_date">Due Date</label>
              <input
                id="due_date"
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editId !== null ? '💾 Update Task' : '➕ Add Task'}
            </button>
            {editId !== null && (
              <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Task List */}
        <div className="task-section-header">
          <h2>
            Tasks
            <span className="task-count">{tasks.length}</span>
          </h2>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🗒️</div>
              <p>No tasks yet — add one above to get started!</p>
            </div>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className={`task-card ${task.status === 'Completed' ? 'completed' : ''}`}
              >
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.status === 'Completed'}
                  onChange={() => handleToggle(task)}
                  title="Toggle complete"
                />

                <div className="task-body">
                  <p className="task-name">{task.task_name}</p>
                  <div className="task-meta">
                    <span className={getBadgeClass(task.status)}>{task.status}</span>
                    {task.due_date && (
                      <span className="task-due">📅 {task.due_date}</span>
                    )}
                  </div>
                </div>

                <div className="task-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(task)}
                    title="Edit task"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(task.id)}
                    title="Delete task"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default TaskList

import { useState, useEffect, useCallback } from "react";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import { getTasks, createTask, updateTask, deleteTask } from "./api/tasks";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ status: "", priority: "", search: "" });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTasks(filters);
      setTasks(res.data.data);
      setError("");
    } catch {
      setError("Failed to load tasks. Is the server running?");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(fetchTasks, 300);
    return () => clearTimeout(timer);
  }, [fetchTasks]);

  const handleCreate = async (data) => {
    try {
      const res = await createTask(data);
      setTasks((prev) => [res.data.data, ...prev]);
    } catch {
      setError("Failed to create task.");
    }
  };

  const handleUpdate = async (data) => {
    try {
      const res = await updateTask(editTask._id, data);
      setTasks((prev) => prev.map((t) => (t._id === editTask._id ? res.data.data : t)));
      setEditTask(null);
    } catch {
      setError("Failed to update task.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setError("Failed to delete task.");
    }
  };

  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>TaskFlow</h1>
            <p>Your personal task manager</p>
          </div>
          <div className="stats">
            <div className="stat"><span>{stats.total}</span><label>Total</label></div>
            <div className="stat todo"><span>{stats.todo}</span><label>To Do</label></div>
            <div className="stat in-progress"><span>{stats.inProgress}</span><label>In Progress</label></div>
            <div className="stat done"><span>{stats.done}</span><label>Done</label></div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <TaskForm
            onSubmit={editTask ? handleUpdate : handleCreate}
            editTask={editTask}
            onCancel={() => setEditTask(null)}
          />
        </aside>

        <section className="task-list-section">
          {/* Filters */}
          <div className="filters">
            <input
              className="search-input"
              placeholder="🔍 Search tasks..."
              value={filters.search}
              onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            />
            <select value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
              <option value="">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <select value={filters.priority} onChange={(e) => setFilters((f) => ({ ...f, priority: e.target.value }))}>
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {error && <div className="error-banner">{error}</div>}

          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No tasks yet</h3>
              <p>Add your first task using the form on the left.</p>
            </div>
          ) : (
            <div className="task-grid">
              {tasks.map((task) => (
                <TaskCard key={task._id} task={task} onEdit={setEditTask} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

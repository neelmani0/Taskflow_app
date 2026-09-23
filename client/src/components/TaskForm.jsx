import { useState, useEffect } from "react";

const INITIAL = { title: "", description: "", status: "todo", priority: "medium" };

export default function TaskForm({ onSubmit, editTask, onCancel }) {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editTask) setForm(editTask);
    else setForm(INITIAL);
  }, [editTask]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
    if (!editTask) setForm(INITIAL);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{editTask ? "Edit Task" : "Add New Task"}</h2>

      <div className="form-group">
        <label>Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="What needs to be done?"
          required
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add details (optional)..."
          rows={3}
          maxLength={500}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : editTask ? "Update Task" : "Add Task"}
        </button>
        {editTask && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

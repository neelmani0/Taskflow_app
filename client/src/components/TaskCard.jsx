export default function TaskCard({ task, onEdit, onDelete }) {
  const priorityColors = { low: "#22c55e", medium: "#f59e0b", high: "#ef4444" };
  const statusLabels = { todo: "To Do", "in-progress": "In Progress", done: "Done" };

  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className={`task-card ${task.status}`}>
      <div className="task-card-header">
        <span
          className="priority-badge"
          style={{ background: priorityColors[task.priority] + "22", color: priorityColors[task.priority], borderColor: priorityColors[task.priority] + "44" }}
        >
          {task.priority}
        </span>
        <span className="status-badge">{statusLabels[task.status]}</span>
      </div>

      <h3 className="task-title">{task.title}</h3>
      {task.description && <p className="task-desc">{task.description}</p>}

      <div className="task-footer">
        <span className="task-time">{timeAgo(task.createdAt)}</span>
        <div className="task-actions">
          <button className="btn-icon edit" onClick={() => onEdit(task)} title="Edit">✏️</button>
          <button className="btn-icon delete" onClick={() => onDelete(task._id)} title="Delete">🗑️</button>
        </div>
      </div>
    </div>
  );
}

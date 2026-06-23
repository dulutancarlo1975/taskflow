import Badge from './ui/Badge';
import Button from './ui/Button';
import { formatStatusLabel, statusBadgeClass } from '../services/tasks';

export default function TaskCard({ task, index = 0, onToggle, onEdit, onDelete }) {
  const statusClass = statusBadgeClass(task.status);

  return (
    <li
      className={`task-card ui-task-card ${task.priority}${task.status === 'done' ? ' is-done' : ''}`}
      style={{ '--stagger-index': index }}
    >
      <div className="task-card-header">
        <h3 className="task-card-title">{task.title}</h3>
        <span className="task-id">#{task.id}</span>
      </div>
      {task.description && (
        <p className="task-card-description">{task.description}</p>
      )}
      <div className="task-meta">
        <Badge variant="priority">{task.priority}</Badge>
        <Badge variant={statusClass.replace('badge-', 'status-')}>{formatStatusLabel(task.status)}</Badge>
        {task.dueDate && <span className="task-due">Due: {task.dueDate}</span>}
      </div>
      <div className="task-actions">
        <Button variant="toggle" onClick={() => onToggle(task)}>Toggle Status</Button>
        <Button variant="edit" onClick={() => onEdit(task)}>Edit</Button>
        <Button variant="delete" onClick={() => onDelete(task.id)}>Delete</Button>
      </div>
    </li>
  );
}

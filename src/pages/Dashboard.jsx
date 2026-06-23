import { useCallback, useEffect, useState } from 'react';
import PageOverview from '../components/PageOverview';
import TaskCard from '../components/TaskCard';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import FilterGroup from '../components/ui/FilterGroup';
import FormField, { SelectInput, TextArea, TextInput } from '../components/ui/FormField';
import LoadingIndicator from '../components/ui/LoadingIndicator';
import PageShell from '../components/ui/PageShell';
import {
  PRIORITY_VALUES,
  STATUS_VALUES,
  createTask,
  deleteCompletedTasks,
  deleteTaskById,
  fetchTasks,
  nextStatus,
  updateTaskById
} from '../services/tasks';

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Tasks' },
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' }
];

const emptyForm = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'pending',
  dueDate: ''
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const showError = useCallback((message) => {
    setError(message);
    setTimeout(() => setError(''), 4000);
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const visibleTasks =
    currentFilter === 'all'
      ? tasks
      : tasks.filter((t) => t.status === currentFilter);

  const doneCount = tasks.filter((t) => t.status === 'done').length;

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validateForm() {
    if (!form.title.trim()) {
      showError('Title is required. Please enter a task title.');
      return false;
    }
    if (!PRIORITY_VALUES.includes(form.priority)) {
      showError('Priority must be low, medium, or high.');
      return false;
    }
    if (!STATUS_VALUES.includes(form.status)) {
      showError('Status must be pending, in-progress, or done.');
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const taskObj = {
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      status: form.status,
      dueDate: form.dueDate
    };

    try {
      if (editingId !== null) {
        const updated = await updateTaskById(editingId, { ...taskObj, id: editingId }, tasks);
        setTasks(updated);
        setEditingId(null);
        setForm(emptyForm);
      } else {
        const updated = await createTask(taskObj, tasks);
        setTasks(updated);
        setForm(emptyForm);
        if (currentFilter !== 'all' && taskObj.status !== currentFilter) {
          setCurrentFilter('all');
        }
      }
    } catch (err) {
      showError(err.message);
    }
  }

  function handleEdit(task) {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate || ''
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleToggleStatus(task) {
    try {
      const updatedObj = { ...task, status: nextStatus(task.status) };
      const updated = await updateTaskById(task.id, updatedObj, tasks);
      setTasks(updated);
    } catch (err) {
      showError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this task from the server?')) return;
    try {
      const updated = await deleteTaskById(id, tasks);
      setTasks(updated);
    } catch (err) {
      showError(err.message);
    }
  }

  async function handleClearCompleted() {
    const doneTasks = tasks.filter((t) => t.status === 'done');
    if (doneTasks.length === 0) {
      showError('No completed tasks to delete.');
      return;
    }
    if (!window.confirm(`Delete ${doneTasks.length} completed task(s) from the server?`)) {
      return;
    }
    try {
      setLoading(true);
      const updated = await deleteCompletedTasks(tasks);
      setTasks(updated);
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function renderTaskCount() {
    const total = tasks.length;
    const visible = visibleTasks.length;
    if (total === 0) return 'No tasks in the database.';
    if (currentFilter === 'all') {
      return `${visible} task${visible === 1 ? '' : 's'} · ${doneCount} completed`;
    }
    return `${visible} of ${total} task${total === 1 ? '' : 's'} shown`;
  }

  return (
    <PageShell>
      <PageOverview
        purpose="The Home/Dashboard is the authenticated workspace where users perform full CRUD operations on task transactions — create, read, update, delete, filter, and track workflow status."
        workflow="After successful login or registration, users land here to manage tasks synced with the REST API. This is the core transactional layer of TaskFlow; all task data flows through this page to and from the server."
        flowPath={
          <>
            <strong>Flow:</strong> Landing → Register/Login → <em>Dashboard</em> ↔ REST API
          </>
        }
      />

      <div className="app-main">
        <section className="form-section ui-section-card" aria-label="Add or edit a task">
          <div className="section-header">
            <h2 id="form-heading">
              {editingId !== null ? 'Edit Transaction' : 'Create Transaction'}
            </h2>
            <p className="section-hint">
              Enter task details. Title is required — all changes sync to the server.
            </p>
          </div>
          <Alert variant="error" className="ui-alert--inline">{error}</Alert>
          <div className="form-panel">
            <form id="task-form" onSubmit={handleSubmit} noValidate>
              <FormField id="title" label="Title" required>
                <TextInput
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="e.g., Finalize quarterly report"
                />
              </FormField>
              <FormField id="description" label="Description">
                <TextArea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  placeholder="Add context, deliverables, or notes (optional)"
                />
              </FormField>
              <div className="form-row">
                <FormField id="priority" label="Priority Level">
                  <SelectInput id="priority" name="priority" value={form.priority} onChange={handleFormChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </SelectInput>
                </FormField>
                <FormField id="status" label="Workflow Stage">
                  <SelectInput id="status" name="status" value={form.status} onChange={handleFormChange}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </SelectInput>
                </FormField>
              </div>
              <FormField id="dueDate" label="Due Date">
                <TextInput
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleFormChange}
                />
              </FormField>
              <div className="form-actions">
                <Button type="submit" variant="primary">
                  {editingId !== null ? 'Update Task' : 'Add Task'}
                </Button>
                {editingId !== null && (
                  <Button type="button" variant="secondary" onClick={handleCancelEdit}>
                    Cancel Edit
                  </Button>
                )}
              </div>
            </form>
          </div>
        </section>

        <section className="list-section ui-section-card" aria-label="Task list">
          <div className="list-header">
            <h2>Task Registry</h2>
            <p className="section-hint">Manage, filter, and track every transaction.</p>
          </div>
          <div className="list-toolbar">
            <FilterGroup
              label="Filter tasks by status"
              options={FILTER_OPTIONS}
              value={currentFilter}
              onChange={setCurrentFilter}
            />
            <Button
              variant="clear-done"
              onClick={handleClearCompleted}
              disabled={doneCount === 0}
            >
              Purge Completed
            </Button>
          </div>
          <p className="task-count" aria-live="polite">
            {!loading && renderTaskCount()}
          </p>
          {loading && <LoadingIndicator message="Loading tasks…" />}
          {!loading && (
            <ul id="task-list" className="ui-task-list">
              {visibleTasks.length === 0 ? (
                <EmptyState>
                  {currentFilter === 'all' ? (
                    <>
                      <p>No tasks yet.</p>
                      <p>Add a task using the form — it will be saved to the server.</p>
                    </>
                  ) : (
                    <>
                      <p>No tasks in this view.</p>
                      <p>Try another filter or add a new task.</p>
                    </>
                  )}
                </EmptyState>
              ) : (
                visibleTasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={index}
                    onToggle={handleToggleStatus}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </ul>
          )}
        </section>
      </div>
    </PageShell>
  );
}

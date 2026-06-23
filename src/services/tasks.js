import { API, usesPersistedApi } from './api';

export const PRIORITY_VALUES = ['low', 'medium', 'high'];
export const STATUS_VALUES = ['pending', 'in-progress', 'done'];
export const STATUS_CYCLE = ['pending', 'in-progress', 'done'];
const STORAGE_KEY = 'taskflow_tasks';

export function sameTaskId(a, b) {
  return String(a) === String(b);
}

export function normalizeTask(raw) {
  return {
    id: raw.id,
    title: String(raw.title || '').trim(),
    description: String(raw.description || '').trim(),
    priority: PRIORITY_VALUES.includes(raw.priority) ? raw.priority : 'medium',
    status: STATUS_VALUES.includes(raw.status) ? raw.status : 'pending',
    dueDate: raw.dueDate || ''
  };
}

export function nextStatus(current) {
  const index = STATUS_CYCLE.indexOf(current);
  if (index === -1) return 'pending';
  return STATUS_CYCLE[(index + 1) % STATUS_CYCLE.length];
}

export function formatStatusLabel(status) {
  if (status === 'in-progress') return 'In Progress';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function statusBadgeClass(status) {
  if (status === 'in-progress') return 'badge-status-in-progress';
  return `badge-status-${status}`;
}

function saveTasksToBrowser(tasks) {
  if (!usesPersistedApi()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* ignore quota errors */
    }
  }
}

function loadTasksFromBrowser() {
  if (usesPersistedApi()) return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved).map(normalizeTask);
  } catch {
    return null;
  }
}

function nextLocalId(tasks) {
  if (tasks.length === 0) return Date.now();
  return Math.max(...tasks.map((t) => Number(t.id) || 0)) + 1;
}

export async function fetchTasks() {
  const cached = loadTasksFromBrowser();
  if (cached) return cached;

  const res = await fetch(API);
  if (!res.ok) throw new Error('Failed to load tasks');
  const data = await res.json();
  const tasks = data.map(normalizeTask);
  saveTasksToBrowser(tasks);
  return tasks;
}

export async function createTask(taskObj, tasks) {
  if (usesPersistedApi()) {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskObj)
    });
    if (!res.ok) throw new Error('Failed to create task');
    return fetchTasks();
  }

  let created = normalizeTask({ id: nextLocalId(tasks), ...taskObj });
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskObj)
    });
    if (res.ok) {
      const body = await res.json();
      if (body?.id !== undefined) created = normalizeTask(body);
    }
  } catch {
    /* live demo: still save locally if mock API is unreachable */
  }

  const updated = [...tasks, created];
  saveTasksToBrowser(updated);
  return updated;
}

export async function updateTaskById(id, updatedObj, tasks) {
  if (usesPersistedApi()) {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedObj)
    });
    if (!res.ok) throw new Error('Failed to update task');
    return fetchTasks();
  }

  let payload = updatedObj;
  try {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedObj)
    });
    if (res.ok) {
      const body = await res.json();
      payload = body?.id !== undefined ? body : updatedObj;
    }
  } catch {
    /* keep local update */
  }

  const updated = tasks.map((t) =>
    sameTaskId(t.id, id) ? normalizeTask(payload) : t
  );
  saveTasksToBrowser(updated);
  return updated;
}

export async function deleteTaskById(id, tasks) {
  if (usesPersistedApi()) {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete task');
    return fetchTasks();
  }

  try {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
  } catch {
    /* API optional on GitHub Pages */
  }

  const updated = tasks.filter((t) => !sameTaskId(t.id, id));
  saveTasksToBrowser(updated);
  return updated;
}

export async function deleteCompletedTasks(tasks) {
  const doneTasks = tasks.filter((t) => t.status === 'done');
  if (doneTasks.length === 0) {
    throw new Error('No completed tasks to delete.');
  }

  if (usesPersistedApi()) {
    for (const task of doneTasks) {
      const res = await fetch(`${API}/${task.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Failed to delete task #${task.id}`);
    }
    return fetchTasks();
  }

  const doneIds = new Set(doneTasks.map((t) => String(t.id)));
  const updated = tasks.filter((t) => !doneIds.has(String(t.id)));
  saveTasksToBrowser(updated);
  return updated;
}

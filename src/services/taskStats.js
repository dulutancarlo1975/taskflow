export function getTaskStats(tasks) {
  return {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'done').length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length
  };
}

export function getRecentTasks(tasks, limit = 5) {
  return [...tasks]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, limit);
}

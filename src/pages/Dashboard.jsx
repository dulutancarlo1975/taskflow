import { useCallback, useEffect, useState } from 'react';
import PageOverview from '../components/PageOverview';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import LoadingIndicator from '../components/ui/LoadingIndicator';
import PageShell from '../components/ui/PageShell';
import StatCard from '../components/ui/StatCard';
import { fetchTasks, formatStatusLabel, statusBadgeClass } from '../services/tasks';
import { getRecentTasks, getTaskStats } from '../services/taskStats';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const stats = getTaskStats(tasks);
  const recentTasks = getRecentTasks(tasks);

  return (
    <PageShell className="page-main--app">
      <PageOverview
        purpose="The Dashboard serves as the main overview page of the system. It displays summarized information about task progress, including total, completed, pending, and in-progress counts, plus a recent tasks list for quick monitoring."
        workflow="After successful login, users land on the Dashboard for a quick overview of task status and overall productivity before navigating to the Tasks page for full management."
        flowPath={
          <>
            <strong>Flow:</strong> Login → <em>Dashboard</em> → Tasks → Create/Edit/Delete/Track Tasks → Database
          </>
        }
      />

      {error && (
        <div className="error-msg ui-alert ui-fade-in" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingIndicator message="Loading dashboard…" />
      ) : (
        <>
          <section className="dashboard-stats" aria-label="Task summary statistics">
            <StatCard label="Total Available Tasks" value={stats.total} variant="total" />
            <StatCard label="Completed Tasks" value={stats.completed} variant="completed" />
            <StatCard label="Pending Tasks" value={stats.pending} variant="pending" />
            <StatCard label="In-Progress Tasks" value={stats.inProgress} variant="in-progress" />
          </section>

          <section className="dashboard-recent content-section" aria-labelledby="recent-tasks-heading">
            <div className="content-panel">
              <div className="dashboard-recent__header">
                <div>
                  <h2 id="recent-tasks-heading">Recent Tasks List</h2>
                  <p className="section-hint">
                    Recently created or updated tasks for quick monitoring.
                  </p>
                </div>
                <Button variant="primary" to="/tasks">
                  Manage Tasks
                </Button>
              </div>

              {recentTasks.length === 0 ? (
                <div className="empty-state ui-empty-state" role="status">
                  <p>No tasks yet.</p>
                  <p>Create your first task on the Tasks page.</p>
                </div>
              ) : (
                <ul className="recent-task-list">
                  {recentTasks.map((task) => (
                    <li key={task.id} className="recent-task-item">
                      <div className="recent-task-item__main">
                        <h3 className="recent-task-item__title">{task.title}</h3>
                        {task.description && (
                          <p className="recent-task-item__desc">{task.description}</p>
                        )}
                      </div>
                      <div className="recent-task-item__meta">
                        <Badge variant="priority">{task.priority}</Badge>
                        <Badge variant={statusBadgeClass(task.status)}>
                          {formatStatusLabel(task.status)}
                        </Badge>
                        {task.dueDate && (
                          <span className="task-due">Due: {task.dueDate}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <p className="dashboard-tracking section-hint">
                Tracking: {stats.total} total · {stats.completed} completed · {stats.pending} pending ·{' '}
                {stats.inProgress} in progress
              </p>
            </div>
          </section>
        </>
      )}
    </PageShell>
  );
}

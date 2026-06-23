import PageOverview from '../components/PageOverview';
import Button from '../components/ui/Button';
import { FeatureCard } from '../components/ui/Card';
import PageShell from '../components/ui/PageShell';

export default function Landing() {
  return (
    <PageShell>
      <PageOverview
        purpose="The Landing Page is the public entry point for TaskFlow. It introduces the product, highlights key features, and directs visitors toward registration, login, or informational pages."
        workflow="Every user session begins here. New users proceed to Registration; returning users go to Login. Both paths lead to the Dashboard where task transactions are managed via the REST API."
        flowPath={
          <>
            <strong>Flow:</strong> <em>Landing</em> → Register/Login → Dashboard ↔ REST API
          </>
        }
      />

      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-content ui-hero">
          <span className="hero-badge">IT0043 · React + REST API</span>
          <h2 id="hero-heading">Manage tasks with clarity and control</h2>
          <p className="hero-lead">
            TaskFlow is a full CRUD task manager built with React that syncs every
            transaction with a REST API — create, update, filter, and track workflow
            stages in one place.
          </p>
          <div className="hero-actions">
            <Button variant="primary" to="/register">Create Free Account</Button>
            <Button variant="secondary" to="/login">Sign In</Button>
          </div>
        </div>
        <div className="hero-features">
          <FeatureCard>
            <h3>Full CRUD</h3>
            <p>Create, read, update, and delete task records with server-backed persistence.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Workflow Stages</h3>
            <p>Track tasks through Pending, In Progress, and Done with priority levels.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>React SPA</h3>
            <p>Single-page application with React Router for seamless navigation.</p>
          </FeatureCard>
        </div>
      </section>
    </PageShell>
  );
}

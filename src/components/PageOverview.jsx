import { OverviewCard } from './ui/Card';

export default function PageOverview({ purpose, workflow, flowPath }) {
  return (
    <section className="page-overview ui-page-overview" aria-labelledby="overview-heading">
      <div className="page-overview-inner">
        <h2 id="overview-heading">Page Overview</h2>
        <div className="overview-grid">
          <OverviewCard title="Purpose">{purpose}</OverviewCard>
          <OverviewCard title="System Workflow">{workflow}</OverviewCard>
        </div>
        <p className="workflow-path">{flowPath}</p>
      </div>
    </section>
  );
}

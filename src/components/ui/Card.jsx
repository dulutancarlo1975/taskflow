export function Panel({ className = '', children, ...props }) {
  return (
    <div className={`ui-panel ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SectionCard({
  className = '',
  ariaLabel,
  headerId,
  title,
  hint,
  headerClass = 'section-header',
  children
}) {
  return (
    <section className={`ui-section-card ${className}`} aria-label={ariaLabel}>
      <div className={headerClass}>
        {headerId ? <h2 id={headerId}>{title}</h2> : <h2>{title}</h2>}
        {hint && <p className="section-hint">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

export function AuthPanel({ headingId, title, hint, children }) {
  return (
    <div className="auth-panel ui-auth-panel">
      <h2 id={headingId}>{title}</h2>
      {hint && <p className="section-hint">{hint}</p>}
      {children}
    </div>
  );
}

export function ContentPanel({ className = '', split, children }) {
  return (
    <div
      className={`content-panel ui-content-panel${split ? ' content-panel--split' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function FeatureCard({ children }) {
  return <article className="feature-card ui-feature-card">{children}</article>;
}

export function OverviewCard({ title, children }) {
  return (
    <div className="overview-card ui-overview-card">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

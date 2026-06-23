export default function PageShell({ centered, children, className = '' }) {
  return (
    <main
      className={`page-main ui-page-shell ui-fade-in${centered ? ' page-main--centered' : ''} ${className}`}
    >
      {children}
    </main>
  );
}

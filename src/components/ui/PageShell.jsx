export default function PageShell({ centered, className = '', children }) {
  return (
    <main
      className={`page-main ui-page-shell ui-fade-in${centered ? ' page-main--centered' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </main>
  );
}

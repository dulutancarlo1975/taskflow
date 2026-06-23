export default function LoadingIndicator({ message = 'Loading tasks…', className = '' }) {
  return (
    <div className={`loading-indicator ui-loading ui-fade-in ${className}`} role="status" aria-live="polite">
      <span className="ui-spinner" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

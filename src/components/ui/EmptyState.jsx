export default function EmptyState({ children, className = '' }) {
  return (
    <li className={`empty-state ui-empty-state ui-fade-in ${className}`} role="status">
      {children}
    </li>
  );
}

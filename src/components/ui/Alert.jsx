export default function Alert({ variant = 'error', children, className = '' }) {
  if (!children) return null;

  const role = variant === 'success' ? 'status' : 'alert';
  const baseClass = variant === 'success' ? 'success-msg' : 'error-msg';

  return (
    <div
      className={`${baseClass} ui-alert ui-alert--${variant} ui-fade-in ${className}`}
      role={role}
    >
      {children}
    </div>
  );
}

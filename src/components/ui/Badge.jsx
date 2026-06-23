export default function Badge({ variant = 'priority', className = '', children }) {
  const classes = ['badge', 'ui-badge'];

  if (variant === 'priority') {
    classes.push('badge-priority');
  } else if (variant) {
    classes.push(variant);
  }

  if (className) classes.push(className);

  return <span className={classes.join(' ')}>{children}</span>;
}

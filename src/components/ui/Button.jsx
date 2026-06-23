import { Link } from 'react-router-dom';

const VARIANT_CLASS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  toggle: 'btn-toggle',
  edit: 'btn-edit',
  delete: 'btn-delete',
  'clear-done': 'btn-clear-done',
  filter: 'filter-btn'
};

export default function Button({
  variant = 'primary',
  size,
  block,
  active,
  className = '',
  to,
  href,
  children,
  ...props
}) {
  const classes = [
    VARIANT_CLASS[variant] || VARIANT_CLASS.primary,
    size === 'sm' ? 'btn-sm' : '',
    block ? 'btn-block' : '',
    variant === 'filter' && active ? 'is-active' : '',
    'ui-btn',
    className
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={props.type || 'button'} className={classes} {...props}>
      {children}
    </button>
  );
}

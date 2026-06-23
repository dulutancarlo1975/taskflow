export default function FormField({
  id,
  label,
  required,
  hint,
  children,
  className = ''
}) {
  return (
    <div className={`form-field ui-form-field ${className}`}>
      {label && (
        <label htmlFor={id}>
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      {children}
      {hint && <p className="ui-field-hint">{hint}</p>}
    </div>
  );
}

export function TextInput(props) {
  return <input className="ui-input" {...props} />;
}

export function TextArea(props) {
  return <textarea className="ui-textarea" {...props} />;
}

export function SelectInput({ children, ...props }) {
  return <select className="ui-select" {...props}>{children}</select>;
}

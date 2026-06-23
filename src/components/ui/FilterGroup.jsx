import Button from './Button';

export default function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="filter-group ui-filter-group" role="group" aria-label={label}>
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant="filter"
          active={value === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}

export default function StatCard({ label, value, variant = 'default' }) {
  return (
    <article className={`stat-card ui-stat-card stat-card--${variant}`}>
      <p className="stat-card__value">{value}</p>
      <p className="stat-card__label">{label}</p>
    </article>
  );
}

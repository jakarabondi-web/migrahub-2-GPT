export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-h2 text-text-primary text-balance">{title}</h1>
      {subtitle && <p className="mt-2 text-body text-text-secondary">{subtitle}</p>}
    </div>
  );
}

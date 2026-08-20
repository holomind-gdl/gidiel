export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = "",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`mb-10 ${className}`}>
      <p className="text-sm font-semibold text-ink-500 uppercase tracking-[0.18em] mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-ink-900 mb-4 text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-ink-600 max-w-2xl measure">
          {subtitle}
        </p>
      )}
    </div>
  );
}

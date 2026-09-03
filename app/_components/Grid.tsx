export function Grid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-5 grid grid-cols-8 md:grid-cols-24 gap-5 ${className}`}>
      {children}
    </div>
  );
}

export function DataTableSkeleton({ columns = 4, rows = 6 }: { columns?: number; rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-4 rounded-lg border border-white/5 p-3">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-4 flex-1 animate-pulse rounded bg-white/5"
              style={{ maxWidth: colIndex === 0 ? "40%" : undefined }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

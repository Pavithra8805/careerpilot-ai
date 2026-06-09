export default function LoadingSkeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-slate-700 rounded w-full" />
      ))}
    </div>
  )
}

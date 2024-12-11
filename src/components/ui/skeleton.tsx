import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`rounded-md bg-muted/40 relative overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-input/80 dark:via-muted to-transparent animate-shimmer"></div>
    </div>
  )
}

export { Skeleton }

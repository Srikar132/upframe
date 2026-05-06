import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-foreground",
        secondary: "bg-secondary/15 text-secondary",
        outline: "border border-border text-muted-foreground",
        muted: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

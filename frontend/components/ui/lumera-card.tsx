import * as React from "react"
import { cn } from "@/lib/utils"

const LumeraCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { hoverEffect?: boolean }
>(({ className, hoverEffect = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-300",
      hoverEffect && "hover:shadow-lg hover:-translate-y-1",
      className
    )}
    {...props}
  />
))
LumeraCard.displayName = "LumeraCard"

const LumeraCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
LumeraCardHeader.displayName = "LumeraCardHeader"

const LumeraCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-display font-medium leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
LumeraCardTitle.displayName = "LumeraCardTitle"

const LumeraCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
LumeraCardDescription.displayName = "LumeraCardDescription"

const LumeraCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
LumeraCardContent.displayName = "LumeraCardContent"

const LumeraCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
LumeraCardFooter.displayName = "LumeraCardFooter"

export {
  LumeraCard,
  LumeraCardHeader,
  LumeraCardFooter,
  LumeraCardTitle,
  LumeraCardDescription,
  LumeraCardContent,
}

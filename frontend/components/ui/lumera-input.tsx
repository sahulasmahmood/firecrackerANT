import * as React from "react"
import { cn } from "@/lib/utils"

export interface LumeraInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const LumeraInput = React.forwardRef<HTMLInputElement, LumeraInputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-lg border border-[#E5E5E5] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            icon ? "pl-9" : "",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
LumeraInput.displayName = "LumeraInput"

export { LumeraInput }

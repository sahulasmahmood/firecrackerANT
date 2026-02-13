import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const lumeraButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-200",
  {
    variants: {
      variant: {
        default: "bg-[#1A1A1A] text-white hover:bg-[#333333] shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-[#E5E5E5] bg-background hover:bg-[#F5F5F5] hover:text-accent-foreground text-[#1A1A1A]",
        secondary:
          "bg-[#F5F5F5] text-[#1A1A1A] hover:bg-[#E8E8E8]",
        ghost: "hover:bg-[#F5F5F5] hover:text-[#1A1A1A] text-[#737373]",
        link: "text-[#1A1A1A] underline-offset-4 hover:underline",
        white: "bg-white text-[#1A1A1A] hover:bg-white/90 shadow-sm", 
      },
      size: {
        default: "h-11 px-8 rounded-full",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-10 text-base",
        icon: "h-10 w-10 rounded-full",
      },
      animation: {
        none: "",
        slideUp: "transition-transform hover:-translate-y-0.5",
        scale: "hover:scale-105",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "slideUp",
    },
  }
)

export interface LumeraButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof lumeraButtonVariants> {
  asChild?: boolean
}

const LumeraButton = React.forwardRef<HTMLButtonElement, LumeraButtonProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button"
    return (
      <Comp
        className={cn(lumeraButtonVariants({ variant, size, animation, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
LumeraButton.displayName = "LumeraButton"

export { LumeraButton, lumeraButtonVariants }

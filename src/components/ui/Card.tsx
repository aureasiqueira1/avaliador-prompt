import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border bg-white shadow-lg hover:shadow-xl transition-shadow duration-200",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

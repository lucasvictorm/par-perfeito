import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        {...rest}
        className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition
        border-border bg-background text-foreground
        focus:border-primary focus:ring-2 focus:ring-primary/20
        ${className ?? ""}`}
      />
    );
  },
);

Input.displayName = "Input";

import { LabelHTMLAttributes, forwardRef } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...rest }, ref) => {
    return (
      <label
        ref={ref}
        {...rest}
        className={`text-sm font-medium text-foreground ${className ?? ""}`}
      />
    );
  },
);

Label.displayName = "Label";

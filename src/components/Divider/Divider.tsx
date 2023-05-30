import { cva } from "cva";
import { forwardRef, useMemo } from "react";

export interface IDividerProps {
  variant?: "primary" | "secondary";
  orientation?: "horizontal" | "vertical";
}

const dividerStyles = cva(["block"], {
  variants: {
    orientation: {
      vertical: "h-auto w-[1px] min-h-full self-stretch shrink-0",
      horizontal: "h-[1px] w-full",
    },
    variant: {
      primary: "bg-gray-200",
      secondary: "bg-[length:--bg-size] bg-[image:--bg-image]",
    },
  },
});

const Divider = forwardRef<HTMLSpanElement, IDividerProps>(
  ({ variant = "primary", orientation = "horizontal" }, ref) => {
    const vars = useMemo(() => {
      const bgSize = orientation === "vertical" ? "1px 5px" : "5px 1px";
      const direction = orientation === "vertical" ? "180deg" : "90deg";

      return {
        "--direction": direction,
        "--bg-size": bgSize,
        "--bg-image": `linear-gradient(var(--direction),#e9e9e9 3px,transparent 0)`,
      };
    }, [orientation]);
    return (
      <span
        className={dividerStyles({ orientation, variant })}
        style={{ ...vars } as React.CSSProperties}
        ref={ref}
      />
    );
  }
);

export default Divider;

Divider.displayName = "Divider";

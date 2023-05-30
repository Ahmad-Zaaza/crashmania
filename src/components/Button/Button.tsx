import { ComponentPropsWithoutRef, forwardRef } from "react";
import * as Polymorphic from "../../types/polymorphic";
import { cva, cx } from "cva";
import Spinner from "../Spinner/Spinner";
// import { Tooltip, TooltipPosition } from "../Tooltip";

const buttonStyles = cva(
  [
    "relative",
    "text-sm",
    "font-medium",
    "cursor-pointer",
    "inline-flex",
    "items-center",
    "justify-center",
    "transition-colors",
    "duration-200",
    "border",
    "disabled:opacity-40",
    "disabled:pointer-events-none",
    "disabled:cursor-default",
  ],
  {
    variants: {
      variant: {
        filled: "hover:bg-opacity-80 active:bg-opacity-90",
        outlined: "hover:bg-opacity-80 active:bg-opacity-90",
        ghost:
          "hover:bg-opacity-20 active:bg-opacity-30 dark:hover:bg-opacity-20 dark:active:bg-opacity-30 border-transparent",
      },
      theme: {
        primary: "",
        secondary: "",
        neutral: "",
        success: "",
        error: "",
        danger: "",
      },
      fullWidth: {
        true: "w-full",
      },

      br: {
        default: "rounded-[8px]",
        "semi-rounded": "rounded-[12px]",
        rounded: "rounded-full",
        square: "rounded-none",
      },
      size: {
        small: "px-4 py-[5px]",
        medium: "px-4 py-2",
        large: "px-6 py-[11px]",
      },
    },
    compoundVariants: [
      // Filled variant variations
      {
        variant: "filled",
        theme: "primary",
        className: "bg-primary text-onPrimary border-primary",
      },
      {
        variant: "filled",
        theme: "secondary",
        className: "bg-secondary text-onSecondary border-secondary",
      },
      {
        variant: "filled",
        theme: "neutral",
        className: "bg-[#252525]  text-white border-[#252525]",
      },
      {
        variant: "filled",
        theme: "error",
        className: "bg-error text-onError border-error",
      },
      {
        variant: "filled",
        theme: "danger",
        className: "bg-danger text-onDanger border-danger",
      },
      {
        variant: "filled",
        theme: "success",
        className: "bg-success text-onSuccess border-success",
      },
      // Outlined variant variations
      {
        variant: "outlined",
        theme: "primary",
        className:
          "text-primary border-primary hover:bg-primary hover:text-onPrimary",
      },
      {
        variant: "outlined",
        theme: "secondary",
        className:
          "text-secondary border-secondary hover:bg-secondary hover:text-onSecondary",
      },
      {
        variant: "outlined",
        theme: "neutral",
        className:
          "text-[#252525] dark:text-[#fff] hover:bg-[#252525] hover:text-white",
      },
      {
        variant: "outlined",
        theme: "error",
        className: "text-error border-error hover:bg-error hover:text-onError",
      },
      {
        variant: "outlined",
        theme: "danger",
        className:
          "text-danger border-danger hover:bg-danger hover:text-onDanger",
      },
      {
        variant: "outlined",
        theme: "success",
        className:
          "text-success border-success hover:bg-success hover:text-onSuccess",
      },
      // Ghost variant variations
      {
        variant: "ghost",
        theme: "primary",
        className: "text-primary hover:bg-primary",
      },
      {
        variant: "ghost",
        theme: "secondary",
        className: "text-secondary hover:bg-secondary",
      },
      {
        variant: "ghost",
        theme: "neutral",
        className: "dark:hover:bg-slate-400 hover:bg-[#252525]",
      },
      {
        variant: "ghost",
        theme: "error",
        className: "text-error hover:bg-error",
      },
      {
        variant: "ghost",
        theme: "danger",
        className: "text-danger hover:bg-danger",
      },
      {
        variant: "ghost",
        theme: "success",
        className: "text-success hover:bg-success",
      },
    ],
    defaultVariants: {
      variant: "filled",
      br: "default",
      size: "medium",
    },
  }
);

type ButtonVariants = "filled" | "outlined" | "ghost";

type ButtonTheme =
  | "danger"
  | "success"
  | "primary"
  | "neutral"
  | "error"
  | "secondary";

type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  /**
   * Appearance of the button
   */
  variant?: ButtonVariants;
  /**
   * Appearance of the button
   */
  theme?: ButtonTheme;
  /**
   * Start Icon Component
   */
  startIcon?: JSX.Element;
  /**
   * End Icon Component
   */
  endIcon?: JSX.Element;
  children: React.ReactNode;
  /**
   * Controls the size of the button
   */
  size?: ButtonSize;
  /**
   * If `true` sets the width to 100%
   */
  fullWidth?: boolean;
  /**
   * If `true` Shows a loading indicator
   */
  isLoading?: boolean;

  shape?: "semi-rounded" | "square" | "default" | "rounded";
  /**
   * If `false` will disable hover elevation animation.
   *
   * @default true
   */
  disabled?: boolean;
  /**
   * If `false` will disable hover elevation animation.
   *
   * @default true
   */
  //   tooltipProps?: {
  //     text: string;
  //     position?: TooltipPosition;
  //   };
}

const innerContainerStyles = cva(
  ["inline-flex", "items-center", "justify-center", "flex-1"],
  {
    variants: {
      isLoading: {
        true: "opacity-0",
      },
    },
  }
);

/**
 * @description
 * Change log:
 *
 * - `variant` is now `size` is now only "medium" & "large".
 *
 * - `kind` is replaced with `variant` and only supportes `primary`,`secondary` and `tertiary`.
 *
 * - added `theme` prop which determines the color of the button.
 *
 * - added tooltip support that can be configured using `tooltipProps`
 *
 * - fixed: loading state causing button to shrink.
 *
 */
const Button = forwardRef(
  (
    {
      size = "large",
      variant = "filled",
      isLoading,
      type = "button",
      shape = "semi-rounded",
      theme = "primary",
      fullWidth,
      className,
      //   tooltipProps,
      startIcon,
      endIcon,
      style,
      children,
      disabled,
      as,
      ...delegated
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={buttonStyles({
          className,
          br: shape,
          variant,
          size,
          theme,
          fullWidth,
        })}
        style={{ ...style }}
        disabled={disabled || isLoading}
        {...delegated}
      >
        <span className={innerContainerStyles({ isLoading })}>
          {startIcon ? (
            <span style={{ marginInlineEnd: "8px" }}>{startIcon}</span>
          ) : null}
          {children}
          {endIcon ? (
            <span style={{ marginInlineStart: "8px" }}>{endIcon}</span>
          ) : null}
        </span>
        {isLoading && (
          <div
            className={cx(
              "absolute",
              "inset-0",
              "flex",
              "items-center",
              "justify-center"
            )}
          >
            <Spinner />
          </div>
        )}
        {/* {typeof tooltipProps !== "undefined" && (
          <Tooltip position={tooltipProps.position}>
            {tooltipProps.text}
          </Tooltip>
        )} */}
      </button>
    );
  }
) as Polymorphic.ForwardRefComponent<"button", ButtonProps>;
export default Button;
Button.displayName = "Button";

export type { ButtonProps, ButtonVariants };

Button.defaultProps = {
  theme: "primary",
};

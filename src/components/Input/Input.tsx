import { cva, cx } from "cva";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const wrapperStyles = cva(
  ["relative", "rounded-[8px]", "overflow-hidden", "focus-within:ring-2"],
  {
    variants: {
      disabled: {
        true: "opacity-70",
      },
      error: {
        true: "ring-error",
      },
      readOnly: {
        true: "focus-within:ring-0",
        false: "ring-blue-500",
      },
    },
    compoundVariants: [
      {
        error: true,
        readOnly: false,
        className: "ring-error",
      },
    ],
  }
);

const inputStyles = cva(
  [
    "min-w-0",
    "w-full",
    "font-medium",
    "rounded-[8px]",
    "transition-colors",
    "duration-200",
    "border",
    "outline-none",
    "disabled:opacity-70",
    "disabled:pointer-events-none",
    "disabled:cursor-default",
    "autofill:transition-colors",
    "autofill:duration-[600000]",
    "autofill:focus:transition-colors",
    "autofill:focus:duration-[600000]",
  ],
  {
    variants: {
      size: {
        small: "px-2 py-[5px]",
        medium: "px-2 py-2",
        large: "px-3 py-[11px]",
      },
      hasPrefix: {
        true: "ps-8",
      },
      hasSuffix: {
        true: "pe-8",
      },
      readOnly: {
        true: "cursor-auto",
      },
    },

    defaultVariants: {
      size: "medium",
    },
  }
);

const adornmentStyles = cx(
  "absolute",
  "top-0",
  "bottom-0",
  "max-w-[20px]",
  "inline-flex",
  "items-center",
  "justify-center"
);

interface IInputProps extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  /**
   * Input size.
   * @default 'medium'
   */
  size?: "small" | "medium" | "large";
  /**
   * Input prefix. Can be a symbol or an icon. colored by primary color
   */
  inputPrefix?: JSX.Element;
  /**
   * Input suffix. Can be a symbol or an icon. colored by primary color
   */
  inputSuffix?: JSX.Element;
  /**
   * Toggle input error state by providing a `boolean` to error text directly
   */
  error?: boolean | string;
  /**
   * className applied to input container
   */
  className?: string;
  /**
   * className applied to input element
   */
  inputClassName?: string;
}

/**
   * @description
   * Change log:
   *
   * - added new prop `w` that sets the input container width
   * 
   * - Remove `variant` prop and replace it with `size`
   *
   
   *
   */
const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className,
      error,
      inputClassName,
      inputPrefix: InputPrefix,
      inputSuffix: InputSuffix,
      disabled,
      size = "medium",
      readOnly,
      ...delegated
    },
    ref
  ) => {
    return (
      <>
        <div
          className={wrapperStyles({
            className,
            disabled,
            error: Boolean(error),
            readOnly,
          })}
        >
          {InputPrefix ? (
            <span
              className={adornmentStyles}
              style={{ insetInlineStart: "8px" }}
              tabIndex={-1}
            >
              {InputPrefix}
            </span>
          ) : null}
          <input
            ref={ref}
            readOnly={readOnly}
            className={inputStyles({
              className: inputClassName,
              size,
              readOnly,
              hasPrefix: Boolean(InputPrefix),
              hasSuffix: Boolean(InputSuffix),
            })}
            disabled={disabled}
            {...delegated}
          />
          {InputSuffix ? (
            <span
              className={adornmentStyles}
              style={{ insetInlineEnd: "8px" }}
              tabIndex={-1}
            >
              {InputSuffix}
            </span>
          ) : null}
        </div>
        {typeof error === "string" ? (
          <span className="block mt-2 text-sm text-danger" role="alert">
            {error}
          </span>
        ) : null}
      </>
    );
  }
);

export default Input;
Input.displayName = "Input";
export type { IInputProps };

import { ComponentPropsWithoutRef, forwardRef } from "react";
import * as Polymorphic from "../../types/polymorphic";
import useTextStyles from "./useTextStyles";
import { ExtendableCSSProps } from "../../types/theme";
import { cva } from "cva";

type TextRoles =
  | "displayLarge"
  | "displayMedium"
  | "displaySmall"
  | "headlineLarge"
  | "headlineMedium"
  | "headlineSmall"
  | "titleLarge"
  | "titleMedium"
  | "titleSmall"
  | "bodyLarge"
  | "bodyMedium"
  | "bodySmall";

type TextProps = {
  variant?: TextRoles;
  textAlign?: "start" | "center" | "end";
} & Pick<ExtendableCSSProps, "mb" | "mt" | "my" | "mx" | "display"> &
  ComponentPropsWithoutRef<"p">;

const textStyles = cva([], {
  variants: {
    variant: {
      displayLarge: "text-displayLarge",
      displayMedium: "text-displayMedium",
      displaySmall: "text-displaySmall",
      headlineLarge: "text-headlineLarge",
      headlineMedium: "text-headlineMedium",
      headlineSmall: "text-headlineSmall",
      titleLarge: "text-titleLarge",
      titleMedium: "text-titleMedium",
      titleSmall: "text-titleSmall",
      bodyLarge: "text-bodyLarge",
      bodyMedium: "text-bodyMedium",
      bodySmall: "text-bodySmall",
    },
    textAlign: {
      start: "text-start",
      end: "text-end",
      center: "text-center",
    },
  },
});

const Text = forwardRef(
  (
    {
      as: As = "p",
      variant,
      children,
      style,
      textAlign,
      className,
      mb,
      mt,
      my,
      mx,
      display,
      ...delegated
    },
    ref
  ) => {
    const { indentStyles } = useTextStyles({ mb, mt, mx, my, display });

    return (
      <As
        ref={ref}
        className={textStyles({ variant, className, textAlign })}
        style={
          {
            ...indentStyles,
            ...style,
          } as React.CSSProperties
        }
        {...delegated}
      >
        {children}
      </As>
    );
  }
) as Polymorphic.ForwardRefComponent<"p", TextProps>;

export default Text;

Text.displayName = "Text";

export type { TextRoles, TextProps };

import { forwardRef } from "react";
import * as Polymorphic from "../../types/polymorphic";
import { IBoxProps } from "./Box.types";
import useBoxProps from "./useBoxProps";
import { cva } from "cva";
import styles from "./boxStyles.module.css";

const boxStyles = cva([], {
  variants: {
    br: {
      default: "rounded-[8px]",
      rounded: "rounded-[12px]",
      square: "rounded-none",
    },
    paper: {
      true: "bg-paper",
    },
    bordered: {
      true: "border",
    },
    elevation: {
      1: styles["elevation-1"],
      2: styles["elevation-2"],
      3: styles["elevation-3"],
      4: styles["elevation-4"],
      5: styles["elevation-5"],
      6: styles["elevation-6"],
      7: styles["elevation-7"],
      8: styles["elevation-8"],
      9: styles["elevation-9"],
      10: styles["elevation-10"],
    },
  },
});

const Box = forwardRef(
  (
    {
      as: As = "div",
      style,
      className,
      br,
      bordered,
      elevation,
      paper,
      ...props
    },
    ref
  ) => {
    const { indentStyles, otherProps } = useBoxProps(props);
    return (
      <As
        ref={ref}
        className={boxStyles({
          className,
          br,
          bordered,
          elevation,
          paper,
        })}
        style={
          {
            ...indentStyles,
            ...style,
          } as React.CSSProperties
        }
        {...otherProps}
      />
    );
  }
) as Polymorphic.ForwardRefComponent<"div", IBoxProps>;

export default Box;

Box.displayName = "Box";

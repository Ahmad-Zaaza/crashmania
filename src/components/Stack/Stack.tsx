import { forwardRef } from "react";
import * as Polymorphic from "../../types/polymorphic";
import Box from "../Box/Box";
import useStackProps from "./useStackProps";
import { StackProps } from "./Stack.types";

const Stack = forwardRef(
  (
    {
      as = "div",
      display = "flex",
      style,
      alignItems,
      flexDirection,
      flexWrap,
      gap,
      justifyContent,
      ...otherProps
    },
    ref
  ) => {
    const { indentStyles } = useStackProps({
      alignItems,
      display,
      flexDirection,
      flexWrap,
      gap,
      justifyContent,
    });
    return (
      <Box
        as={as}
        ref={ref}
        display={display}
        style={{ ...indentStyles, ...style } as React.CSSProperties}
        {...otherProps}
      />
    );
  }
) as Polymorphic.ForwardRefComponent<"div", StackProps>;

Stack.displayName = "Stack";

export default Stack;

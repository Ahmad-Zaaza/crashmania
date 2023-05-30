import { calculateIndentStyles } from "../../utils/styleHelpers";
import { useMemo } from "react";

import { TextProps } from "./Text";

const useTextStyles = ({
  mb,
  mt,
  my,
  mx,
  display,
}: Pick<TextProps, "mb" | "mt" | "my" | "mx" | "display">) => {
  const indentStyles = useMemo(
    () =>
      calculateIndentStyles({
        marginBlock: my,
        marginInline: mx,
        marginBottom: mb,
        marginTop: mt,
        display,
      }),
    [my, mx, mb, mt, display]
  );

  return { indentStyles: indentStyles as React.CSSProperties };
};

export default useTextStyles;

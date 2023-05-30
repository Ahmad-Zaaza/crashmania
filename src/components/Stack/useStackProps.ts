import { useMemo } from "react";
import { calculateIndentStyles } from "../../utils/styleHelpers";
import { StackProps } from "./Stack.types";

function useStackProps({
  alignItems,
  flexDirection,
  gap,
  justifyContent,
  display = "flex",
  flexWrap,
}: Pick<
  StackProps,
  | "alignItems"
  | "flexDirection"
  | "gap"
  | "display"
  | "flexWrap"
  | "justifyContent"
>) {
  const indentStyles = useMemo(
    () =>
      calculateIndentStyles({
        alignItems: alignItems,
        flexDirection,
        gap,
        justifyContent: justifyContent,
        display,
        flexWrap: flexWrap,
      }),
    [alignItems, flexDirection, gap, justifyContent, display, flexWrap]
  );

  return {
    indentStyles,
  };
}
export default useStackProps;

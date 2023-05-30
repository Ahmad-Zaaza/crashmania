import { ExtendableCSSProps } from "../../types/theme";

export interface IBoxProps extends ExtendableCSSProps {
  /**
   * Multiplier of all indents. For example, if you specify a margin-top equal to 3 (mt = {3}), it will be 12px (3 * 4 = 12).
   * @default 4
   */
  scaleIndent?: number;
  elevation?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  bordered?: boolean;
  /**
   * CSS `border-radius` property, compatible with theme `borderRadiuses` prop
   */
  br?: "square" | "default" | "rounded";

  /**
   * If `true`, the background color will match the `paper` theme color. best practice is to dynamically change the `paper` theme color to match color scheme.
   *
   */
  paper?: boolean;
}

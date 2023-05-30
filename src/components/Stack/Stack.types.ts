import { CSSProperties } from "react";
import { IBoxProps } from "../Box/Box.types";

export interface StackProps extends IBoxProps {
  /**
   * Controls flex direction
   * @default 'row'
   */
  flexDirection?: CSSProperties["flexDirection"];

  /**
   * applies inline-flex;
   */
  display?: CSSProperties["display"];
  /**
   * controls `flex-wrap` property;
   */
  flexWrap?: CSSProperties["flexWrap"];
  /**
   * Controls `align-items` flex property
   */
  alignItems?: CSSProperties["alignItems"];
  /**
   * Controls `justfify-content` flex property
   */
  justifyContent?: CSSProperties["justifyContent"];
  /**
   * Spacing between items, measured by `value * 0.25rem`
   *
   * @example <caption>Spacing of 0.5rem between elements</caption>
   *
   *  gap={2} === gap= 2 * 0.25rem
   * @default 0
   */
  gap?: number | string;
}

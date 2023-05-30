import React from "react";
import Text from "../Text/Text";

interface Props extends React.ComponentPropsWithoutRef<"p"> {
  children: React.ReactNode;
  htmlFor?: string;
}

const InputLabel: React.FC<Props> = React.forwardRef<HTMLLabelElement, Props>(
  ({ children, htmlFor, ...props }, ref) => {
    return (
      <Text
        display="block"
        mb={2}
        ref={ref}
        as="label"
        htmlFor={htmlFor}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

export default InputLabel;

InputLabel.displayName = "InputLabel";

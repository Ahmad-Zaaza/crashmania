import { FcSalesPerformance } from "react-icons/fc";
import { Button } from "../Button";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { KeyboardEvent } from "react";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  onPresetClick: (type: "half" | "double" | "max") => void;
}

const StakeInput = ({ onChange, onPresetClick, value }: IProps) => {
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Prevent entering multiple dots
    if (e.key === "." && value.includes(".")) {
      e.preventDefault();
    }
    if (["e", "-"].includes(e.key)) {
      return e.preventDefault();
    }
    if (e.key === "Backspace") {
      return;
    }
  };

  const handleStakeInput = (newValue: string) => {
    if (!newValue) {
      return onChange("0");
    }
    const reg = /^\d*\.?\d{0,2}$/;
    if (newValue.match(reg)) {
      onChange(newValue);
    }
  };
  return (
    <Stack alignItems="center" gap={2}>
      <Input
        inputPrefix={<FcSalesPerformance />}
        value={value}
        type="number"
        step={10}
        onKeyDown={onKeyDown}
        onChange={e => handleStakeInput(e.target.value)}
        className="flex-1"
        pattern="\d*"
      />
      <Stack gap={2}>
        <Button
          onClick={() => onPresetClick("half")}
          theme="neutral"
          variant="outlined"
          size="small"
        >
          1/2
        </Button>
        <Button
          onClick={() => onPresetClick("double")}
          theme="neutral"
          variant="outlined"
          size="small"
        >
          2x
        </Button>
        <Button
          onClick={() => onPresetClick("max")}
          theme="danger"
          size="small"
        >
          Max
        </Button>
      </Stack>
    </Stack>
  );
};

export default StakeInput;

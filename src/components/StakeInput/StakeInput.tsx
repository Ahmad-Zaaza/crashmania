import { FcSalesPerformance } from "react-icons/fc";
import { Button } from "../Button";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { KeyboardEvent } from "react";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  playerMaxPoints: number;
}

const StakeInput = ({ onChange, value, playerMaxPoints }: IProps) => {
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

  const onPresetClick = (type: "half" | "double" | "max") => {
    switch (type) {
      case "half":
        if (parseFloat(value) / 2 < 10) {
          onChange("10");
        } else {
          onChange((parseFloat(value) / 2).toFixed(2));
        }
        break;
      case "max":
        onChange(playerMaxPoints.toFixed(2));
        break;
      case "double":
        if (parseFloat(value) * 2 > playerMaxPoints) {
          onChange(playerMaxPoints.toFixed(2));
        } else {
          onChange((parseFloat(value) * 2).toFixed(2));
        }
        break;
      default:
        break;
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
        pattern="[0-9]*"
      />
      <Stack gap={2}>
        <Button
          onClick={() => onPresetClick("half")}
          theme="neutral"
          variant="outlined"
          size="small"
        >
          1/2x
        </Button>
        <Button
          onClick={() => onPresetClick("double")}
          theme="neutral"
          variant="outlined"
          size="small"
        >
          2x
        </Button>
        <Button onClick={() => onPresetClick("max")} size="small">
          Max
        </Button>
      </Stack>
    </Stack>
  );
};

export default StakeInput;

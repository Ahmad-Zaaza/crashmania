import React, { Dispatch, SetStateAction } from "react";
import {
  Combobox,
  ComboboxItem,
  ComboboxTrigger,
  ComboxboxContent,
} from "../Combobox/Combobox";
import { Button } from "../Button";
import { LuCheck, LuChevronsUpDown } from "react-icons/lu";
import { cx } from "cva";
import { languages } from "@/lib/languages";

interface IProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const LanguageSelector = ({ setValue, value, setOpen, open }: IProps) => {
  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <ComboboxTrigger asChild>
        <Button
          variant="outlined"
          theme="neutral"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? languages.find(language => language.value === value)?.label
            : "Select language..."}
          <LuChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </ComboboxTrigger>
      <ComboxboxContent
        placeholder="Select language..."
        emptyStateMessage="No languages found"
      >
        {languages.map(language => (
          <ComboboxItem
            key={language.value}
            onSelect={currentValue => {
              const value = languages.find(
                l => l.label === currentValue
              )?.value;

              setValue(value ?? "");
              setOpen(false);
            }}
          >
            <LuCheck
              className={cx(
                "me-2 h-4 w-4",
                value === language.value ? "opacity-100" : "opacity-0"
              )}
            />
            {language.label}
          </ComboboxItem>
        ))}
      </ComboxboxContent>
    </Combobox>
  );
};

export default LanguageSelector;

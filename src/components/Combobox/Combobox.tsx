"use client";

import * as React from "react";

import { cx } from "cva";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../Command/Command";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import { Button } from "../Button";
import { LuCheck, LuChevronsUpDown } from "react-icons/lu";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outlined"
          theme="neutral"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find(framework => framework.value === value)?.label
            : "Select framework..."}
          <LuChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map(framework => (
              <CommandItem
                key={framework.value}
                onSelect={currentValue => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <LuCheck
                  className={cx(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const ComboboxItem = CommandItem;

// export const ComboboxTrigger = React.forwardRef<
//   React.ElementRef<typeof PopoverTrigger>,
//   React.ComponentPropsWithoutRef<typeof PopoverTrigger>
// >((props, ref) => {
//   return <PopoverTrigger asChild ref={ref} {...props} />;
// });
export const ComboboxTrigger = PopoverTrigger;
ComboboxTrigger.displayName = "ComboboxTrigger";
/* <Button
  variant="outlined"
  theme="neutral"
  role="combobox"
  aria-expanded={open}
  className="w-[200px] justify-between"
>
  {value
    ? frameworks.find(framework => framework.value === value)?.label
    : "Select framework..."}
  <LuChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
</Button> */

export const Combobox = Popover;

export const ComboxboxContent = React.forwardRef<
  React.ElementRef<typeof PopoverContent>,
  React.ComponentPropsWithoutRef<typeof PopoverContent> & {
    placeholder?: string;
    emptyStateMessage?: string;
  }
>(
  (
    { placeholder, emptyStateMessage = "No results found", children, ...props },
    ref
  ) => {
    return (
      <PopoverContent ref={ref} {...props}>
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{emptyStateMessage}</CommandEmpty>
          <CommandGroup>{children}</CommandGroup>
        </Command>
      </PopoverContent>
    );
  }
);
ComboxboxContent.displayName = "ComboboxContent";
// {frameworks.map(framework => (
//   <CommandItem
//     key={framework.value}
//     onSelect={currentValue => {
//       setValue(currentValue === value ? "" : currentValue);
//       setOpen(false);
//     }}
//   >
//     <LuCheck
//       className={cx(
//         "mr-2 h-4 w-4",
//         value === framework.value ? "opacity-100" : "opacity-0"
//       )}
//     />
//     {framework.label}
//   </CommandItem>
// ))}

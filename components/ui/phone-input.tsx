import { CheckIcon, ChevronsUpDown } from "lucide-react";
import parsePhoneNumber from "libphonenumber-js";
import * as React from "react";

import * as RPNInput from "react-phone-number-input";

import flags from "react-phone-number-input/flags";
import ar from "react-phone-number-input/locale/ar";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input, InputProps } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

import { CountryCode } from "libphonenumber-js";

function formatToE164(value: string, defaultCountry: CountryCode = "SA") {
  // Use parsePhoneNumber to convert to E.164 format
  const phoneNumber = parsePhoneNumber(value, defaultCountry);
  if (phoneNumber) {
    return phoneNumber.number;
  }
  return value;
}

const PhoneInput = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, value, ...props }, ref) => {
  // Ensure that the value is in E.164 format
  const formattedValue = formatToE164(value || "");
  return (
    <RPNInput.default
      ref={ref}
      className={cn("flex", className)}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      limitMaxLength={true}
      international={false}
      defaultCountry="SA"
      initialValueFormat="national"
      labels={ar}
      maxLength={12}
      value={formattedValue} /**
       * Handles the onChange event.
       *
       * react-phone-number-input might trigger the onChange event as undefined
       * when a valid phone number is not entered. To prevent this,
       * the value is coerced to an empty string.
       *
       * @param {E164Number | undefined} value - The entered value
       */
      onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
      {...props}
    />
  );
});
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <div className="w-full">
      <Input
        className={cn("rounded-e-none rounded-s-lg", className)}
        {...props}
        ref={ref}
      />
    </div>
  ),
);
InputComponent.displayName = "InputComponent";

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
  isSingleCountry?: boolean;
};

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
  isSingleCountry,
}: CountrySelectProps) => {
  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country);
    },
    [onChange],
  );

  return (
    <>
      {isSingleCountry ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant={"outline"}
              className={cn(
                "flex items-center justify-center gap-1 rounded-e-none rounded-s-lg bg-[#F3F4F6] px-5",
              )}
              disabled={disabled}
            >
              <FlagComponent country={value} countryName={value} />
              <ChevronsUpDown
                className={cn(
                  "text-gold -mr-2 h-4 w-4 opacity-50",
                  disabled ? "hidden" : "opacity-100",
                )}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandList>
                <ScrollArea className="h-72">
                  <CommandInput
                    className="justify-center text-end text-lg"
                    placeholder=".... ابحث عن المدينة"
                  />
                  <CommandEmpty>لا يوجد مدينة </CommandEmpty>
                  <CommandGroup>
                    {options
                      .filter((x) => x.value)
                      .map((option) => (
                        <CommandItem
                          className="gap-2"
                          key={option.value}
                          onSelect={() => handleSelect(option.value)}
                        >
                          <FlagComponent
                            country={option.value}
                            countryName={option.label}
                          />
                          <span className="flex-1 text-sm">{option.label}</span>
                          {option.value && (
                            <span className="text-sm text-foreground/50">
                              {`+${RPNInput.getCountryCallingCode(option.value)}`}
                            </span>
                          )}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              option.value === value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant={"outline"}
              className={cn("flex gap-1 rounded-e-none rounded-s-lg px-3")}
              disabled={disabled}
            >
              <FlagComponent country={value} countryName={value} />
            </Button>
          </PopoverTrigger>
        </Popover>
      )}
    </>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  {
    /* Only Sa flag is needed */
  }
  // const Flag = flags[country];
  const Flag = flags["SA"];

  return (
    <span className="mx-auto flex h-4 w-10 items-center justify-center overflow-hidden rounded-sm">
      {/* {Flag && <Flag title={countryName} />} */}
      966+
    </span>
  );
};
FlagComponent.displayName = "FlagComponent";

export { PhoneInput };

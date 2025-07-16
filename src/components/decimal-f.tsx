import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
} from "@/components/ui/number-field";
import { createSignal } from "solid-js";
import { className } from "solid-js/web";

const DecimalNumberField = (props: {
  placeholder?: string;
  className?: string;
}) => {
  const [value, setValue] = createSignal(45.56);

  return (
    <NumberField
      rawValue={value()}
      onRawValueChange={setValue}
      minValue={0}
      step={0.01}
      class={props.className || "w-40 bg-background font-medium"}
    >
      <NumberFieldGroup>
        <NumberFieldDecrementTrigger aria-label="Decrement" />
        <NumberFieldInput placeholder={props.placeholder ?? "Enter a number"} />
        <NumberFieldIncrementTrigger aria-label="Increment" />
      </NumberFieldGroup>
    </NumberField>
  );
};

export default DecimalNumberField;

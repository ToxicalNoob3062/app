import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectHiddenSelect,
} from "@/components/ui/select";

export default function SelectComp(props: {
  name: string;
  options: string[];
  defaultValue?: string[];
  className?: string;
  onChange?: (value: string | null) => void
}) {
  return (
    <Select
      class={props.className || "w-32 bg-background font-medium"}
      options={props.options}
      defaultValue={props.defaultValue}
      onChange={props.onChange as ()=> void}
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
      )}
    >
      <SelectTrigger>
        <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
      </SelectTrigger>
      <SelectContent />
      <SelectHiddenSelect name={props.name} value={props.defaultValue?.[0] || ""}>
        {props.options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </SelectHiddenSelect>
    </Select>
  );
}

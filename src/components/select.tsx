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
}) {
  return (
    <Select
      class={props.className || "w-32 bg-background font-medium"}
      options={props.options}
      defaultValue={props.defaultValue}
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
      )}
    >
      <SelectTrigger>
        <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
      </SelectTrigger>
      <SelectContent />
      <SelectHiddenSelect name={props.name}>
        {props.options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </SelectHiddenSelect>
    </Select>
  );
}

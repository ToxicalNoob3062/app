import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectComp(props: {
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
    </Select>
  );
}

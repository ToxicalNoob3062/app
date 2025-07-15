import type { ColumnDef } from "@tanstack/solid-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Checkbox, CheckboxControl } from "../ui/checkbox";
import { Badge } from "@/components/ui/badge";

export type Student = {
    id: string;
    name: string;
    age: number;
    division: string;
    contact: string;
    createdAt: number;
}

export const columns: ColumnDef<Student>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                indeterminate={table.getIsSomePageRowsSelected()}
                checked={table.getIsAllPageRowsSelected()}
                onChange={value => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            >
                <CheckboxControl />
            </Checkbox>
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onChange={value => row.toggleSelected(!!value)}
                aria-label="Select row"
            >
                <CheckboxControl />
            </Checkbox>
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Name",
        accessorKey: "name",
    },
    {
        header: "Age",
        accessorKey: "age",
    },
    {
        header: "Division",
        accessorKey: "division",
        cell: info => (
            <Badge variant={"outline"} >
                {info.getValue() as string}
            </Badge>
        )
    },
    {
        header: "Contact",
        accessorKey: "contact",
    },
    {
        header: "Stamp",
        accessorKey: "createdAt",
        cell: info => new Date(info.getValue() as number).toLocaleDateString(),
    },
    {
        id: "actions",
        cell: () => (
            <DropdownMenu placement="bottom-end">
                <DropdownMenuTrigger class="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24">
                        <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
                        />
                    </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    },

]
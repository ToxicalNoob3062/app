import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogClose,
} from "@/components/ui/alert-dialog";

import { JSX } from "solid-js";

export default function FormDialog(props: {
  children: JSX.Element;
  triggerText: string;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <AlertDialog modal open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogTrigger
        class={`py-2 px-4 rounded-lg text-sm font-medium ${props.className}`}
      >
        {props.triggerText}
      </AlertDialogTrigger>
      <AlertDialogContent
        onInteractOutside={(event) => event.preventDefault()}
        class="p-0"
      >
        {props.children}
        <AlertDialogClose class="absolute top-2 right-2 rounded-lg p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </AlertDialogClose>
      </AlertDialogContent>
    </AlertDialog>
  );
}

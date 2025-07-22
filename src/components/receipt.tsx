import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerLabel,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Transaction } from "./transaction-table/columns";

// receipt.tsx
export default function Receipt(props: {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    receiptData?: Transaction;
}) {
    return (
        <Drawer
            closeOnOutsideFocus={false}
            closeOnOutsidePointerStrategy="pointerup"
            open={props.open}
            onOpenChange={props.onOpenChange}
            modal={true}
        >
            <DrawerTrigger>Receipt</DrawerTrigger>
            <DrawerContent class="p-6 max-w-md mx-auto bg-background rounded-t-lg">
                <DrawerHeader>
                    <DrawerLabel>Receipt</DrawerLabel>
                </DrawerHeader>
                <div class="p-4">
                    <p><strong>ID:</strong> {props.receiptData?.id}</p>
                    <p><strong>Amount:</strong> {props.receiptData?.amount}</p>
                    <p><strong>Type:</strong> {props.receiptData?.type}</p>
                    <p><strong>Date:</strong> {props.receiptData?.createdAt ? new Date(props.receiptData.createdAt).toLocaleDateString() : "N/A"}</p>
                </div>
                <DrawerFooter>
                    <DrawerClose>Close</DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

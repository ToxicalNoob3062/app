import {
    AlertDialog,
    AlertDialogClose,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogAction
} from "@/components/ui/alert-dialog";

export function Dialog(props:{
    title: string;
    description: string;
    triggerText: string;
    actionText: string;
    onAction: () => void;
}) {
    return <AlertDialog>
        <AlertDialogTrigger class="py-2 px-4 text-sm font-medium">{props.triggerText}</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{props.title}</AlertDialogTitle>
                <AlertDialogDescription>
                    {props.description} 
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogClose>Cancel</AlertDialogClose>
                <AlertDialogAction onClick={props.onAction}>{props.actionText}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}
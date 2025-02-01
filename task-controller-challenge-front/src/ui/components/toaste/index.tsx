import { toaster } from "@/components/ui/toaster";
import { ToastStatus } from "@/ui/types/ToastStatus";


export function ToasteMessage(title: string,description: string,type: ToastStatus) {
    return toaster.create({
        title: title,
        description: description,
        type: type,
        // action: {
        //     label: "OK",
        //     onClick: () => { },
        // },
    })
}

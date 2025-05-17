import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { X } from "lucide-react";


interface ModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

export function Modal({
    isOpen,
    title,
    onClose,
    children,
}: ModalProps) {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <div
                className={` ${isOpen ? "fixed inset-0 z-40 h-screen bg-black/5 backdrop-blur-sm" : ""} `}
            />
            <DialogContent className="max-w-md rounded-lg p-0 bg-white [&>button]:hidden ">
                <DialogHeader className="flex border-b">
                    <DialogTitle className="text-lg font-semibold p-4 ">{title}</DialogTitle>
                    <Button
                        onClick={onClose}
                        className="absolute right-4 top-4 size-8 rounded-full bg-[#0404040D] text-gray-400 hover:bg-[#0404040D] hover:text-gray-600 !mt-0"
                    >
                        <X className="h-6 w-6 text-[#363840] m-0" />
                    </Button>
                </DialogHeader>

                <div className="space-y-3 p-4">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface MemberOptionDialogProps {
  triggerText: string;
  titleText: string;
  okText: string;
  cancelText: string;
  okFunction: () => Promise<void>;
  cancelFunction?: () => Promise<void>;
}

const MemberOptionDialog = ({
  triggerText,
  titleText,
  okText,
  cancelText,
  okFunction,
  cancelFunction,
}: MemberOptionDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full flex flex-row justify-start items-center py-1.5 px-2 font-normal"
          variant="ghost"
        >
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-primary font-medium text-base">
          {titleText}
        </DialogTitle>
        <DialogFooter>
          <Button size="sm" variant="default" onClick={okFunction}>
            {okText}
          </Button>
          {cancelFunction ? (
            <Button size="sm" variant="outline" onClick={cancelFunction}>
              {cancelText}
            </Button>
          ) : (
            <DialogClose asChild>
              <Button size="sm" variant="outline">
                {cancelText}
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MemberOptionDialog;

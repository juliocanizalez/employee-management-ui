import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

import { Button } from "@nextui-org/button";
import { ConfirmDialogProps } from "@/interfaces/IConfirmDialog";

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onOpenChange,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm = () => {},
  onCancel = () => {},
  isDangerous = false,
  size = "sm",
  placement = "center",
}) => {
  const handleConfirm = async (): Promise<void> => {
    await onConfirm();
    onOpenChange(false);
  };

  const handleCancel = async (): Promise<void> => {
    await onCancel();
    onOpenChange(false);
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      placement={placement}
      size={size}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p className="text-gray-500">{message}</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={handleCancel}>
                {cancelLabel}
              </Button>
              <Button
                color={isDangerous ? "danger" : "primary"}
                onPress={handleConfirm}
              >
                {confirmLabel}
              </Button>
            </ModalFooter>
          </>
        }
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDialog;

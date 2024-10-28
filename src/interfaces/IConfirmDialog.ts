import { ModalProps } from "@nextui-org/modal";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  isDangerous?: boolean;
  size?: ModalProps["size"];
  placement?: ModalProps["placement"];
}

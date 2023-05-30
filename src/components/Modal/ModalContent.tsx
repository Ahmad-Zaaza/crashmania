"use client";

import * as Dialog from "@radix-ui/react-dialog";
import styles from "./modal.module.css";
import { MdClose } from "react-icons/md";
import { forwardRef } from "react";
import { cx } from "cva";
import { Box } from "../Box";
import { Text } from "../Text";
import { Button } from "../Button";

interface ModalProps {
  width?: string;
  children: React.ReactNode;
  title?: string;
  description?: string;
  onClose?: VoidFunction;
  className?: string;
}

/**
 * In order to lazy load this component the modal has to be controlled.
 * This component should conditionally render otherwise dynamic imports won't happen.
 *
 * @example
 * ```
 * {isOpen && <ModalContent {...}/>}
 *  ```
 */
const ModalContent = forwardRef<HTMLDivElement, ModalProps>(
  (
    { description, title, children, onClose, className, width = "400px" },
    ref
  ) => {
    return (
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={onClose}
          className={cx(styles.DialogOverlay, "animate-fade")}
        />
        <Dialog.Content
          className={cx(styles.DialogContent, "animate-fadeUp", className)}
          style={{ "--w": width } as React.CSSProperties}
          asChild
        >
          <Box br="rounded" paper px={7} py={6}>
            {title && (
              <Dialog.Title asChild>
                <Text variant="headlineSmall" className="font-semibold">
                  {title}
                </Text>
              </Dialog.Title>
            )}
            {description && (
              <Dialog.Description>{description}</Dialog.Description>
            )}
            {children}
            <Dialog.Close asChild onClick={onClose}>
              <Button
                className={styles.IconButton}
                variant="ghost"
                size="small"
                theme="neutral"
              >
                <MdClose size={20} />
              </Button>
            </Dialog.Close>
          </Box>
        </Dialog.Content>
      </Dialog.Portal>
    );
  }
);
export default ModalContent;
ModalContent.displayName = "Dialog";

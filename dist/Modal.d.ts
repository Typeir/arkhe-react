/**
 * @fileoverview Modal on Zag's dialog machine. Stays mounted once hydrated;
 * the `hidden` attribute plus CSS transitions animate entry and exit, so no
 * presence machine is needed.
 *
 * @module packages/react/src/Modal
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { type DialogRole } from '@arkhe/core';
import { type JSX, type ReactNode } from 'react';
/**
 * Props of Modal.
 *
 * @interface ModalProps
 * @property {string} title - Heading; names the dialog.
 * @property {string} [description] - Text under the heading; describes the dialog.
 * @property {string} [trigger] - Text of a built-in open button. Omit to open from state only.
 * @property {boolean} [open] - Open state; makes the modal controlled.
 * @property {boolean} [defaultOpen] - First open state when uncontrolled.
 * @property {(open: boolean) => void} [onOpenChange] - Open-state callback.
 * @property {DialogRole} [role] - `alertdialog` for confirmations. Defaults to `dialog`.
 * @property {() => HTMLElement | null} [finalFocus] - Element to focus on close; for when the opener is gone.
 * @property {ReactNode} [children] - Body.
 */
export interface ModalProps {
    readonly title: string;
    readonly description?: string;
    readonly trigger?: string;
    readonly open?: boolean;
    readonly defaultOpen?: boolean;
    readonly onOpenChange?: (open: boolean) => void;
    readonly role?: DialogRole;
    readonly finalFocus?: () => HTMLElement | null;
    readonly children?: ReactNode;
}
/**
 * Renders a modal dialog. The portal mounts after hydration so server HTML
 * matches the client; Zag stays closed until then, or its focus trap and
 * title check would run before the content exists.
 *
 * @component
 * @param {ModalProps} props - Title, open state, body.
 * @returns {JSX.Element} Trigger and portal.
 */
export declare const Modal: ({ title, description, trigger, open, defaultOpen, onOpenChange, role, finalFocus, children, }: ModalProps) => JSX.Element;

/**
 * @fileoverview Collapsible: a trigger button, optionally inside a heading,
 * actions beside it, and a region find-in-page can open. Height animates in
 * CSS.
 *
 * @module packages/react/src/section/Collapsible
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
import { type HeadingLevel } from '@arkhe/core';
import { type JSX, type ReactNode } from 'react';
/**
 * Props of Collapsible.
 *
 * @interface CollapsibleProps
 * @property {string} title - Trigger text; names the button and never changes.
 * @property {boolean} [open] - Open state; makes it controlled.
 * @property {boolean} [defaultOpen] - First state when uncontrolled.
 * @property {(open: boolean) => void} [onOpenChange] - Reports changes, find-in-page included.
 * @property {HeadingLevel} [heading] - Wraps the trigger in a heading of this level.
 * @property {ReactNode} [actions] - Controls beside the trigger, outside it.
 * @property {boolean} [lazy] - Mounts the content on first open, then keeps it.
 * @property {boolean} [disabled] - The trigger stays focusable and ignores presses.
 * @property {ReactNode} children - Content.
 */
export interface CollapsibleProps {
    readonly title: string;
    readonly open?: boolean;
    readonly defaultOpen?: boolean;
    readonly onOpenChange?: (open: boolean) => void;
    readonly heading?: HeadingLevel;
    readonly actions?: ReactNode;
    readonly lazy?: boolean;
    readonly disabled?: boolean;
    readonly children: ReactNode;
}
/**
 * Renders a collapsible section. A closed region stays findable; when the
 * browser reveals it, the section opens.
 *
 * @component
 * @param {CollapsibleProps} props - Component props.
 * @returns {JSX.Element} Collapsible.
 */
export declare const Collapsible: ({ title, open, defaultOpen, onOpenChange, heading, actions, lazy, disabled, children, }: CollapsibleProps) => JSX.Element;

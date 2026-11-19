/**
 * @fileoverview Popover: a non-modal panel anchored to its trigger, on Zag's
 * popover machine. Portalled into the environment's container once
 * hydrated, so server markup holds the trigger alone.
 *
 * @module packages/react/src/Popover
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { type Placement } from '@arkhe/core';
import { type JSX, type ReactNode } from 'react';
/**
 * Props of Popover.
 *
 * @interface PopoverProps
 * @property {string} trigger - Text of the open button.
 * @property {string} [title] - Heading; names the panel. Without it the trigger text does.
 * @property {boolean} [open] - Open state; makes the popover controlled.
 * @property {boolean} [defaultOpen] - First open state when uncontrolled.
 * @property {(open: boolean) => void} [onOpenChange] - Open-state callback.
 * @property {Placement} [placement] - Side. Defaults to `bottom-start`.
 * @property {ReactNode} [children] - Panel body.
 */
export interface PopoverProps {
    readonly trigger: string;
    readonly title?: string;
    readonly open?: boolean;
    readonly defaultOpen?: boolean;
    readonly onOpenChange?: (open: boolean) => void;
    readonly placement?: Placement;
    readonly children?: ReactNode;
}
/**
 * Renders a button that toggles a panel. Escape and outside clicks close it;
 * focus returns to the button.
 *
 * @component
 * @param {PopoverProps} props - Trigger, title, open state, body.
 * @returns {JSX.Element} Trigger and portalled panel.
 */
export declare const Popover: ({ trigger, title, open, defaultOpen, onOpenChange, placement, children, }: PopoverProps) => JSX.Element;

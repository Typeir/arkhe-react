/**
 * @fileoverview Tooltip: a short description on Zag's tooltip machine. One
 * is open at a time. Its content is phrasing only, never links or controls
 * (an ARIA tooltip); anything interactive, a link trigger included, belongs
 * in a HoverCard. The body
 * mounts on first open, portalled into the environment's container, so
 * server markup holds the trigger alone.
 *
 * @module packages/react/src/hint/Tooltip
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { type Placement } from '@arkhe/core';
import { type JSX, type ReactNode } from 'react';
/**
 * Props of Tooltip.
 *
 * @interface TooltipProps
 * @property {ReactNode} content - Description; non-interactive phrasing content.
 * @property {ReactNode} children - Trigger content.
 * @property {boolean} [inline] - Makes the trigger inline text with a tab stop; it may hold other triggers.
 * @property {boolean} [open] - Open state; makes the tooltip controlled.
 * @property {boolean} [defaultOpen] - First open state when uncontrolled.
 * @property {(open: boolean) => void} [onOpenChange] - Open-state callback.
 * @property {Placement} [placement] - Side. Defaults to `top`.
 * @property {number} [openDelay] - Milliseconds before opening. Defaults to 400.
 * @property {number} [closeDelay] - Milliseconds before closing. Defaults to 150.
 */
export interface TooltipProps {
    readonly content: ReactNode;
    readonly children: ReactNode;
    readonly inline?: boolean;
    readonly open?: boolean;
    readonly defaultOpen?: boolean;
    readonly onOpenChange?: (open: boolean) => void;
    readonly placement?: Placement;
    readonly openDelay?: number;
    readonly closeDelay?: number;
}
/**
 * Renders a trigger that shows `content` on hover, keyboard focus and tap.
 * A tap outside or Escape closes it. The machine sleeps until the first
 * hover, focus or tap, and again once it has closed.
 *
 * @component
 * @param {TooltipProps} props - Description, trigger, open state, timing.
 * @returns {JSX.Element} Trigger, and the description once opened.
 */
export declare const Tooltip: (props: TooltipProps) => JSX.Element;

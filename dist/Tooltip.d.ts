/**
 * @fileoverview Tooltip: a short text hint on Zag's tooltip machine. One is
 * open at a time and it holds no controls; rich or nested content belongs in
 * a HoverCard.
 *
 * @module packages/react/src/Tooltip
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
 * @property {string} content - Hint text.
 * @property {ReactNode} children - Trigger content; wrapped in a button.
 * @property {Placement} [placement] - Side. Defaults to `top`.
 * @property {number} [openDelay] - Milliseconds before opening. Defaults to 400.
 * @property {number} [closeDelay] - Milliseconds before closing. Defaults to 150.
 */
export interface TooltipProps {
    readonly content: string;
    readonly children: ReactNode;
    readonly placement?: Placement;
    readonly openDelay?: number;
    readonly closeDelay?: number;
}
/**
 * Renders a trigger that shows `content` on hover and keyboard focus.
 *
 * @component
 * @param {TooltipProps} props - Hint, trigger, timing.
 * @returns {JSX.Element} Trigger and hint.
 */
export declare const Tooltip: ({ content, children, placement, openDelay, closeDelay, }: TooltipProps) => JSX.Element;

/**
 * @fileoverview HoverCard: a rich reference card on Zag's hover-card machine.
 * Cards nest (a card's content may hold more cards), load content on first
 * open, and pin open until unpinned.
 *
 * @module packages/react/src/HoverCard
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { type Placement } from '@arkhe/core';
import { type JSX, type ReactNode } from 'react';
/**
 * Props of HoverCard. Give `content`, or `load` with `loaded`.
 *
 * @interface HoverCardProps
 * @template T
 * @property {string} title - Card heading; also names the pin button.
 * @property {ReactNode} children - Trigger content; wrapped in a button.
 * @property {ReactNode} [content] - Card body.
 * @property {() => Promise<T>} [load] - Fetches the body on first open. A new function loads afresh; keep it stable.
 * @property {(value: T) => ReactNode} [loaded] - Renders what `load` returned.
 * @property {boolean} [pinnable] - Shows a pin button. Defaults to true.
 * @property {Placement} [placement] - Side. Defaults to `bottom-start`.
 * @property {number} [openDelay] - Milliseconds before opening. Defaults to 400.
 * @property {number} [closeDelay] - Milliseconds before closing. Defaults to 200.
 */
export interface HoverCardProps<T> {
    readonly title: string;
    readonly children: ReactNode;
    readonly content?: ReactNode;
    readonly load?: () => Promise<T>;
    readonly loaded?: (value: T) => ReactNode;
    readonly pinnable?: boolean;
    readonly placement?: Placement;
    readonly openDelay?: number;
    readonly closeDelay?: number;
}
/**
 * Renders a trigger that opens a reference card on hover or focus. The card
 * renders in place, so a nested card stays inside its parent's layer.
 * Unpinning hands the card back to hover: it stays open while the pointer
 * is over it.
 *
 * @component
 * @param {HoverCardProps<T>} props - Title, trigger, body, timing.
 * @returns {JSX.Element} Trigger and card.
 */
export declare const HoverCard: <T>({ title, children, content, load, loaded, pinnable, placement, openDelay, closeDelay, }: HoverCardProps<T>) => JSX.Element;

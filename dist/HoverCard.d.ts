/**
 * @fileoverview HoverCard: a rich reference card on Zag's hover-card machine.
 * Cards nest (a card's content may hold more cards), load content on first
 * open, and pin open until unpinned. The card mounts on first open,
 * portalled into the environment's container, so server markup holds the
 * trigger alone and the body may hold any content.
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
 * @property {ReactNode} children - Trigger content.
 * @property {string} [href] - Makes the trigger the provider's link to this address, and adds the link to the card's header.
 * @property {boolean} [inline] - Makes the trigger inline text with a tab stop; it may hold other triggers.
 * @property {ReactNode} [content] - Card body.
 * @property {() => Promise<T>} [load] - Fetches the body on first open. A new function loads afresh; keep it stable.
 * @property {(value: T) => ReactNode} [loaded] - Renders what `load` returned.
 * @property {boolean} [pinnable] - Shows a pin button. Defaults to true.
 * @property {boolean} [open] - Open state; makes the card controlled.
 * @property {boolean} [defaultOpen] - First open state when uncontrolled.
 * @property {(open: boolean) => void} [onOpenChange] - Open-state callback.
 * @property {Placement} [placement] - Side. Defaults to `bottom-start`.
 * @property {number} [openDelay] - Milliseconds before opening. Defaults to 400.
 * @property {number} [closeDelay] - Milliseconds before closing. Defaults to 200.
 */
export interface HoverCardProps<T> {
    readonly title: string;
    readonly children: ReactNode;
    readonly href?: string;
    readonly inline?: boolean;
    readonly content?: ReactNode;
    readonly load?: () => Promise<T>;
    readonly loaded?: (value: T) => ReactNode;
    readonly pinnable?: boolean;
    readonly open?: boolean;
    readonly defaultOpen?: boolean;
    readonly onOpenChange?: (open: boolean) => void;
    readonly placement?: Placement;
    readonly openDelay?: number;
    readonly closeDelay?: number;
}
/**
 * Renders a trigger that opens a reference card on hover, focus or tap. A
 * tap outside or Escape closes it, unless pinned. A tap on a link trigger
 * opens the card; the header's link follows it. A card stays open while
 * a card nested in it is open. Unpinning hands the card back to hover: it
 * stays open while the pointer is over it.
 *
 * @component
 * @param {HoverCardProps<T>} props - Title, trigger, body, open state, timing.
 * @returns {JSX.Element} Trigger, and the card once opened.
 */
export declare const HoverCard: <T>({ title, children, href, inline, content, load, loaded, pinnable, open, defaultOpen, onOpenChange, placement, openDelay, closeDelay, }: HoverCardProps<T>) => JSX.Element;

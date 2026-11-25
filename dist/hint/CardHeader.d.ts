/**
 * @fileoverview A hover card's header: the grip that drags the card and opens
 * its move menu, its small chrome title, the host's actions, then the
 * built-in link, pin and close buttons. Not exported:
 * HoverCard draws it.
 *
 * @module packages/react/src/hint/CardHeader
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
import type { JSX, ReactNode } from 'react';
/**
 * Props of CardHeader.
 *
 * @interface CardHeaderProps
 * @property {string} title - Card title; names the buttons.
 * @property {string} titleId - Id of the title, which names the card.
 * @property {string} [href] - Address of the built-in link.
 * @property {ReactNode} [actions] - Host controls of the card's chrome.
 * @property {boolean} pinnable - Shows the pin button.
 * @property {boolean} pinned - The card is pinned.
 * @property {() => void} onTogglePin - Pins or unpins.
 * @property {() => void} onClose - Closes a pinned card.
 * @property {boolean} detached - The card is dragged free.
 * @property {(value: string) => void} onMove - A move menu choice: a corner or back.
 */
export interface CardHeaderProps {
    readonly title: string;
    readonly titleId: string;
    readonly href?: string;
    readonly actions?: ReactNode;
    readonly pinnable: boolean;
    readonly pinned: boolean;
    readonly onTogglePin: () => void;
    readonly onClose: () => void;
    readonly detached: boolean;
    readonly onMove: (value: string) => void;
}
/**
 * Renders the header of a hover card.
 *
 * @component
 * @param {CardHeaderProps} props - Component props.
 * @returns {JSX.Element} Header.
 */
export declare const CardHeader: ({ title, titleId, href, actions, pinnable, pinned, onTogglePin, onClose, detached, onMove, }: CardHeaderProps) => JSX.Element;

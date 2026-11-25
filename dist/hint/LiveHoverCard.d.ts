/**
 * @fileoverview The running half of HoverCard: Zag's hover-card machine,
 * started on the first hover, focus or tap. Hands its trigger props to the
 * sleeping trigger, replays the waking event, renders the card once opened,
 * and goes back to sleep once closed: pinning, moving, loading and nested
 * cards all live here.
 *
 * @module packages/react/src/hint/LiveHoverCard
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
import { type JSX } from 'react';
import type { HoverCardProps } from './HoverCard.js';
import { type Sleep } from './useSleep.js';
/**
 * Props of LiveHoverCard.
 *
 * @interface LiveHoverCardProps
 * @template T
 * @property {string} id - Machine id.
 * @property {NonNullable<Sleep['waking']>} waking - What woke the machine; replayed once.
 * @property {Sleep} sleeper - The sleeping trigger: report, hover, press and sleep.
 */
export interface LiveHoverCardProps<T> extends Omit<HoverCardProps<T>, 'children'> {
    readonly id: string;
    readonly waking: NonNullable<Sleep['waking']>;
    readonly sleeper: Sleep;
}
/**
 * Runs the hover-card machine for a woken HoverCard.
 *
 * @component
 * @param {LiveHoverCardProps<T>} props - HoverCard props, id, wake, report.
 * @returns {JSX.Element | null} The card, once opened.
 */
export declare const LiveHoverCard: <T>({ title, href, headerLink, actions, inline, content, load, loaded, pinnable, open, defaultOpen, onOpenChange, placement, openDelay, closeDelay, width, card, id, waking, sleeper, }: LiveHoverCardProps<T>) => JSX.Element | null;

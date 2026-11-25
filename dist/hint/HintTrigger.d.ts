/**
 * @fileoverview What Tooltip and HoverCard share: a body mounted on first
 * open after hydration and kept after, a place in the hint tree, tap
 * handling, and a trigger that is a button, a link or inline text.
 *
 * @module packages/react/src/hint/HintTrigger
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { HintNode } from '@arkhe/core';
import { type HTMLAttributes, type JSX, type ReactNode } from 'react';
/**
 * Node of the card a hint renders in; HoverCard provides it to its card.
 *
 * @constant HintContext
 * @type {import('react').Context<HintNode | undefined>}
 */
export declare const HintContext: import("react").Context<HintNode | undefined>;
/**
 * Returns this hint's tree node, a child of the card it renders in.
 *
 * @function useHintNode
 * @returns {HintNode} Node, stable across renders.
 */
export declare function useHintNode(): HintNode;
/**
 * What `useHint` needs.
 *
 * @interface HintInput
 * @template {object} P
 * @property {boolean} open - Whether Zag shows the hint.
 * @property {(open: boolean) => void} setOpen - Opens or closes it from a tap.
 * @property {P & { id?: string | null }} trigger - Zag's trigger props.
 * @property {string} positionerId - Id of the hint's positioner.
 * @property {HintNode} node - The hint's tree node, from `useHintNode`.
 * @property {() => boolean} leaving - Whether Zag waits to close it after the pointer left.
 * @property {() => void} [activate] - A click that is not a tap; pins a card.
 * @property {boolean} [keys] - Enter and Space also activate.
 * @property {string | null} [pressed] - Pointer kind of a press that came before the hint started.
 */
export interface HintInput<P extends object> {
    readonly open: boolean;
    readonly setOpen: (open: boolean) => void;
    readonly trigger: P & {
        readonly id?: string | null;
    };
    readonly positionerId: string;
    readonly node: HintNode;
    readonly leaving: () => boolean;
    readonly activate?: () => void;
    readonly keys?: boolean;
    readonly pressed?: string | null;
}
/**
 * Returns the trigger props with tap handling, and whether the body is
 * mounted: from the first open after hydration on, so server markup holds
 * none and CSS exit transitions still run after. Keeps the node in the
 * hint tree.
 *
 * @function useHint
 * @template {object} P
 * @param {HintInput<P>} input - Open state, trigger props, positioner id, node.
 * @returns {{ trigger: P; mounted: boolean; pressing: () => boolean }} Trigger props, mount flag, and whether a press is waiting for its click.
 */
export declare function useHint<P extends object>({ open, setOpen, trigger, positionerId, node, leaving, activate, keys, pressed, }: HintInput<P>): {
    trigger: P;
    mounted: boolean;
    pressing: () => boolean;
};
/**
 * Props of HintTrigger.
 *
 * @interface HintTriggerProps
 * @property {HTMLAttributes<HTMLElement>} attrs - Trigger props from `useHint`.
 * @property {string} [href] - Renders the provider's link to this address.
 * @property {boolean} [inline] - Renders inline text with a tab stop.
 * @property {ReactNode} children - Trigger content.
 */
export interface HintTriggerProps {
    readonly attrs: HTMLAttributes<HTMLElement>;
    readonly href?: string;
    readonly inline?: boolean;
    readonly children: ReactNode;
}
/**
 * Renders a hint trigger: the provider's link with `href`, a `span` with a
 * tab stop when `inline`, which may hold other triggers, else a button.
 * `href` wins over `inline`.
 *
 * @component
 * @param {HintTriggerProps} props - Attributes, kind, content.
 * @returns {JSX.Element} Trigger.
 */
export declare const HintTrigger: ({ attrs, href, inline, children, }: HintTriggerProps) => JSX.Element;

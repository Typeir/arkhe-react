/**
 * @fileoverview What Tooltip and HoverCard share: open state that is
 * controlled or not, a body mounted on first open after hydration and kept
 * after, a place in the hint tree, tap handling, and a trigger that is a
 * button, a link or inline text.
 *
 * @module packages/react/src/HintTrigger
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
 * Open state of a hint and its setter.
 *
 * @interface OpenState
 * @property {boolean} shown - Open state to hand Zag.
 * @property {(open: boolean) => void} change - Sets it and reports changes.
 */
export interface OpenState {
    readonly shown: boolean;
    readonly change: (open: boolean) => void;
}
/**
 * Holds the open state: `open` when given, else its own, seeded by
 * `defaultOpen`. Reports only real changes.
 *
 * @function useOpenState
 * @param {boolean} [open] - Controlled open state.
 * @param {boolean} [defaultOpen] - First open state when uncontrolled.
 * @param {(open: boolean) => void} [onOpenChange] - Open-state callback.
 * @returns {OpenState} State and setter.
 */
export declare function useOpenState(open?: boolean, defaultOpen?: boolean, onOpenChange?: (open: boolean) => void): OpenState;
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
 * @returns {{ trigger: P; mounted: boolean }} Trigger props and mount flag.
 */
export declare function useHint<P extends object>(input: HintInput<P>): {
    trigger: P;
    mounted: boolean;
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
 * Renders a hint trigger: a button by default, the provider's link with
 * `href`, or a `span` with a tab stop when `inline`, which may hold other
 * triggers. `href` wins over `inline`.
 *
 * @component
 * @param {HintTriggerProps} props - Attributes, kind, content.
 * @returns {JSX.Element} Trigger.
 */
export declare const HintTrigger: ({ attrs, href, inline, children, }: HintTriggerProps) => JSX.Element;

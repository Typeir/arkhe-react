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
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { HintNode, REACT_EVENTS, hintTriggerProps, watchOutsideTap, } from '@arkhe/core';
import { createContext, useContext, useEffect, useEffectEvent, useState, } from 'react';
import { useArkhe } from './ArkheProvider.js';
import { useArkheEnvironment } from './ArkheEnvironment.js';
import { useHydrated } from './useHydrated.js';
/**
 * Node of the card a hint renders in; HoverCard provides it to its card.
 *
 * @constant HintContext
 * @type {import('react').Context<HintNode | undefined>}
 */
export const HintContext = createContext(undefined);
/**
 * Returns this hint's tree node, a child of the card it renders in.
 *
 * @function useHintNode
 * @returns {HintNode} Node, stable across renders.
 */
export function useHintNode() {
    const parent = useContext(HintContext);
    const [node] = useState(() => new HintNode(parent));
    return node;
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
export function useOpenState(open, defaultOpen, onOpenChange) {
    const [inner, setInner] = useState(defaultOpen ?? false);
    const shown = open ?? inner;
    const change = (next) => {
        if (next === shown)
            return;
        setInner(next);
        onOpenChange?.(next);
    };
    return { shown, change };
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
export function useHint(input) {
    const { open, setOpen, trigger, positionerId, node } = input;
    const env = useArkheEnvironment();
    const hydrated = useHydrated();
    const [opened, setOpened] = useState(false);
    if (open && hydrated && !opened)
        setOpened(true);
    const [memory] = useState(() => ({ current: undefined }));
    const close = useEffectEvent(() => setOpen(false));
    const leaving = useEffectEvent(() => input.leaving());
    const triggerId = trigger.id ?? '';
    useEffect(() => node.attach({
        close: () => close(),
        leaving: () => leaving(),
        ids: () => [triggerId, positionerId],
    }), [node, triggerId, positionerId]);
    useEffect(() => node.report(open), [node, open]);
    useEffect(() => {
        if (!open)
            return undefined;
        return watchOutsideTap(env.getRootNode(), () => node.ids(), () => close());
    }, [open, env, node]);
    return {
        trigger: hintTriggerProps(trigger, {
            open,
            setOpen,
            memory,
            names: REACT_EVENTS,
            holds: (target) => node.holds(env.getRootNode(), target),
        }),
        mounted: opened,
    };
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
export const HintTrigger = ({ attrs, href, inline, children, }) => {
    const { link: Link } = useArkhe();
    if (href !== undefined) {
        return (_jsx(Link, { ...attrs, href: href, children: children }));
    }
    if (inline) {
        return (_jsx("span", { tabIndex: 0, ...attrs, children: children }));
    }
    return (_jsx("button", { type: 'button', ...attrs, children: children }));
};

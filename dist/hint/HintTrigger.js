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
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { HintNode, hintTriggerProps, REACT_EVENTS, watchOutsideTap, } from '@arkhe/core';
import { createContext, useContext, useEffect, useEffectEvent, useState, } from 'react';
import { useArkheEnvironment } from '../base/ArkheEnvironment.js';
import { useArkhe } from '../base/ArkheProvider.js';
import { useHydrated } from '../base/useHydrated.js';
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
export function useHint({ open, setOpen, trigger, positionerId, node, leaving, activate, keys, pressed, }) {
    const env = useArkheEnvironment();
    const hydrated = useHydrated();
    const [opened, setOpened] = useState(false);
    if (open && hydrated && !opened)
        setOpened(true);
    const [memory] = useState(() => ({
        current: pressed ?? null,
    }));
    const close = useEffectEvent(() => {
        setOpen(false);
    });
    const closing = useEffectEvent(() => leaving());
    const triggerId = trigger.id ?? '';
    useEffect(() => node.attach({
        close: () => {
            close();
        },
        leaving: () => closing(),
        ids: () => [triggerId, positionerId],
    }), [node, triggerId, positionerId]);
    useEffect(() => {
        node.report(open);
    }, [node, open]);
    useEffect(() => {
        if (!open)
            return undefined;
        return watchOutsideTap(env.getRootNode(), () => node.ids(), () => {
            close();
        });
    }, [open, env, node]);
    return {
        trigger: hintTriggerProps(trigger, {
            open,
            setOpen,
            memory,
            names: REACT_EVENTS,
            holds: (target) => node.holds(env.getRootNode(), target),
            activate,
            keys,
        }),
        mounted: opened,
        pressing: () => memory.current !== null,
    };
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

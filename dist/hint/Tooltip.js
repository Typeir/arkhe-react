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
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, floatingMachineProps, partAttrs, TOOLTIP_GUTTER, } from '@arkhe/core';
import { mergeProps, normalizeProps, Portal, useMachine } from '@zag-js/react';
import * as tooltip from '@zag-js/tooltip';
import { useEffect, useEffectEvent, useId, useLayoutEffect, } from 'react';
import { useArkheEnvironment } from '../base/ArkheEnvironment.js';
import { useControllable } from '../base/useControllable.js';
import { usePortalContainer } from '../base/usePortalContainer.js';
import { HintTrigger, useHint, useHintNode } from './HintTrigger.js';
import { useSleep, useSleepAgain } from './useSleep.js';
/**
 * Renders a trigger that shows `content` on hover, keyboard focus and tap.
 * A tap outside or Escape closes it. The machine sleeps until the first
 * hover, focus or tap, and again once it has closed.
 *
 * @component
 * @param {TooltipProps} props - Description, trigger, open state, timing.
 * @returns {JSX.Element} Trigger, and the description once opened.
 */
export const Tooltip = (props) => {
    const { children, inline, open, defaultOpen } = props;
    const id = useId();
    const sleep = useSleep('tooltip', id, open === true, defaultOpen === true);
    return (_jsxs("span", { className: ARKHE_CLASS, ...partAttrs('tooltip', 'root'), children: [_jsx(HintTrigger, { attrs: sleep.attrs, inline: inline, children: children }), sleep.waking === null ? null : (_jsx(LiveTooltip, { ...props, defaultOpen: sleep.fresh ? defaultOpen : undefined, id: id, waking: sleep.waking, sleeper: sleep }))] }));
};
/**
 * Runs the tooltip machine, hands its trigger props to the sleeping
 * trigger, replays the waking event, renders the body once opened, and goes
 * back to sleep once closed.
 *
 * @component
 * @param {LiveTooltipProps} props - Tooltip props, id, wake, sleeping trigger.
 * @returns {JSX.Element | null} Body, once opened.
 */
const LiveTooltip = ({ content, open, defaultOpen, onOpenChange, placement = 'top', openDelay = 400, closeDelay = 150, id, waking, sleeper, }) => {
    const { report, hovering, press, sleep } = sleeper;
    const env = useArkheEnvironment();
    const container = usePortalContainer();
    const node = useHintNode();
    const { current: shown, commit } = useControllable({
        value: open,
        defaultValue: defaultOpen ?? false,
        onChange: onOpenChange,
    });
    const service = useMachine(tooltip.machine, {
        ...floatingMachineProps({
            id,
            open: shown,
            onOpenChange: (next) => {
                if (node.request(next))
                    commit(next);
            },
            placement,
            gutter: TOOLTIP_GUTTER,
            getRootNode: env.getRootNode,
        }),
        openDelay,
        closeDelay,
        interactive: true,
    });
    const api = tooltip.connect(service, normalizeProps);
    const positioner = api.getPositionerProps();
    const triggerProps = api.getTriggerProps();
    const hint = useHint({
        open: api.open,
        setOpen: commit,
        trigger: triggerProps,
        positionerId: positioner.id ?? '',
        node,
        leaving: () => service.state.matches('closing'),
        pressed: press,
    });
    useLayoutEffect(() => {
        report(hint.trigger);
    });
    useSleepAgain({
        closed: !shown && !api.open && service.state.matches('closed'),
        idle: () => service.state.matches('closed'),
        opened: hint.mounted,
        pressing: hint.pressing,
        hovering,
        positionerId: positioner.id ?? '',
        sleep,
    });
    const replay = useEffectEvent(() => {
        const el = env.getRootNode().getElementById(triggerProps.id ?? '');
        if (waking === 'focus' && el?.matches(':focus-visible') === true) {
            service.send({ type: 'open', src: 'trigger.focus' });
        }
        if (waking === 'hover' && hovering()) {
            service.send({ type: 'pointer.move' });
        }
    });
    useEffect(() => {
        replay();
    }, []);
    if (!hint.mounted)
        return null;
    return (_jsx(Portal, { container: container, getRootNode: env.getRootNode, children: _jsx("div", { className: ARKHE_CLASS, children: _jsx("div", { ...mergeProps(positioner, { hidden: !api.open }), children: _jsxs("div", { ...api.getContentProps(), children: [_jsx("div", { ...api.getArrowProps(), children: _jsx("div", { ...api.getArrowTipProps() }) }), content] }) }) }) }));
};

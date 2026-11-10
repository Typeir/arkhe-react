/**
 * @fileoverview Tooltip: a short description on Zag's tooltip machine. One
 * is open at a time. Its content is phrasing only, never links or controls
 * (an ARIA tooltip); anything interactive, a link trigger included, belongs
 * in a HoverCard. The body
 * mounts on first open, portalled into the environment's container, so
 * server markup holds the trigger alone.
 *
 * @module packages/react/src/Tooltip
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, floatingMachineProps } from '@arkhe/core';
import { Portal, mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as tooltip from '@zag-js/tooltip';
import { useId } from 'react';
import { useArkheEnvironment } from './ArkheEnvironment.js';
import { HintTrigger, useHint, useHintNode, useOpenState, } from './HintTrigger.js';
import { usePortalContainer } from './usePortalContainer.js';
/**
 * Renders a trigger that shows `content` on hover, keyboard focus and tap.
 * A tap outside or Escape closes it.
 *
 * @component
 * @param {TooltipProps} props - Description, trigger, open state, timing.
 * @returns {JSX.Element} Trigger, and the description once opened.
 */
export const Tooltip = ({ content, children, inline, open, defaultOpen, onOpenChange, placement = 'top', openDelay = 400, closeDelay = 150, }) => {
    const env = useArkheEnvironment();
    const container = usePortalContainer();
    const node = useHintNode();
    const { shown, change } = useOpenState(open, defaultOpen, onOpenChange);
    const service = useMachine(tooltip.machine, {
        ...floatingMachineProps({
            id: useId(),
            open: shown,
            onOpenChange: (next) => {
                if (node.request(next))
                    change(next);
            },
            placement,
            getRootNode: env.getRootNode,
        }),
        openDelay,
        closeDelay,
    });
    const api = tooltip.connect(service, normalizeProps);
    const positioner = api.getPositionerProps();
    const hint = useHint({
        open: api.open,
        setOpen: change,
        trigger: api.getTriggerProps(),
        positionerId: positioner.id ?? '',
        node,
        leaving: () => service.state.matches('closing'),
    });
    return (_jsxs("span", { className: ARKHE_CLASS, "data-scope": 'tooltip', "data-part": 'root', children: [_jsx(HintTrigger, { attrs: hint.trigger, inline: inline, children: children }), hint.mounted ? (_jsx(Portal, { container: container, getRootNode: env.getRootNode, children: _jsx("div", { className: ARKHE_CLASS, children: _jsx("div", { ...mergeProps(positioner, { hidden: !api.open }), children: _jsx("div", { ...api.getContentProps(), children: content }) }) }) })) : null] }));
};

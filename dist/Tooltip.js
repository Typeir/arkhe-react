/**
 * @fileoverview Tooltip: a short text hint on Zag's tooltip machine. One is
 * open at a time and it holds no controls; rich or nested content belongs in
 * a HoverCard.
 *
 * @module packages/react/src/Tooltip
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, floatingMachineProps } from '@arkhe/core';
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as tooltip from '@zag-js/tooltip';
import { useId } from 'react';
import { useArkheEnvironment } from './ArkheEnvironment.js';
/**
 * Renders a trigger that shows `content` on hover and keyboard focus.
 *
 * @component
 * @param {TooltipProps} props - Hint, trigger, timing.
 * @returns {JSX.Element} Trigger and hint.
 */
export const Tooltip = ({ content, children, placement = 'top', openDelay = 400, closeDelay = 150, }) => {
    const env = useArkheEnvironment();
    const service = useMachine(tooltip.machine, {
        ...floatingMachineProps({
            id: useId(),
            placement,
            strategy: 'fixed',
            getRootNode: env.getRootNode,
        }),
        openDelay,
        closeDelay,
    });
    const api = tooltip.connect(service, normalizeProps);
    return (_jsxs("span", { className: ARKHE_CLASS, "data-scope": 'tooltip', "data-part": 'root', children: [_jsx("button", { type: 'button', ...api.getTriggerProps(), children: children }), _jsx("span", { ...mergeProps(api.getPositionerProps(), { hidden: !api.open }), children: _jsx("span", { ...api.getContentProps(), children: content }) })] }));
};

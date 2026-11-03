/**
 * @fileoverview Popover: a non-modal panel anchored to its trigger, on Zag's
 * popover machine. Portalled into the environment's container.
 *
 * @module packages/react/src/Popover
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ARKHE_CLASS, floatingMachineProps } from '@arkhe/core';
import * as popover from '@zag-js/popover';
import { Portal, mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import { useId } from 'react';
import { useArkhe } from './ArkheProvider.js';
import { useArkheEnvironment } from './ArkheEnvironment.js';
import { Icon } from './Icon.js';
import { usePortalContainer } from './usePortalContainer.js';
/**
 * Renders a button that toggles a panel. Escape and outside clicks close it;
 * focus returns to the button.
 *
 * @component
 * @param {PopoverProps} props - Trigger, title, open state, body.
 * @returns {JSX.Element} Trigger and portalled panel.
 */
export const Popover = ({ trigger, title, open, defaultOpen, onOpenChange, placement = 'bottom-start', children, }) => {
    const { labels } = useArkhe();
    const env = useArkheEnvironment();
    const container = usePortalContainer();
    const service = useMachine(popover.machine, floatingMachineProps({
        id: useId(),
        open,
        defaultOpen,
        onOpenChange,
        placement,
        getRootNode: env.getRootNode,
    }));
    const api = popover.connect(service, normalizeProps);
    return (_jsxs(_Fragment, { children: [_jsxs("button", { ...mergeProps(api.getTriggerProps(), { className: ARKHE_CLASS }), children: [trigger, _jsx(Icon, { name: 'chevron-down' })] }), _jsx(Portal, { container: container, getRootNode: env.getRootNode, children: _jsx("div", { className: ARKHE_CLASS, children: _jsx("div", { ...api.getPositionerProps(), children: _jsxs("div", { ...api.getContentProps(), "aria-label": title === undefined ? trigger : undefined, children: [_jsxs("div", { "data-scope": 'popover', "data-part": 'header', children: [title === undefined ? null : (_jsx("h2", { ...api.getTitleProps(), children: title })), _jsx("button", { ...api.getCloseTriggerProps(), "aria-label": labels.close, children: _jsx(Icon, { name: 'x' }) })] }), _jsx("div", { "data-scope": 'popover', "data-part": 'body', children: children })] }) }) }) })] }));
};

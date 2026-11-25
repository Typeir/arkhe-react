/**
 * @fileoverview Popover: a non-modal panel anchored to its trigger, on Zag's
 * popover machine. Portalled into the environment's container once
 * hydrated, so server markup holds the trigger alone.
 *
 * @module packages/react/src/overlay/Popover
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ARKHE_CLASS, floatingMachineProps, partAttrs, } from '@arkhe/core';
import * as popover from '@zag-js/popover';
import { mergeProps, normalizeProps, Portal, useMachine } from '@zag-js/react';
import { useId } from 'react';
import { useArkheEnvironment } from '../base/ArkheEnvironment.js';
import { useArkhe } from '../base/ArkheProvider.js';
import { Icon } from '../base/Icon.js';
import { useHydrated } from '../base/useHydrated.js';
import { usePortalContainer } from '../base/usePortalContainer.js';
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
    const hydrated = useHydrated();
    const service = useMachine(popover.machine, floatingMachineProps({
        id: useId(),
        open,
        defaultOpen,
        onOpenChange,
        placement,
        getRootNode: env.getRootNode,
    }));
    const api = popover.connect(service, normalizeProps);
    return (_jsxs(_Fragment, { children: [_jsxs("button", { ...mergeProps(api.getTriggerProps(), { className: ARKHE_CLASS }), children: [trigger, _jsx(Icon, { name: 'chevron-down' })] }), hydrated ? (_jsx(Portal, { container: container, getRootNode: env.getRootNode, children: _jsx("div", { className: ARKHE_CLASS, children: _jsx("div", { ...api.getPositionerProps(), children: _jsxs("div", { ...api.getContentProps(), "aria-label": title === undefined ? trigger : undefined, children: [_jsxs("div", { ...partAttrs('popover', 'header'), children: [title === undefined ? null : (_jsx("h2", { ...api.getTitleProps(), children: title })), _jsx("button", { ...api.getCloseTriggerProps(), "aria-label": labels.close, children: _jsx(Icon, { name: 'x' }) })] }), _jsx("div", { ...partAttrs('popover', 'body'), children: children })] }) }) }) })) : null] }));
};

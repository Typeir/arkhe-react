/**
 * @fileoverview Menu: a button that opens a list of actions, on Zag's menu
 * machine. Arrow keys, Home, End and typeahead move; focus returns to the
 * button on close. The list portals in once hydrated.
 *
 * @module packages/react/src/Menu
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, entryKey, flag, floatingMachineProps, isSeparator, } from '@arkhe/core';
import * as menu from '@zag-js/menu';
import { Portal, mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import { useId } from 'react';
import { useArkheEnvironment } from './ArkheEnvironment.js';
import { Icon } from './Icon.js';
import { useHydrated } from './useHydrated.js';
import { usePortalContainer } from './usePortalContainer.js';
/**
 * Renders a menu button and its action list.
 *
 * @component
 * @param {MenuProps} props - Trigger, entries, select callback.
 * @returns {JSX.Element} Trigger and portalled list.
 */
export const Menu = ({ trigger, icon, items, onSelect, placement = 'bottom-start', }) => {
    const env = useArkheEnvironment();
    const container = usePortalContainer();
    const hydrated = useHydrated();
    const service = useMachine(menu.machine, {
        ...floatingMachineProps({
            id: useId(),
            placement,
            getRootNode: env.getRootNode,
        }),
        onSelect: (details) => onSelect(details.value),
    });
    const api = menu.connect(service, normalizeProps);
    return (_jsxs(_Fragment, { children: [_jsx("button", { ...mergeProps(api.getTriggerProps(), {
                    className: ARKHE_CLASS,
                    'aria-label': icon ? trigger : undefined,
                }), "data-icon-only": flag(icon !== undefined), children: icon ? (_jsx(Icon, { name: icon })) : (_jsxs(_Fragment, { children: [trigger, _jsx(Icon, { name: 'chevron-down' })] })) }), hydrated ? (_jsx(Portal, { container: container, getRootNode: env.getRootNode, children: _jsx("div", { className: ARKHE_CLASS, children: _jsx("div", { ...api.getPositionerProps(), children: _jsx("ul", { ...api.getContentProps(), children: items.map((entry, index) => isSeparator(entry) ? (_jsx("li", { ...api.getSeparatorProps() }, entryKey(entry, index))) : (_jsxs("li", { ...api.getItemProps({
                                    value: entry.value,
                                    disabled: entry.disabled,
                                }), "data-danger": entry.danger ? '' : undefined, children: [entry.icon ? _jsx(Icon, { name: entry.icon }) : null, entry.label] }, entryKey(entry, index)))) }) }) }) })) : null] }));
};

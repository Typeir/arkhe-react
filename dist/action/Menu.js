/**
 * @fileoverview Menu: a button that opens a list of actions, on Zag's menu
 * machine. Arrow keys, Home, End and typeahead move; focus returns to the
 * button on close. The list portals in once hydrated.
 *
 * @module packages/react/src/action/Menu
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, entryKey, flag, floatingMachineProps, isSeparator, } from '@arkhe/core';
import * as menu from '@zag-js/menu';
import { mergeProps, normalizeProps, Portal, useMachine } from '@zag-js/react';
import { useId, useState } from 'react';
import { useArkheEnvironment } from '../base/ArkheEnvironment.js';
import { Icon } from '../base/Icon.js';
import { useHydrated } from '../base/useHydrated.js';
import { usePortalContainer } from '../base/usePortalContainer.js';
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
        onSelect: (details) => {
            onSelect(details.value);
        },
    });
    const api = menu.connect(service, normalizeProps);
    const [opened, setOpened] = useState(false);
    if (api.open && !opened)
        setOpened(true);
    const controls = opened ? api.getTriggerProps()['aria-controls'] : undefined;
    return (_jsxs(_Fragment, { children: [_jsx("button", { ...mergeProps(api.getTriggerProps(), {
                    className: ARKHE_CLASS,
                    'aria-label': icon !== undefined ? trigger : undefined,
                    onPointerEnter: () => {
                        setOpened(true);
                    },
                    onFocus: () => {
                        setOpened(true);
                    },
                }), "aria-controls": controls, "data-controls": controls, "data-icon-only": flag(icon !== undefined), children: icon !== undefined ? (_jsx(Icon, { name: icon })) : (_jsxs(_Fragment, { children: [trigger, _jsx(Icon, { name: 'chevron-down' })] })) }), hydrated && opened ? (_jsx(Portal, { container: container, getRootNode: env.getRootNode, children: _jsx("div", { className: ARKHE_CLASS, children: _jsx("div", { ...api.getPositionerProps(), children: _jsx("ul", { ...api.getContentProps(), children: items.map((entry, index) => isSeparator(entry) ? (_jsx("li", { ...api.getSeparatorProps() }, entryKey(entry, index))) : (_jsxs("li", { ...api.getItemProps({
                                    value: entry.value,
                                    disabled: entry.disabled,
                                }), "data-danger": flag(entry.danger), children: [entry.icon !== undefined ? (_jsx(Icon, { name: entry.icon })) : null, entry.label] }, entryKey(entry, index)))) }) }) }) })) : null] }));
};

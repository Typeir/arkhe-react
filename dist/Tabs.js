/**
 * @fileoverview Tabs on Zag's tabs machine. Panels come from a render
 * function or, for server content that cannot pass functions, a map from
 * value to node.
 *
 * @module packages/react/src/Tabs
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, staleTabFallback, tabsMachineProps, uniqueByValue, } from '@arkhe/core';
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as tabs from '@zag-js/tabs';
import { useEffect, useId, useState } from 'react';
import { useArkheEnvironment } from './ArkheEnvironment.js';
/**
 * Renders a tab list and its panels. A value that matches no enabled tab
 * shows the first enabled tab and warns once; uncontrolled tabs move there
 * too when the selected tab is removed or disabled.
 *
 * @component
 * @param {TabsProps} props - Items, value, panels.
 * @returns {JSX.Element} Tabs.
 */
export const Tabs = ({ items, label, value, defaultValue, onValueChange, panels, }) => {
    const env = useArkheEnvironment();
    const shown = uniqueByValue(items);
    const [warned] = useState(() => new Set());
    const service = useMachine(tabs.machine, tabsMachineProps({
        id: useId(),
        items: shown,
        label,
        value,
        defaultValue,
        onValueChange,
        warned,
        getRootNode: env.getRootNode,
    }));
    const api = tabs.connect(service, normalizeProps);
    const fallback = value === undefined ? staleTabFallback(api.value, shown) : undefined;
    useEffect(() => {
        if (fallback !== undefined)
            api.setValue(fallback);
    }, [api, fallback]);
    const panelFor = (key) => typeof panels === 'function' ? panels(key) : panels[key];
    return (_jsxs("div", { ...mergeProps(api.getRootProps(), { className: ARKHE_CLASS }), children: [_jsxs("div", { ...api.getListProps(), children: [shown.map((item) => (_jsx("button", { ...api.getTriggerProps({
                            value: item.value,
                            disabled: item.disabled,
                        }), children: item.label }, item.value))), _jsx("div", { ...api.getIndicatorProps() })] }), shown.map((item) => (_jsx("div", { ...api.getContentProps({ value: item.value }), children: panelFor(item.value) }, item.value)))] }));
};

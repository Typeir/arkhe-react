/**
 * @fileoverview Toggle group: a toolbar of pressed / released buttons with
 * one tab stop, an optional limit with a show more button, and a clear
 * button.
 *
 * @module packages/react/src/choice/ToggleGroup
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, dispatch, hasText, partAttrs, rovingFocus, toggleReduce, toggleRootAttrs, toggleShown, uniqueByValue, } from '@arkhe/core';
import { useEffect, useRef, useState } from 'react';
import { useArkhe } from '../base/ArkheProvider.js';
import { Icon } from '../base/Icon.js';
import { useControllable } from '../base/useControllable.js';
/**
 * Renders a toggle group. Tab enters it once; arrows, Home and End move
 * between its buttons. A disabled toggle stays reachable and ignores
 * presses.
 *
 * @component
 * @param {ToggleGroupProps} props - Component props.
 * @returns {JSX.Element} Toggle group.
 */
export const ToggleGroup = ({ label, items, value, defaultValue, onValueChange, multiple, deselectable, orientation, limit, clearable, renderItem, }) => {
    const { labels } = useArkhe();
    const { current: pressed, commit } = useControllable({
        value,
        defaultValue: defaultValue ?? [],
        onChange: onValueChange,
    });
    const [expanded, setExpanded] = useState(false);
    const root = useRef(null);
    const all = uniqueByValue(items);
    useEffect(() => {
        if (!root.current)
            return undefined;
        return rovingFocus(root.current);
    }, []);
    const act = (action) => {
        dispatch(toggleReduce, pressed, action, { multiple, deselectable }, commit);
    };
    const clear = () => {
        act({ type: 'clear' });
        root.current?.querySelector('[data-part="item"]')?.focus();
    };
    return (_jsxs("div", { ref: root, className: ARKHE_CLASS, ...partAttrs('toggle-group', 'root'), ...toggleRootAttrs(label, orientation), children: [toggleShown(all, pressed, limit, expanded).map((item) => {
                const on = pressed.includes(item.value);
                return (_jsxs("button", { type: 'button', ...partAttrs('toggle-group', 'item'), "data-value": item.value, "aria-pressed": on, "aria-disabled": item.disabled ? true : undefined, onClick: () => {
                        act({ type: 'press', item });
                    }, children: [hasText(item.icon) ? _jsx(Icon, { name: item.icon }) : null, renderItem ? (renderItem(item, on)) : (_jsx("span", { ...partAttrs('toggle-group', 'label'), children: item.label }))] }, item.value));
            }), limit !== undefined && all.length > limit ? (_jsx("button", { type: 'button', ...partAttrs('toggle-group', 'more'), "aria-expanded": expanded, onClick: () => {
                    setExpanded(!expanded);
                }, children: expanded ? labels.showLess : labels.showMore })) : null, clearable && pressed.length > 0 ? (_jsx("button", { type: 'button', ...partAttrs('toggle-group', 'clear'), onClick: clear, children: labels.clearSelection })) : null] }));
};

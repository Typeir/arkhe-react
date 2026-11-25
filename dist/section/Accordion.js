/**
 * @fileoverview Accordion: Collapsible sections under one state, each with
 * a heading, optionally one open at a time, one always open, or an expand
 * all button. Panels come from a render function or a map, as Tabs.
 *
 * @module packages/react/src/section/Accordion
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { accordionAllOpen, accordionHeld, accordionReduce, ARKHE_CLASS, dispatch, partAttrs, uniqueByValue, } from '@arkhe/core';
import { useArkhe } from '../base/ArkheProvider.js';
import { useControllable } from '../base/useControllable.js';
import { Collapsible } from './Collapsible.js';
/**
 * Renders an accordion. No arrow keys between triggers: arrows scroll long
 * panels.
 *
 * @component
 * @param {AccordionProps} props - Component props.
 * @returns {JSX.Element} Accordion.
 */
export const Accordion = ({ items, panels, value, defaultValue, onValueChange, multiple = true, collapsible = true, heading = 3, expandAll, }) => {
    const { labels } = useArkhe();
    const { current: open, commit } = useControllable({
        value,
        defaultValue: defaultValue ?? [],
        onChange: onValueChange,
    });
    const all = uniqueByValue(items);
    const rules = { items: all, multiple, collapsible };
    const act = (action) => {
        dispatch(accordionReduce, open, action, rules, commit);
    };
    const full = accordionAllOpen(all, open);
    const panelFor = (key) => typeof panels === 'function' ? panels(key) : panels[key];
    return (_jsxs("div", { className: ARKHE_CLASS, ...partAttrs('accordion', 'root'), children: [expandAll && multiple ? (_jsx("button", { type: 'button', ...partAttrs('accordion', 'toggle-all'), "aria-expanded": full, onClick: () => {
                    act({ type: 'toggle-all' });
                }, children: full ? labels.collapseAll : labels.expandAll })) : null, all.map((item) => (_jsx(Collapsible, { title: item.title, heading: heading, open: open.includes(item.value), disabled: item.disabled || accordionHeld(open, item.value, rules), onOpenChange: (next) => {
                    act({ type: 'set', item, open: next });
                }, children: panelFor(item.value) }, item.value)))] }));
};

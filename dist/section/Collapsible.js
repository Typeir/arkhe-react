/**
 * @fileoverview Collapsible: a trigger button, optionally inside a heading,
 * actions beside it, and a region find-in-page can open. Height animates in
 * CSS.
 *
 * @module packages/react/src/section/Collapsible
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, collapsibleIds, collapsibleReduce, dispatch, findableRegion, headingTag, partAttrs, sectionTags, } from '@arkhe/core';
import { createElement, useEffect, useEffectEvent, useId, useRef, useState, } from 'react';
import { Icon } from '../base/Icon.js';
import { useControllable } from '../base/useControllable.js';
/**
 * Renders a collapsible section. A closed region stays findable; when the
 * browser reveals it, the section opens.
 *
 * @component
 * @param {CollapsibleProps} props - Component props.
 * @returns {JSX.Element} Collapsible.
 */
export const Collapsible = ({ title, open, defaultOpen = false, onOpenChange, heading, actions, lazy, disabled, children, }) => {
    const ids = collapsibleIds(useId());
    const { current: shown, commit } = useControllable({
        value: open,
        defaultValue: defaultOpen,
        onChange: onOpenChange,
    });
    const [seen, setSeen] = useState(shown);
    if (shown && !seen)
        setSeen(true);
    const root = useRef(null);
    const act = (action) => {
        dispatch(collapsibleReduce, shown, action, { disabled }, commit);
    };
    const found = useEffectEvent(() => {
        act({ type: 'reveal' });
    });
    useEffect(() => {
        if (!root.current)
            return undefined;
        return findableRegion(root.current, found);
    }, []);
    const trigger = (_jsxs("button", { type: 'button', ...partAttrs('collapsible', 'trigger'), id: ids.trigger, "aria-expanded": shown, "aria-controls": ids.content, "aria-disabled": disabled ? true : undefined, onClick: () => {
            act({ type: 'toggle' });
        }, children: [_jsx("span", { ...partAttrs('collapsible', 'marker'), children: _jsx(Icon, { name: 'chevron-down' }) }), _jsx("span", { ...partAttrs('collapsible', 'title'), children: title })] }));
    const tag = headingTag(heading);
    const { root: Root, header: Header } = sectionTags(heading);
    return (_jsxs(Root, { ref: root, className: ARKHE_CLASS, ...partAttrs('collapsible', 'root'), "data-state": shown ? 'open' : 'closed', children: [_jsxs(Header, { ...partAttrs('collapsible', 'header'), children: [tag
                        ? createElement(tag, partAttrs('collapsible', 'heading'), trigger)
                        : trigger, actions === undefined ? null : (_jsx("div", { ...partAttrs('collapsible', 'actions'), children: actions }))] }), _jsx("div", { ...partAttrs('collapsible', 'content'), id: ids.content, "data-findable": '', hidden: !shown, children: _jsx("div", { ...partAttrs('collapsible', 'body'), children: !lazy || seen ? children : null }) })] }));
};

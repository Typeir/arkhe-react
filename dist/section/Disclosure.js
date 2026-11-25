/**
 * @fileoverview Disclosure: a styled native `<details>`, working before
 * hydration and findable by the browser. Plain summaries only; a section
 * that needs a heading is a Collapsible.
 *
 * @module packages/react/src/section/Disclosure
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, partAttrs } from '@arkhe/core';
import { Icon } from '../base/Icon.js';
/**
 * Renders a disclosure. The browser opens, closes and reveals it.
 *
 * @component
 * @param {DisclosureProps} props - Component props.
 * @returns {JSX.Element} Disclosure.
 */
export const Disclosure = ({ summary, defaultOpen, name, children, }) => (_jsxs("details", { className: ARKHE_CLASS, ...partAttrs('disclosure', 'root'), name: name, open: defaultOpen, children: [_jsxs("summary", { ...partAttrs('disclosure', 'summary'), children: [_jsx("span", { ...partAttrs('disclosure', 'marker'), children: _jsx(Icon, { name: 'chevron-down' }) }), _jsx("span", { ...partAttrs('disclosure', 'title'), children: summary })] }), _jsx("div", { ...partAttrs('disclosure', 'body'), children: children })] }));

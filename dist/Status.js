/**
 * @fileoverview Status line: empty, loading, error or info, with its icon.
 * The app announcer speaks its text; errors interrupt, the rest wait.
 *
 * @module packages/react/src/Status
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, announceText, partAttrs, statusLook, } from '@arkhe/core';
import { useEffect, useLayoutEffect, useRef, } from 'react';
import { useArkhe } from './ArkheProvider.js';
import { Icon } from './Icon.js';
/**
 * Renders a status line. The announcer speaks its text on mount and on each
 * change, so a line mounted already filled is heard too.
 *
 * @component
 * @param {StatusProps} props - Component props.
 * @param {StatusKind} props.kind - Kind of status.
 * @param {ReactNode} [props.children] - Text.
 * @returns {JSX.Element} Status line.
 */
export const Status = ({ kind, children }) => {
    const { labels, announcer } = useArkhe();
    const look = statusLook(kind, labels);
    const region = useRef(null);
    const politeness = useRef(look.politeness);
    useLayoutEffect(() => {
        politeness.current = look.politeness;
    });
    useEffect(() => region.current
        ? announceText(region.current, announcer, () => politeness.current)
        : undefined, [announcer]);
    return (_jsxs("div", { ref: region, className: ARKHE_CLASS, ...partAttrs('status', 'root'), "data-kind": kind, children: [_jsx(Icon, { name: look.icon }), _jsx("span", { ...partAttrs('status', 'text'), children: children ?? look.text })] }));
};

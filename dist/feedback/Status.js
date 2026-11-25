/**
 * @fileoverview Status line: empty, loading, error or info, with its icon.
 * The app announcer speaks its text; errors interrupt, the rest wait. The
 * root is a `span`, so a status fits phrasing content such as a hover card
 * inside a paragraph.
 *
 * @module packages/react/src/feedback/Status
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { announceText, ARKHE_CLASS, partAttrs, statusLook, } from '@arkhe/core';
import { useEffect, useLayoutEffect, useRef, } from 'react';
import { useArkhe } from '../base/ArkheProvider.js';
import { Icon } from '../base/Icon.js';
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
    useEffect(() => {
        if (!region.current)
            return undefined;
        return announceText(region.current, announcer, () => politeness.current);
    }, [announcer]);
    return (_jsxs("span", { ref: region, className: ARKHE_CLASS, ...partAttrs('status', 'root'), "data-kind": kind, children: [_jsx(Icon, { name: look.icon }), _jsx("span", { ...partAttrs('status', 'text'), children: children ?? look.text })] }));
};

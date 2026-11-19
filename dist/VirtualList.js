/**
 * @fileoverview VirtualList: a scroll box over a long list of fixed-pitch
 * rows that draws only the rows in view plus an overscan margin. Each row
 * says its place in the whole set.
 *
 * @module packages/react/src/VirtualList
 * @version 1.0.0
 * @author Typeir
 * @since 0.2.0
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ARKHE_CLASS, partAttrs } from '@arkhe/core';
import { useEffect } from 'react';
import { useVirtualRows } from './useVirtualRows.js';
/**
 * Renders the rows in view of a long list.
 *
 * @component
 * @param {VirtualListProps<T>} props - Rows, pitch, row body.
 * @returns {JSX.Element} List.
 */
export const VirtualList = (props) => {
    const { items, renderItem, getKey, onRange } = props;
    const { attach, ...rows } = useVirtualRows(items.length, props.rowPitch, props.overscan);
    const { start, end } = rows.visible;
    useEffect(() => {
        onRange?.({ start, end });
    }, [start, end, onRange]);
    return (_jsx("div", { className: ARKHE_CLASS, ...partAttrs('virtual-list', 'root'), role: 'list', "aria-label": props.label, ref: attach, style: { ...rows.vars, '--virtual-max': props.maxHeight }, "data-virtual": '', children: items.slice(rows.range.start, rows.range.end).map((item, at) => {
            const index = rows.range.start + at;
            return (_jsx("div", { ...partAttrs('virtual-list', 'item'), role: 'listitem', ...rows.position(index), children: renderItem(item, index) }, getKey?.(item, index) ?? index));
        }) }));
};

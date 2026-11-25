/**
 * @fileoverview VirtualList: a scroll box over a long list of fixed-pitch
 * rows that draws only the rows in view plus an overscan margin. Each row
 * says its place in the whole set.
 *
 * @module packages/react/src/list/VirtualList
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
export const VirtualList = ({ items, rowPitch, renderItem, label, maxHeight, overscan, getKey, onRange, }) => {
    const { attach, ...rows } = useVirtualRows(items.length, rowPitch, overscan);
    const { start, end } = rows.visible;
    useEffect(() => {
        onRange?.({ start, end });
    }, [start, end, onRange]);
    return (_jsx("ul", { className: ARKHE_CLASS, ...partAttrs('virtual-list', 'root'), "aria-label": label, ref: attach, style: { ...rows.vars, '--virtual-max': maxHeight }, "data-virtual": '', children: items.slice(rows.range.start, rows.range.end).map((item, at) => {
            const index = rows.range.start + at;
            return (_jsx("li", { ...partAttrs('virtual-list', 'item'), ...rows.position(index), children: renderItem(item, index) }, getKey?.(item, index) ?? index));
        }) }));
};

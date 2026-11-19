/**
 * @fileoverview useVirtualRows: the rows of a fixed-pitch list to draw for
 * its scroll box, the spacer properties for the rest, and a scroll that
 * brings any row into view. Without a pitch it draws every row.
 *
 * @module packages/react/src/useVirtualRows
 * @version 1.0.0
 * @author Typeir
 * @since 0.2.0
 */
'use client';
import { UNMEASURED_VIEW, VIRTUAL_OVERSCAN, rowPosition, scrollToRow, virtualRange, virtualVars, watchView, } from '@arkhe/core';
import { useCallback, useState } from 'react';
/**
 * Tracks which of `count` rows, each `pitch` rem high, to draw.
 *
 * @function useVirtualRows
 * @param {number} count - Rows in the set.
 * @param {number} [pitch] - Row height in rem; none draws every row.
 * @param {number} [overscan] - Rows past each edge of the view.
 * @returns {VirtualRowsHandle} Rows to draw and their wiring.
 */
export function useVirtualRows(count, pitch, overscan = VIRTUAL_OVERSCAN) {
    const [view, setView] = useState(UNMEASURED_VIEW);
    const [box, setBox] = useState(null);
    const attach = useCallback((node) => {
        setBox(node);
        return node && pitch !== undefined
            ? watchView(node, pitch, setView)
            : undefined;
    }, [pitch]);
    if (pitch === undefined) {
        return {
            on: false,
            range: { start: 0, end: count },
            visible: { start: 0, end: count },
            attach,
            scrollTo: () => undefined,
            vars: undefined,
            position: () => undefined,
        };
    }
    const range = virtualRange(count, view, overscan);
    return {
        on: true,
        range,
        visible: virtualRange(count, view, 0),
        attach,
        scrollTo: ({ index }) => {
            const next = box && scrollToRow(box, index, pitch);
            if (next)
                setView(next);
        },
        vars: virtualVars(range, count, pitch),
        position: (index) => rowPosition(index, count),
    };
}

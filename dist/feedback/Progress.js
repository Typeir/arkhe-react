/**
 * @fileoverview Progress: a native progress element on a rail with threshold
 * markers, hatched in the error colour past its maximum, and indeterminate
 * without a value. The value text shown above it is for sight only; the
 * element itself carries it.
 *
 * @module packages/react/src/feedback/Progress
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, flag, partAttrs, progressState, progressValueText, } from '@arkhe/core';
import { useArkhe } from '../base/ArkheProvider.js';
/**
 * Renders a progress bar. Past `max` it reads as full, marks `data-over`, and
 * its value text says by how much.
 *
 * @component
 * @param {ProgressProps} props - Component props.
 * @param {number} [props.value] - Current amount.
 * @param {number} props.max - Amount that fills the rail.
 * @param {string} props.label - Accessible name.
 * @param {readonly number[]} [props.markers] - Thresholds.
 * @param {boolean} [props.showValue] - Prints the value text.
 * @returns {JSX.Element} Progress bar.
 * @throws {RangeError} When `max` is not a positive number.
 */
export const Progress = ({ value, max, label, markers, showValue, }) => {
    const { labels, locale } = useArkhe();
    const state = progressState(value, max, markers);
    const text = state.indeterminate
        ? undefined
        : progressValueText(state, max, labels, locale);
    return (_jsxs("div", { className: ARKHE_CLASS, ...partAttrs('progress', 'root'), "data-over": flag(state.over), children: [showValue && text !== undefined ? (_jsx("span", { ...partAttrs('progress', 'value'), "aria-hidden": 'true', children: text })) : null, _jsxs("span", { ...partAttrs('progress', 'track'), children: [_jsx("progress", { ...partAttrs('progress', 'fill'), max: max, value: state.indeterminate ? undefined : Math.min(state.value, max), "aria-label": label, "aria-valuetext": text }), state.markers.map((marker) => (_jsx("span", { ...partAttrs('progress', 'marker'), "data-reached": flag(marker.reached), style: { '--at': marker.at } }, marker.at)))] })] }));
};

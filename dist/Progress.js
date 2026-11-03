/**
 * @fileoverview Progress: a rail with threshold markers that turns to the
 * error colour past its maximum.
 *
 * @module packages/react/src/Progress
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, flag, partAttrs, progressState, progressValueText, } from '@arkhe/core';
import { useArkhe } from './ArkheProvider.js';
/**
 * Renders a progress bar. Past `max` it reads as full, marks `data-over`, and
 * its value text says by how much.
 *
 * @component
 * @param {ProgressProps} props - Component props.
 * @param {number} props.value - Current amount.
 * @param {number} props.max - Amount that fills the rail.
 * @param {string} props.label - Accessible name.
 * @param {readonly number[]} [props.markers] - Thresholds.
 * @param {boolean} [props.showValue] - Prints the value text.
 * @returns {JSX.Element} Progress bar.
 * @throws {RangeError} When `max` is not a positive number.
 */
export const Progress = ({ value, max, label, markers, showValue, }) => {
    const { labels } = useArkhe();
    const state = progressState(value, max, markers);
    const text = progressValueText(state, max, labels);
    return (_jsxs("div", { className: ARKHE_CLASS, ...partAttrs('progress', 'root'), "data-over": flag(state.over), role: 'progressbar', "aria-label": label, "aria-valuemin": 0, "aria-valuemax": max, "aria-valuenow": Math.min(value, max), "aria-valuetext": text, children: [showValue ? (_jsx("span", { ...partAttrs('progress', 'value'), children: text })) : null, _jsxs("span", { ...partAttrs('progress', 'track'), children: [_jsx("span", { ...partAttrs('progress', 'fill'), style: { '--progress': state.ratio } }), state.markers.map((marker) => (_jsx("span", { ...partAttrs('progress', 'marker'), "data-reached": flag(marker.reached), style: { '--at': marker.at } }, marker.at)))] })] }));
};

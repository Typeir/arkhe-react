/**
 * @fileoverview Chip: a pointed tag with an optional icon and remove button.
 *
 * @module packages/react/src/Chip
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, formatLabel, partAttrs, removeChip } from '@arkhe/core';
import { useArkhe } from './ArkheProvider.js';
import { Icon } from './Icon.js';
/**
 * Renders a chip. The remove button's name comes from the `chipRemove` label;
 * when the host drops the chip, focus moves to the next chip's remove button.
 *
 * @component
 * @param {ChipProps} props - Component props.
 * @param {string} props.label - Text.
 * @param {ChipTone} [props.tone] - Colour.
 * @param {string} [props.icon] - Leading icon.
 * @param {() => void} [props.onRemove] - Remove handler.
 * @returns {JSX.Element} Chip.
 */
export const Chip = ({ label, tone = 'neutral', icon, onRemove, }) => {
    const { labels } = useArkhe();
    return (_jsxs("span", { className: ARKHE_CLASS, ...partAttrs('chip', 'root'), "data-tone": tone, children: [icon ? _jsx(Icon, { name: icon }) : null, _jsx("span", { ...partAttrs('chip', 'label'), children: label }), onRemove ? (_jsx("button", { type: 'button', ...partAttrs('chip', 'remove'), "aria-label": formatLabel(labels.chipRemove, { label }), onClick: (event) => removeChip(event.currentTarget, onRemove), children: _jsx(Icon, { name: 'x' }) })) : null] }));
};

/**
 * @fileoverview Icon by Lucide name, drawn from the provider's icon sets.
 *
 * @module packages/react/src/Icon
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ARKHE_CLASS, flag, partAttrs, resolveIcon } from '@arkhe/core';
import { createElement } from 'react';
import { useArkhe } from './ArkheProvider.js';
import { LUCIDE_ICONS } from './lucideIcons.js';
/**
 * Draws the icon named `name` from the app's sets, then the bundled Lucide
 * default. Only Icon imports Lucide, so components without icons skip it.
 * An unknown name renders an empty slot marked
 * `data-missing`.
 *
 * @component
 * @param {IconProps} props - Component props.
 * @param {string} props.name - Lucide name.
 * @param {string} [props.label] - Accessible name.
 * @returns {JSX.Element} Icon slot.
 */
export const Icon = ({ name, label }) => {
    const { icons } = useArkhe();
    const Glyph = resolveIcon([...icons, LUCIDE_ICONS], name);
    return (_jsx("span", { className: ARKHE_CLASS, ...partAttrs('icon', 'root'), "data-name": name, "data-missing": flag(!Glyph), role: label ? 'img' : undefined, "aria-label": label, "aria-hidden": label ? undefined : true, children: Glyph ? createElement(Glyph, { 'aria-hidden': true }) : null }));
};

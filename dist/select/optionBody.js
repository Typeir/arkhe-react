/**
 * @fileoverview Default body of an option in a select or combobox list:
 * icon, label, then a muted description. Not exported.
 *
 * @module packages/react/src/select/optionBody
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { hasText, partAttrs } from '@arkhe/core';
import { Icon } from '../base/Icon.js';
/**
 * Renders the default option body: icon, label, then a muted description.
 *
 * @function optionBody
 * @param {SelectOption} item - Option.
 * @param {'combobox' | 'select'} scope - Zag scope of the list.
 * @returns {ReactNode} Body.
 */
export function optionBody(item, scope) {
    return (_jsxs(_Fragment, { children: [hasText(item.icon) ? _jsx(Icon, { name: item.icon }) : null, _jsx("span", { ...partAttrs(scope, 'item-label'), children: item.label }), hasText(item.description) ? (_jsx("span", { ...partAttrs(scope, 'item-description'), children: item.description })) : null] }));
}

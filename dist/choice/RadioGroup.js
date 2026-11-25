/**
 * @fileoverview Radio group on native radios in a fieldset: rhombus pips or
 * joined segments, the legend naming the group, then a hint or an error.
 *
 * @module packages/react/src/choice/RadioGroup
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, fieldDescribedBy, fieldIds, hasText, partAttrs, radioChecked, radioRootAttrs, uniqueByValue, } from '@arkhe/core';
import { useId } from 'react';
import { FieldNote } from '../field/FieldNote.js';
/**
 * Renders a radio group. Tab reaches the chosen radio, arrows move the
 * choice, all natively; a new error is announced politely.
 *
 * @component
 * @param {RadioGroupProps} props - Component props.
 * @returns {JSX.Element} Radio group.
 */
export const RadioGroup = ({ label, items, value, defaultValue, onValueChange, look, size, orientation, labelHidden, name, required, disabled, hint, error, }) => {
    const ids = fieldIds(useId());
    return (_jsxs("fieldset", { className: ARKHE_CLASS, ...partAttrs('radio-group', 'root'), ...radioRootAttrs({
            look,
            size,
            orientation,
            invalid: Boolean(error),
            labelHidden,
        }), id: ids.control, role: 'radiogroup', disabled: disabled, "aria-describedby": fieldDescribedBy(ids, hint, error), "aria-invalid": hasText(error) ? true : undefined, "aria-required": required, children: [_jsx("legend", { ...partAttrs('radio-group', 'legend'), id: ids.label, children: label }), _jsx("div", { ...partAttrs('radio-group', 'items'), children: uniqueByValue(items).map((item) => (_jsxs("label", { ...partAttrs('radio-group', 'item'), "data-value": item.value, children: [_jsx("input", { ...partAttrs('radio-group', 'input'), type: 'radio', name: name ?? ids.control, value: item.value, checked: radioChecked(value, item), defaultChecked: value === undefined ? defaultValue === item.value : undefined, onChange: () => onValueChange?.(item.value), required: required, disabled: item.disabled }), _jsx("span", { ...partAttrs('radio-group', 'label'), children: item.label })] }, item.value))) }), _jsx(FieldNote, { ids: ids, hint: hint, error: error })] }));
};

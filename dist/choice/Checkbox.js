/**
 * @fileoverview Checkbox on a native input: a rhombus pip or a square box,
 * a label beside it, then a hint or an error.
 *
 * @module packages/react/src/choice/Checkbox
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, checkboxRootAttrs, fieldDescribedBy, fieldIds, hasText, markIndeterminate, partAttrs, } from '@arkhe/core';
import { useEffect, useId, useRef } from 'react';
import { Icon } from '../base/Icon.js';
import { FieldNote } from '../field/FieldNote.js';
/**
 * Renders a checkbox. Space toggles it; a `<fieldset disabled>` around it
 * disables it; a new error is announced politely.
 *
 * @component
 * @param {CheckboxProps} props - Component props.
 * @returns {JSX.Element} Checkbox.
 */
export const Checkbox = ({ label, checked, defaultChecked, onCheckedChange, indeterminate, look, size, labelHidden, name, value, required, disabled, hint, error, }) => {
    const ids = fieldIds(useId());
    const input = useRef(null);
    useEffect(() => {
        markIndeterminate(input.current, indeterminate);
    }, [indeterminate]);
    return (_jsxs("div", { className: ARKHE_CLASS, ...partAttrs('checkbox', 'root'), ...checkboxRootAttrs({
            look,
            size,
            invalid: Boolean(error),
            labelHidden,
        }), children: [_jsxs("label", { ...partAttrs('checkbox', 'control'), children: [_jsxs("span", { ...partAttrs('checkbox', 'box'), children: [_jsx("input", { ref: input, ...partAttrs('checkbox', 'input'), type: 'checkbox', id: ids.control, checked: checked, defaultChecked: defaultChecked, onChange: (event) => onCheckedChange?.(event.currentTarget.checked), name: name, value: value, required: required, disabled: disabled, "aria-describedby": fieldDescribedBy(ids, hint, error), "aria-invalid": hasText(error) ? true : undefined }), look === 'box' ? (_jsxs("span", { ...partAttrs('checkbox', 'mark'), "aria-hidden": true, children: [_jsx(Icon, { name: 'check' }), _jsx(Icon, { name: 'minus' })] })) : null] }), _jsx("span", { ...partAttrs('checkbox', 'label'), children: label })] }), _jsx(FieldNote, { ids: ids, hint: hint, error: error })] }));
};

/**
 * @fileoverview SheetField: how Select, Picker and Search look at phone
 * width. A button shows the choice; it opens a sheet from the bottom edge
 * titled by the label, holding the search box and the list, so the
 * on-screen keyboard never covers them. Not exported.
 *
 * @module packages/react/src/select/SheetField
 * @version 1.0.0
 * @author Typeir
 * @since 0.2.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, fieldDescribedBy, fieldIds, flag, hasText, partAttrs, } from '@arkhe/core';
import { useId, useRef, useState } from 'react';
import { Icon } from '../base/Icon.js';
import { FieldNote } from '../field/FieldNote.js';
import { Modal } from '../overlay/Modal.js';
/**
 * Renders the button and its sheet; the sheet focuses its search box.
 *
 * @component
 * @param {SheetFieldProps} props - Label, shown choice, sheet body.
 * @returns {JSX.Element} Field.
 */
export const SheetField = ({ label, text, placeholder, size, labelHidden, disabled, name, value, required, hint, error, children, }) => {
    const [open, setOpen] = useState(false);
    const body = useRef(null);
    const id = useId();
    const ids = fieldIds(id);
    const trigger = useRef(null);
    return (_jsxs("div", { className: ARKHE_CLASS, ...partAttrs('select', 'root'), "data-size": size, "data-label-hidden": flag(labelHidden), children: [_jsx("span", { ...partAttrs('select', 'label'), id: `${id}label`, children: label }), _jsx("div", { ...partAttrs('select', 'control'), "data-invalid": flag(Boolean(error)), children: _jsxs("button", { ref: trigger, type: 'button', ...partAttrs('select', 'trigger'), "aria-haspopup": 'dialog', "aria-expanded": open, "aria-labelledby": `${id}label ${id}text`, "aria-describedby": fieldDescribedBy(ids, hint, error), "data-placeholder-shown": flag(!hasText(text)), disabled: disabled, onClick: () => {
                        setOpen(true);
                    }, children: [_jsx("span", { ...partAttrs('select', 'value-text'), id: `${id}text`, children: hasText(text) ? text : placeholder }), _jsx("span", { ...partAttrs('select', 'indicator'), children: _jsx(Icon, { name: 'chevron-down' }) })] }) }), _jsx(FieldNote, { ids: ids, hint: hint, error: error }), name === undefined && !required ? null : (_jsx("input", { ...partAttrs('select', 'stand-in'), name: name, value: value ?? '', required: required, autoComplete: 'off', tabIndex: -1, "aria-hidden": 'true', onChange: () => undefined, onFocus: () => trigger.current?.focus() })), _jsx(Modal, { title: label, open: open, onOpenChange: setOpen, sheet: true, initialFocus: () => body.current?.querySelector('input') ?? null, children: _jsx("div", { ref: body, children: children(() => {
                        setOpen(false);
                    }) }) })] }));
};

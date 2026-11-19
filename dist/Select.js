/**
 * @fileoverview Select: one choice from a list of options. A button that
 * opens the list (Zag select) by default; with `searchable`, a text input
 * that filters it (Zag combobox).
 *
 * @module packages/react/src/Select
 * @version 1.0.0
 * @author Typeir
 * @since 0.2.0
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { ComboboxField } from './ComboboxField.js';
import { SelectMenu } from './SelectMenu.js';
import { SheetField } from './SheetField.js';
import { useNarrow } from './useNarrow.js';
/**
 * Renders the phone-width Select: a button showing the choice, opening a
 * sheet with a search box and the list. Choosing closes the sheet.
 *
 * @component
 * @param {SelectProps<T>} props - Label, options, selection.
 * @returns {JSX.Element} Select.
 */
const SelectSheet = ({ name, defaultValue, required, hint, error, ...shared }) => {
    const [inner, setInner] = useState(defaultValue ?? null);
    const value = shared.value === undefined ? inner : shared.value;
    const text = value === null
        ? shared.emptyLabel
        : shared.items.find((item) => item.value === value)?.label;
    return (_jsx(SheetField, { label: shared.label, text: text, placeholder: shared.placeholder, size: shared.size, labelHidden: shared.labelHidden, disabled: shared.disabled, name: name, value: value, required: required, hint: hint, error: error, children: (close) => (_jsx(ComboboxField, { ...shared, value: value, labelHidden: true, inline: true, onValueChange: (next) => {
                setInner(next);
                shared.onValueChange?.(next);
            }, onSelect: close })) }));
};
/**
 * Renders a labelled select; searchable when asked. At phone width it opens
 * a sheet instead of a dropdown, with a search box either way.
 *
 * @component
 * @param {SelectProps<T>} props - Label, options, selection.
 * @returns {JSX.Element} Select.
 */
export const Select = (props) => {
    const { searchable, filter, name, required, autoComplete, ...shared } = props;
    if (useNarrow())
        return _jsx(SelectSheet, { ...props });
    return searchable ? (_jsx(ComboboxField, { ...shared, filter: filter, name: name, required: required })) : (_jsx(SelectMenu, { ...shared, name: name, required: required, autoComplete: autoComplete }));
};

/**
 * @fileoverview Select: one choice from a list of options. A button that
 * opens the list (Zag select); with `searchable`, a text input that filters
 * it (Zag combobox).
 *
 * @module packages/react/src/select/Select
 * @version 1.0.0
 * @author Typeir
 * @since 0.2.0
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useControllable } from '../base/useControllable.js';
import { useNarrow } from '../base/useNarrow.js';
import { ComboboxField } from './ComboboxField.js';
import { SelectMenu } from './SelectMenu.js';
import { SheetField } from './SheetField.js';
/**
 * Renders the phone-width Select: a button showing the choice, opening a
 * sheet with a search box and the list. Choosing closes the sheet.
 *
 * @component
 * @param {SelectProps<T>} props - Label, options, selection.
 * @returns {JSX.Element} Select.
 */
const SelectSheet = ({ label, items, placeholder, value, defaultValue, onValueChange, disabled, emptyLabel, size, labelHidden, name, required, hint, error, ...rest }) => {
    const { current, commit } = useControllable({
        value,
        defaultValue: defaultValue ?? null,
        onChange: onValueChange,
    });
    const text = current === null
        ? emptyLabel
        : items.find((item) => item.value === current)?.label;
    return (_jsx(SheetField, { label: label, text: text, placeholder: placeholder, size: size, labelHidden: labelHidden, disabled: disabled, name: name, value: current, required: required, hint: hint, error: error, children: (close) => (_jsx(ComboboxField, { ...rest, label: label, items: items, placeholder: placeholder, disabled: disabled, emptyLabel: emptyLabel, size: size, value: current, labelHidden: true, inline: true, onValueChange: commit, onSelect: close })) }));
};
/**
 * Renders a labelled select; searchable when asked. At phone width it opens
 * a sheet instead of a dropdown, with a search box either way.
 *
 * @component
 * @param {SelectProps<T>} props - Label, options, selection.
 * @returns {JSX.Element} Select.
 */
export const Select = ({ searchable, filter, name, required, autoComplete, ...shared }) => {
    const narrow = useNarrow();
    if (narrow) {
        return (_jsx(SelectSheet, { ...shared, searchable: searchable, filter: filter, name: name, required: required, autoComplete: autoComplete }));
    }
    return searchable ? (_jsx(ComboboxField, { ...shared, filter: filter, name: name, required: required })) : (_jsx(SelectMenu, { ...shared, name: name, required: required, autoComplete: autoComplete }));
};

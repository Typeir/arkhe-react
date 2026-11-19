/**
 * @fileoverview Picker: a text input that filters a list of options,
 * reports every choice and empties itself, for adding to a list kept
 * elsewhere. On Zag's combobox machine.
 *
 * @module packages/react/src/Picker
 * @version 1.0.0
 * @author Typeir
 * @since 0.2.0
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ComboboxField } from './ComboboxField.js';
import { SheetField } from './SheetField.js';
import { useNarrow } from './useNarrow.js';
/**
 * Renders a labelled picker that empties itself after each choice. At phone
 * width it opens a sheet that stays open while choices are added.
 *
 * @component
 * @param {PickerProps<T>} props - Label, options, choice callback.
 * @returns {JSX.Element} Picker.
 */
export const Picker = (props) => {
    if (!useNarrow())
        return _jsx(ComboboxField, { ...props, clearOnSelect: true });
    return (_jsx(SheetField, { label: props.label, placeholder: props.placeholder, size: props.size, labelHidden: props.labelHidden, disabled: props.disabled, hint: props.hint, error: props.error, children: () => (_jsx(ComboboxField, { ...props, hint: undefined, error: undefined, clearOnSelect: true, labelHidden: true, inline: true })) }));
};

/**
 * @fileoverview Picker: a text input that filters a list of options,
 * reports every choice and empties itself, for adding to a list kept
 * elsewhere. On Zag's combobox machine.
 *
 * @module packages/react/src/select/Picker
 * @version 1.0.0
 * @author Typeir
 * @since 0.2.0
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useNarrow } from '../base/useNarrow.js';
import { ComboboxField } from './ComboboxField.js';
import { SheetField } from './SheetField.js';
/**
 * Renders a labelled picker that empties itself after each choice. At phone
 * width it opens a sheet that stays open while choices are added.
 *
 * @component
 * @param {PickerProps<T>} props - Label, options, choice callback.
 * @returns {JSX.Element} Picker.
 */
export const Picker = ({ label, placeholder, size, labelHidden, disabled, hint, error, ...rest }) => {
    const narrow = useNarrow();
    if (!narrow) {
        return (_jsx(ComboboxField, { ...rest, label: label, placeholder: placeholder, size: size, labelHidden: labelHidden, disabled: disabled, hint: hint, error: error, clearOnSelect: true }));
    }
    return (_jsx(SheetField, { label: label, placeholder: placeholder, size: size, labelHidden: labelHidden, disabled: disabled, hint: hint, error: error, children: () => (_jsx(ComboboxField, { ...rest, label: label, placeholder: placeholder, size: size, disabled: disabled, clearOnSelect: true, labelHidden: true, inline: true })) }));
};

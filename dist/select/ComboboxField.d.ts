/**
 * @fileoverview ComboboxField: a text input that filters a list of options,
 * on Zag's combobox machine. Not exported: it is the body of the searchable
 * Select, of Picker and of Search.
 *
 * @module packages/react/src/select/ComboboxField
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { type OptionFilter, type Placement, type SelectOption } from '@arkhe/core';
import { type JSX, type ReactNode } from 'react';
/**
 * Props of ComboboxField.
 *
 * @interface ComboboxFieldProps
 * @template {SelectOption} T
 * @property {string} label - Visible label.
 * @property {readonly T[]} items - Options; a repeated value is dropped.
 * @property {string} [placeholder] - Input placeholder.
 * @property {string | null} [value] - Selected value; makes the selection controlled.
 * @property {string | null} [defaultValue] - First selection when uncontrolled.
 * @property {(value: string | null) => void} [onValueChange] - Selection changes.
 * @property {(item: T) => void} [onSelect] - Every choice, even a repeat.
 * @property {boolean} [clearOnSelect] - Picker mode: empties the input after a choice.
 * @property {(text: string) => void} [onInputChange] - Every edit of the text.
 * @property {(text: string) => void} [onQuery] - Text the user typed; not text a choice or clear wrote.
 * @property {OptionFilter<T>} [filter] - Match rule; `false` when the host filters.
 * @property {boolean} [loading] - Shows the loading line instead of options.
 * @property {boolean} [failed] - Shows the error line instead of options.
 * @property {boolean} [stale] - Dims the options while newer ones load.
 * @property {(text: string) => void} [onSubmit] - Takes free text on Enter when nothing is highlighted.
 * @property {(item: T) => ReactNode} [renderItem] - Option body. Defaults to label and description.
 * @property {boolean} [disabled] - Blocks input.
 * @property {Placement} [placement] - Side of the list. Defaults to `bottom-start`.
 * @property {string} [emptyLabel] - Text of a first option that stands for no choice, such as "All".
 * @property {'s' | 'm' | 'l'} [size] - Control size. Defaults to `m`.
 * @property {boolean} [labelHidden] - Keeps the label for assistive tech only.
 * @property {boolean} [inline] - Renders the list in place and always shown, as inside a sheet; the input empties and the list opens as it takes focus.
 * @property {string} [name] - Form field name; a hidden input carries the value.
 * @property {string} [hint] - Help text under the control.
 * @property {string} [error] - Error text; replaces the hint and marks the control invalid.
 * @property {'search' | 'done' | 'go' | 'next' | 'enter'} [enterKeyHint] - Label of the on-screen keyboard's Enter key.
 * @property {boolean} [required] - The input must not be empty.
 * @property {number} [rowPitch] - Row height in rem; draws only the rows in view. Flat lists only.
 */
export interface ComboboxFieldProps<T extends SelectOption> {
    readonly label: string;
    readonly items: readonly T[];
    readonly placeholder?: string;
    readonly value?: string | null;
    readonly defaultValue?: string | null;
    readonly onValueChange?: (value: string | null) => void;
    readonly onSelect?: (item: T) => void;
    readonly clearOnSelect?: boolean;
    readonly onInputChange?: (text: string) => void;
    readonly onQuery?: (text: string) => void;
    readonly filter?: OptionFilter<T>;
    readonly loading?: boolean;
    readonly failed?: boolean;
    readonly stale?: boolean;
    readonly onSubmit?: (text: string) => void;
    readonly renderItem?: (item: T) => ReactNode;
    readonly disabled?: boolean;
    readonly placement?: Placement;
    readonly emptyLabel?: string;
    readonly size?: 's' | 'm' | 'l';
    readonly labelHidden?: boolean;
    readonly inline?: boolean;
    readonly name?: string;
    readonly hint?: string;
    readonly error?: string;
    readonly enterKeyHint?: 'search' | 'done' | 'go' | 'next' | 'enter';
    readonly required?: boolean;
    readonly rowPitch?: number;
}
/**
 * Renders a labelled combobox and its portalled option list.
 *
 * @component
 * @param {ComboboxFieldProps<T>} props - Label, options, selection, search hooks.
 * @returns {JSX.Element} Combobox.
 */
export declare const ComboboxField: <T extends SelectOption>({ label, items: options, placeholder, value, defaultValue, onValueChange, onSelect, clearOnSelect, onInputChange, onQuery, filter, loading, failed, stale, onSubmit, renderItem, disabled, placement, emptyLabel, size, labelHidden, inline, name, hint, error, enterKeyHint, required, rowPitch, }: ComboboxFieldProps<T>) => JSX.Element;

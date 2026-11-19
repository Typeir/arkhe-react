/**
 * @fileoverview Combobox: a text input that filters a list of options, on
 * Zag's combobox machine. Serves three jobs: a searchable select, a picker
 * that adds the chosen option elsewhere and empties itself, and a search box
 * whose host supplies results and takes free text on Enter.
 *
 * @module packages/react/src/Combobox
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { type ComboboxOption, type OptionFilter, type Placement } from '@arkhe/core';
import { type JSX, type ReactNode } from 'react';
/**
 * Props of Combobox.
 *
 * @interface ComboboxProps
 * @template {ComboboxOption} T
 * @property {string} label - Visible label.
 * @property {readonly T[]} items - Options; a repeated value is dropped.
 * @property {string} [placeholder] - Input placeholder.
 * @property {string | null} [value] - Selected value; makes the selection controlled.
 * @property {string | null} [defaultValue] - First selection when uncontrolled.
 * @property {(value: string | null) => void} [onValueChange] - Selection changes.
 * @property {(item: T) => void} [onSelect] - Every choice, even a repeat.
 * @property {boolean} [clearOnSelect] - Picker mode: empties the input after a choice.
 * @property {(text: string) => void} [onInputChange] - Every edit of the text.
 * @property {OptionFilter<T>} [filter] - Match rule; `false` when the host filters.
 * @property {boolean} [loading] - Shows the loading line instead of options.
 * @property {(text: string) => void} [onSubmit] - Takes free text on Enter when nothing is highlighted.
 * @property {(item: T) => ReactNode} [renderItem] - Option body. Defaults to label and description.
 * @property {boolean} [disabled] - Blocks input.
 * @property {Placement} [placement] - Side of the list. Defaults to `bottom-start`.
 */
export interface ComboboxProps<T extends ComboboxOption> {
    readonly label: string;
    readonly items: readonly T[];
    readonly placeholder?: string;
    readonly value?: string | null;
    readonly defaultValue?: string | null;
    readonly onValueChange?: (value: string | null) => void;
    readonly onSelect?: (item: T) => void;
    readonly clearOnSelect?: boolean;
    readonly onInputChange?: (text: string) => void;
    readonly filter?: OptionFilter<T>;
    readonly loading?: boolean;
    readonly onSubmit?: (text: string) => void;
    readonly renderItem?: (item: T) => ReactNode;
    readonly disabled?: boolean;
    readonly placement?: Placement;
}
/**
 * Renders a labelled combobox and its portalled option list.
 *
 * @component
 * @param {ComboboxProps<T>} props - Label, options, selection, search hooks.
 * @returns {JSX.Element} Combobox.
 */
export declare const Combobox: <T extends ComboboxOption>(props: ComboboxProps<T>) => JSX.Element;

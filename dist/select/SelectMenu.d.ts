/**
 * @fileoverview SelectMenu: a button that opens a list of options, on Zag's
 * select machine. Not exported: it is the body of Select when not
 * searchable. A hidden native select mirrors the value for forms; with
 * virtual rows it holds only the chosen option.
 *
 * @module packages/react/src/select/SelectMenu
 * @version 1.0.0
 * @author Typeir
 * @since 0.2.0
 */
import { type Placement, type SelectOption } from '@arkhe/core';
import { type JSX, type ReactNode } from 'react';
/**
 * Props of SelectMenu.
 *
 * @interface SelectMenuProps
 * @template {SelectOption} T
 * @property {string} label - Visible label.
 * @property {readonly T[]} items - Options; a repeated value is dropped.
 * @property {string} [placeholder] - Shown while nothing is chosen.
 * @property {string | null} [value] - Selected value; makes the selection controlled.
 * @property {string | null} [defaultValue] - First selection when uncontrolled.
 * @property {(value: string | null) => void} [onValueChange] - Selection changes.
 * @property {(item: T) => ReactNode} [renderItem] - Option body. Defaults to label and description.
 * @property {string} [name] - Form field name.
 * @property {boolean} [required] - A value must be chosen.
 * @property {string} [autoComplete] - Autofill hint of the hidden native select, such as `country`.
 * @property {boolean} [disabled] - Blocks interaction.
 * @property {Placement} [placement] - Side of the list. Defaults to `bottom-start`.
 * @property {string} [emptyLabel] - Text of a first option that stands for no choice, such as "All".
 * @property {'s' | 'm' | 'l'} [size] - Control size. Defaults to `m`.
 * @property {boolean} [labelHidden] - Keeps the label for assistive tech only.
 * @property {string} [hint] - Help text under the control.
 * @property {string} [error] - Error text; replaces the hint and marks the control invalid.
 * @property {number} [rowPitch] - Row height in rem; draws only the rows in view. Flat lists only.
 */
export interface SelectMenuProps<T extends SelectOption> {
    readonly label: string;
    readonly items: readonly T[];
    readonly placeholder?: string;
    readonly value?: string | null;
    readonly defaultValue?: string | null;
    readonly onValueChange?: (value: string | null) => void;
    readonly renderItem?: (item: T) => ReactNode;
    readonly name?: string;
    readonly required?: boolean;
    readonly autoComplete?: string;
    readonly disabled?: boolean;
    readonly placement?: Placement;
    readonly emptyLabel?: string;
    readonly size?: 's' | 'm' | 'l';
    readonly labelHidden?: boolean;
    readonly hint?: string;
    readonly error?: string;
    readonly rowPitch?: number;
}
/**
 * Renders a labelled select button and its portalled option list.
 *
 * @component
 * @param {SelectMenuProps<T>} props - Label, options, selection.
 * @returns {JSX.Element} Select.
 */
export declare const SelectMenu: <T extends SelectOption>({ label, items, placeholder, value, defaultValue, onValueChange, renderItem, name, required, autoComplete, disabled, placement, emptyLabel, size, labelHidden, hint, error, rowPitch, }: SelectMenuProps<T>) => JSX.Element;

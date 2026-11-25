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
import { type JSX, type ReactNode } from 'react';
/**
 * Props of SheetField.
 *
 * @interface SheetFieldProps
 * @property {string} label - Visible label; titles the sheet.
 * @property {string} [text] - The current choice, shown on the button.
 * @property {string} [placeholder] - Shown on the button without a choice.
 * @property {'s' | 'm' | 'l'} [size] - Control size. Defaults to `m`.
 * @property {boolean} [labelHidden] - Keeps the label for assistive tech only.
 * @property {boolean} [disabled] - Blocks opening.
 * @property {string} [name] - Form field name, carried by a stand-in input.
 * @property {string | null} [value] - Value the stand-in input submits.
 * @property {boolean} [required] - A value must be chosen; a stand-in input takes part in form validation.
 * @property {string} [hint] - Help text under the button.
 * @property {string} [error] - Error text; replaces the hint and marks the button invalid.
 * @property {(close: () => void) => ReactNode} children - Sheet body; `close` shuts the sheet.
 */
export interface SheetFieldProps {
    readonly label: string;
    readonly text?: string;
    readonly placeholder?: string;
    readonly size?: 's' | 'm' | 'l';
    readonly labelHidden?: boolean;
    readonly disabled?: boolean;
    readonly name?: string;
    readonly value?: string | null;
    readonly required?: boolean;
    readonly hint?: string;
    readonly error?: string;
    readonly children: (close: () => void) => ReactNode;
}
/**
 * Renders the button and its sheet; the sheet focuses its search box.
 *
 * @component
 * @param {SheetFieldProps} props - Label, shown choice, sheet body.
 * @returns {JSX.Element} Field.
 */
export declare const SheetField: ({ label, text, placeholder, size, labelHidden, disabled, name, value, required, hint, error, children, }: SheetFieldProps) => JSX.Element;

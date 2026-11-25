/**
 * @fileoverview Checkbox on a native input: a rhombus pip or a square box,
 * a label beside it, then a hint or an error.
 *
 * @module packages/react/src/choice/Checkbox
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
import { type CheckboxLook, type CheckboxSize } from '@arkhe/core';
import { type JSX } from 'react';
/**
 * Props of Checkbox.
 *
 * @interface CheckboxProps
 * @property {string} label - Visible label; names the box.
 * @property {boolean} [checked] - Checked state; makes the box controlled.
 * @property {boolean} [defaultChecked] - First state when uncontrolled.
 * @property {(checked: boolean) => void} [onCheckedChange] - Reports changes.
 * @property {boolean} [indeterminate] - Mixed state.
 * @property {CheckboxLook} [look] - Pip or box. Defaults to pip.
 * @property {CheckboxSize} [size] - s, m or l. Defaults to m.
 * @property {boolean} [labelHidden] - Hides the label visually.
 * @property {string} [name] - Form field name.
 * @property {string} [value] - Value submitted while checked.
 * @property {boolean} [required] - Must be checked to submit.
 * @property {boolean} [disabled] - Blocks changes.
 * @property {string} [hint] - Help text.
 * @property {string} [error] - Error text; replaces the hint.
 */
export interface CheckboxProps {
    readonly label: string;
    readonly checked?: boolean;
    readonly defaultChecked?: boolean;
    readonly onCheckedChange?: (checked: boolean) => void;
    readonly indeterminate?: boolean;
    readonly look?: CheckboxLook;
    readonly size?: CheckboxSize;
    readonly labelHidden?: boolean;
    readonly name?: string;
    readonly value?: string;
    readonly required?: boolean;
    readonly disabled?: boolean;
    readonly hint?: string;
    readonly error?: string;
}
/**
 * Renders a checkbox. Space toggles it; a `<fieldset disabled>` around it
 * disables it; a new error is announced politely.
 *
 * @component
 * @param {CheckboxProps} props - Component props.
 * @returns {JSX.Element} Checkbox.
 */
export declare const Checkbox: ({ label, checked, defaultChecked, onCheckedChange, indeterminate, look, size, labelHidden, name, value, required, disabled, hint, error, }: CheckboxProps) => JSX.Element;

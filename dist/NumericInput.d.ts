/**
 * @fileoverview NumericInput: a number field with step buttons on Zag's
 * number-input machine. Outside it is a number or `null`.
 *
 * @module packages/react/src/NumericInput
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { type NumericValue } from '@arkhe/core';
import { type JSX } from 'react';
/**
 * Props of NumericInput.
 *
 * @interface NumericInputProps
 * @property {string} label - Visible label; also names the step buttons.
 * @property {NumericValue} [value] - Controlled value.
 * @property {NumericValue} [defaultValue] - First value when uncontrolled.
 * @property {(value: NumericValue) => void} [onValueChange] - Every draft change.
 * @property {(value: NumericValue) => void} [onValueCommit] - Blur or Enter, clamped.
 * @property {number} [min] - Lowest value.
 * @property {number} [max] - Highest value.
 * @property {number} [step] - Step size. Defaults to 1.
 */
export interface NumericInputProps {
    readonly label: string;
    readonly value?: NumericValue;
    readonly defaultValue?: NumericValue;
    readonly onValueChange?: (value: NumericValue) => void;
    readonly onValueCommit?: (value: NumericValue) => void;
    readonly min?: number;
    readonly max?: number;
    readonly step?: number;
}
/**
 * Renders a number field. A controlled value set while typing waits until
 * blur, so a parent that clamps cannot eat keystrokes.
 *
 * @component
 * @param {NumericInputProps} props - Label, value, bounds, callbacks.
 * @returns {JSX.Element} Number field.
 */
export declare const NumericInput: (props: NumericInputProps) => JSX.Element;

/**
 * @fileoverview Radio group on native radios in a fieldset: rhombus pips or
 * joined segments, the legend naming the group, then a hint or an error.
 *
 * @module packages/react/src/choice/RadioGroup
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
import { type CheckboxSize, type RadioItem, type RadioLook, type RadioOrientation } from '@arkhe/core';
import { type JSX } from 'react';
/**
 * Props of RadioGroup.
 *
 * @interface RadioGroupProps
 * @property {string} label - Legend; names the group.
 * @property {readonly RadioItem[]} items - Choices, in order; a repeated value is dropped.
 * @property {string | null} [value] - Chosen value; makes the group controlled, null chooses none.
 * @property {string} [defaultValue] - First choice when uncontrolled.
 * @property {(value: string) => void} [onValueChange] - Reports a new choice.
 * @property {RadioLook} [look] - Pips or segments. Defaults to pips.
 * @property {CheckboxSize} [size] - Pip size. Defaults to m.
 * @property {RadioOrientation} [orientation] - Direction. Defaults to horizontal.
 * @property {boolean} [labelHidden] - Hides the legend visually.
 * @property {string} [name] - Form field name; generated when absent.
 * @property {boolean} [required] - A choice is needed to submit.
 * @property {boolean} [disabled] - Blocks every choice.
 * @property {string} [hint] - Help text.
 * @property {string} [error] - Error text; replaces the hint.
 */
export interface RadioGroupProps {
    readonly label: string;
    readonly items: readonly RadioItem[];
    readonly value?: string | null;
    readonly defaultValue?: string;
    readonly onValueChange?: (value: string) => void;
    readonly look?: RadioLook;
    readonly size?: CheckboxSize;
    readonly orientation?: RadioOrientation;
    readonly labelHidden?: boolean;
    readonly name?: string;
    readonly required?: boolean;
    readonly disabled?: boolean;
    readonly hint?: string;
    readonly error?: string;
}
/**
 * Renders a radio group. Tab reaches the chosen radio, arrows move the
 * choice, all natively; a new error is announced politely.
 *
 * @component
 * @param {RadioGroupProps} props - Component props.
 * @returns {JSX.Element} Radio group.
 */
export declare const RadioGroup: ({ label, items, value, defaultValue, onValueChange, look, size, orientation, labelHidden, name, required, disabled, hint, error, }: RadioGroupProps) => JSX.Element;

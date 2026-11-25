/**
 * @fileoverview Toggle group: a toolbar of pressed / released buttons with
 * one tab stop, an optional limit with a show more button, and a clear
 * button.
 *
 * @module packages/react/src/choice/ToggleGroup
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
import { type ToggleItem, type ToggleOrientation } from '@arkhe/core';
import { type JSX, type ReactNode } from 'react';
/**
 * Props of ToggleGroup.
 *
 * @interface ToggleGroupProps
 * @property {string} label - Accessible name of the group.
 * @property {readonly ToggleItem[]} items - Toggles, in order; a repeated value is dropped.
 * @property {readonly string[]} [value] - Pressed values; makes the group controlled.
 * @property {readonly string[]} [defaultValue] - First pressed values when uncontrolled.
 * @property {(value: readonly string[]) => void} [onValueChange] - Reports presses.
 * @property {boolean} [multiple] - Several may be pressed at once.
 * @property {boolean} [deselectable] - A single pressed toggle may be released.
 * @property {ToggleOrientation} [orientation] - Direction. Defaults to horizontal.
 * @property {number} [limit] - Toggles shown until the reader asks for more; pressed ones always show.
 * @property {boolean} [clearable] - Adds a clear button while anything is pressed.
 * @property {(item: ToggleItem, pressed: boolean) => ReactNode} [renderItem] - Content of a toggle; it must carry the toggle's name.
 */
export interface ToggleGroupProps {
    readonly label: string;
    readonly items: readonly ToggleItem[];
    readonly value?: readonly string[];
    readonly defaultValue?: readonly string[];
    readonly onValueChange?: (value: readonly string[]) => void;
    readonly multiple?: boolean;
    readonly deselectable?: boolean;
    readonly orientation?: ToggleOrientation;
    readonly limit?: number;
    readonly clearable?: boolean;
    readonly renderItem?: (item: ToggleItem, pressed: boolean) => ReactNode;
}
/**
 * Renders a toggle group. Tab enters it once; arrows, Home and End move
 * between its buttons. A disabled toggle stays reachable and ignores
 * presses.
 *
 * @component
 * @param {ToggleGroupProps} props - Component props.
 * @returns {JSX.Element} Toggle group.
 */
export declare const ToggleGroup: ({ label, items, value, defaultValue, onValueChange, multiple, deselectable, orientation, limit, clearable, renderItem, }: ToggleGroupProps) => JSX.Element;

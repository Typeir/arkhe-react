/**
 * @fileoverview Menu: a button that opens a list of actions, on Zag's menu
 * machine. Arrow keys, Home, End and typeahead move; focus returns to the
 * button on close.
 *
 * @module packages/react/src/Menu
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { type MenuEntry, type Placement } from '@arkhe/core';
import { type JSX } from 'react';
/**
 * Props of Menu.
 *
 * @interface MenuProps
 * @property {string} trigger - Text of the open button.
 * @property {readonly MenuEntry[]} items - Actions and separators.
 * @property {(value: string) => void} onSelect - Called with the chosen action.
 * @property {Placement} [placement] - Side. Defaults to `bottom-start`.
 */
export interface MenuProps {
    readonly trigger: string;
    readonly items: readonly MenuEntry[];
    readonly onSelect: (value: string) => void;
    readonly placement?: Placement;
}
/**
 * Renders a menu button and its action list.
 *
 * @component
 * @param {MenuProps} props - Trigger, entries, select callback.
 * @returns {JSX.Element} Trigger and portalled list.
 */
export declare const Menu: ({ trigger, items, onSelect, placement, }: MenuProps) => JSX.Element;

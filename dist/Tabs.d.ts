/**
 * @fileoverview Tabs on Zag's tabs machine. Panels come from a render
 * function or, for server content that cannot pass functions, a map from
 * value to node.
 *
 * @module packages/react/src/Tabs
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { type TabItem } from '@arkhe/core';
import { type JSX, type ReactNode } from 'react';
/**
 * Panel source: a render function, or one node per value.
 *
 * @typedef {((value: string) => ReactNode) | Readonly<Record<string, ReactNode>>} TabPanels
 */
export type TabPanels = ((value: string) => ReactNode) | Readonly<Record<string, ReactNode>>;
/**
 * Props of Tabs.
 *
 * @interface TabsProps
 * @property {readonly TabItem[]} items - Tabs, in order; a repeated value is dropped.
 * @property {string} label - Accessible name of the tab list.
 * @property {string} [value] - Selected value; makes the tabs controlled.
 * @property {string} [defaultValue] - First value when uncontrolled.
 * @property {(value: string) => void} [onValueChange] - Selection callback.
 * @property {TabPanels} panels - Panel per value.
 */
export interface TabsProps {
    readonly items: readonly TabItem[];
    readonly label: string;
    readonly value?: string;
    readonly defaultValue?: string;
    readonly onValueChange?: (value: string) => void;
    readonly panels: TabPanels;
}
/**
 * Renders a tab list and its panels. A value that matches no enabled tab
 * shows the first enabled tab and warns once; uncontrolled tabs move there
 * too when the selected tab is removed or disabled.
 *
 * @component
 * @param {TabsProps} props - Items, value, panels.
 * @returns {JSX.Element} Tabs.
 */
export declare const Tabs: ({ items, label, value, defaultValue, onValueChange, panels, }: TabsProps) => JSX.Element;

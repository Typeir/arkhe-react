/**
 * @fileoverview Accordion: Collapsible sections under one state, each with
 * a heading, optionally one open at a time, one always open, or an expand
 * all button. Panels come from a render function or a map, as Tabs.
 *
 * @module packages/react/src/section/Accordion
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
import type { JSX } from 'react';
import { type AccordionItem, type HeadingLevel } from '@arkhe/core';
import type { TabPanels } from './Tabs.js';
/**
 * Props of Accordion.
 *
 * @interface AccordionProps
 * @property {readonly AccordionItem[]} items - Sections, in order; a repeated value is dropped.
 * @property {TabPanels} panels - Panel per value.
 * @property {readonly string[]} [value] - Open values; makes it controlled.
 * @property {readonly string[]} [defaultValue] - First open values when uncontrolled.
 * @property {(value: readonly string[]) => void} [onValueChange] - Reports changes.
 * @property {boolean} [multiple] - Several open at once. Defaults to true.
 * @property {boolean} [collapsible] - The last open section may close. Defaults to true.
 * @property {HeadingLevel} [heading] - Heading level of every trigger. Defaults to 3.
 * @property {boolean} [expandAll] - Adds an expand / collapse all button while `multiple`.
 */
export interface AccordionProps {
    readonly items: readonly AccordionItem[];
    readonly panels: TabPanels;
    readonly value?: readonly string[];
    readonly defaultValue?: readonly string[];
    readonly onValueChange?: (value: readonly string[]) => void;
    readonly multiple?: boolean;
    readonly collapsible?: boolean;
    readonly heading?: HeadingLevel;
    readonly expandAll?: boolean;
}
/**
 * Renders an accordion. No arrow keys between triggers: arrows scroll long
 * panels.
 *
 * @component
 * @param {AccordionProps} props - Component props.
 * @returns {JSX.Element} Accordion.
 */
export declare const Accordion: ({ items, panels, value, defaultValue, onValueChange, multiple, collapsible, heading, expandAll, }: AccordionProps) => JSX.Element;

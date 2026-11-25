/**
 * @fileoverview Disclosure: a styled native `<details>`, working before
 * hydration and findable by the browser. Plain summaries only; a section
 * that needs a heading is a Collapsible.
 *
 * @module packages/react/src/section/Disclosure
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
import type { JSX, ReactNode } from 'react';
/**
 * Props of Disclosure.
 *
 * @interface DisclosureProps
 * @property {string} summary - Summary text; never a heading.
 * @property {boolean} [defaultOpen] - Starts open.
 * @property {string} [name] - Group name; one disclosure of the group is open at a time.
 * @property {ReactNode} children - Content.
 */
export interface DisclosureProps {
    readonly summary: string;
    readonly defaultOpen?: boolean;
    readonly name?: string;
    readonly children: ReactNode;
}
/**
 * Renders a disclosure. The browser opens, closes and reveals it.
 *
 * @component
 * @param {DisclosureProps} props - Component props.
 * @returns {JSX.Element} Disclosure.
 */
export declare const Disclosure: ({ summary, defaultOpen, name, children, }: DisclosureProps) => JSX.Element;

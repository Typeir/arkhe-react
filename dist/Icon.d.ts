/**
 * @fileoverview Icon by Lucide name, drawn from the provider's icon sets.
 *
 * @module packages/react/src/Icon
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { type JSX } from 'react';
/**
 * Props of Icon.
 *
 * @interface IconProps
 * @property {string} name - Lucide name, e.g. `triangle-alert`.
 * @property {string} [label] - Accessible name; without it the icon is decorative.
 */
export interface IconProps {
    readonly name: string;
    readonly label?: string;
}
/**
 * Draws the icon named `name` from the app's sets, then the bundled Lucide
 * default. Only Icon imports Lucide, so components without icons skip it.
 * An unknown name renders an empty slot marked
 * `data-missing`.
 *
 * @component
 * @param {IconProps} props - Component props.
 * @param {string} props.name - Lucide name.
 * @param {string} [props.label] - Accessible name.
 * @returns {JSX.Element} Icon slot.
 */
export declare const Icon: ({ name, label }: IconProps) => JSX.Element;

/**
 * @fileoverview Progress: a rail with threshold markers that turns to the
 * error colour past its maximum.
 *
 * @module packages/react/src/Progress
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import type { JSX } from 'react';
/**
 * Props of Progress.
 *
 * @interface ProgressProps
 * @property {number} value - Current amount; may exceed `max`.
 * @property {number} max - Amount that fills the rail.
 * @property {string} label - Accessible name.
 * @property {readonly number[]} [markers] - Thresholds, in the value's units; repeats are dropped.
 * @property {boolean} [showValue] - Prints the value text above the rail.
 */
export interface ProgressProps {
    readonly value: number;
    readonly max: number;
    readonly label: string;
    readonly markers?: readonly number[];
    readonly showValue?: boolean;
}
/**
 * Renders a progress bar. Past `max` it reads as full, marks `data-over`, and
 * its value text says by how much.
 *
 * @component
 * @param {ProgressProps} props - Component props.
 * @param {number} props.value - Current amount.
 * @param {number} props.max - Amount that fills the rail.
 * @param {string} props.label - Accessible name.
 * @param {readonly number[]} [props.markers] - Thresholds.
 * @param {boolean} [props.showValue] - Prints the value text.
 * @returns {JSX.Element} Progress bar.
 * @throws {RangeError} When `max` is not a positive number.
 */
export declare const Progress: ({ value, max, label, markers, showValue, }: ProgressProps) => JSX.Element;

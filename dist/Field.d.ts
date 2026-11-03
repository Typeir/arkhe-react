/**
 * @fileoverview Field: label, optional readout, one control, hint or error,
 * wired together by ids.
 *
 * @module packages/react/src/Field
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { type FieldControlAttrs } from '@arkhe/core';
import { type JSX, type ReactNode } from 'react';
/**
 * Props of Field.
 *
 * @interface FieldProps
 * @property {string} label - Visible label.
 * @property {ReactNode} [readout] - Current value shown beside the label; not announced as it changes.
 * @property {string} [hint] - Help text under the control.
 * @property {string} [error] - Error text; replaces the hint and marks the control invalid.
 * @property {(control: FieldControlAttrs) => ReactNode} children - Renders the control with the given attributes.
 */
export interface FieldProps {
    readonly label: string;
    readonly readout?: ReactNode;
    readonly hint?: string;
    readonly error?: string;
    readonly children: (control: FieldControlAttrs) => ReactNode;
}
/**
 * Renders a labelled control. The control receives its id, description ids
 * and invalid state through `children`.
 *
 * @component
 * @param {FieldProps} props - Component props.
 * @param {string} props.label - Visible label.
 * @param {ReactNode} [props.readout] - Current value beside the label.
 * @param {string} [props.hint] - Help text.
 * @param {string} [props.error] - Error text.
 * @param {(control: FieldControlAttrs) => ReactNode} props.children - Control renderer.
 * @returns {JSX.Element} Field.
 */
export declare const Field: ({ label, readout, hint, error, children, }: FieldProps) => JSX.Element;

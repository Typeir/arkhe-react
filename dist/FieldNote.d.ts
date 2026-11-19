/**
 * @fileoverview FieldNote: the line under a control, the hint or, once there
 * is one, the error. A new error is announced politely. Not exported: Field,
 * the select family and NumericInput share it.
 *
 * @module packages/react/src/FieldNote
 * @version 1.0.0
 * @author Typeir
 * @since 0.2.0
 */
import { type FieldIds } from '@arkhe/core';
import { type JSX } from 'react';
/**
 * Props of FieldNote.
 *
 * @interface FieldNoteProps
 * @property {FieldIds} ids - Field ids; the line takes the hint or error id.
 * @property {string} [hint] - Help text.
 * @property {string} [error] - Error text; replaces the hint.
 */
export interface FieldNoteProps {
    readonly ids: FieldIds;
    readonly hint?: string;
    readonly error?: string;
}
/**
 * Renders the hint or the error line.
 *
 * @component
 * @param {FieldNoteProps} props - Ids, hint, error.
 * @returns {JSX.Element | null} Line, or nothing.
 */
export declare const FieldNote: ({ ids, hint, error, }: FieldNoteProps) => JSX.Element | null;

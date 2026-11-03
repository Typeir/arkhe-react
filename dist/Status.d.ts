/**
 * @fileoverview Status line: empty, loading, error or info, with its icon.
 * The app announcer speaks its text; errors interrupt, the rest wait.
 *
 * @module packages/react/src/Status
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { type StatusKind } from '@arkhe/core';
import { type JSX, type ReactNode } from 'react';
/**
 * Props of Status.
 *
 * @interface StatusProps
 * @property {StatusKind} kind - Kind of status.
 * @property {ReactNode} [children] - Text; defaults to the kind's label.
 */
export interface StatusProps {
    readonly kind: StatusKind;
    readonly children?: ReactNode;
}
/**
 * Renders a status line. The announcer speaks its text on mount and on each
 * change, so a line mounted already filled is heard too.
 *
 * @component
 * @param {StatusProps} props - Component props.
 * @param {StatusKind} props.kind - Kind of status.
 * @param {ReactNode} [props.children] - Text.
 * @returns {JSX.Element} Status line.
 */
export declare const Status: ({ kind, children }: StatusProps) => JSX.Element;

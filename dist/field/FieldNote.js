/**
 * @fileoverview FieldNote: the line under a control, the hint or, once there
 * is one, the error. A new error is announced politely. Not exported: Field,
 * the select family and NumericInput share it.
 *
 * @module packages/react/src/field/FieldNote
 * @version 1.0.0
 * @author Typeir
 * @since 0.2.0
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { hasText, partAttrs } from '@arkhe/core';
import { useEffect } from 'react';
import { useArkhe } from '../base/ArkheProvider.js';
/**
 * Renders the hint or the error line.
 *
 * @component
 * @param {FieldNoteProps} props - Ids, hint, error.
 * @returns {JSX.Element | null} Line, or nothing.
 */
export const FieldNote = ({ ids, hint, error, }) => {
    const { announcer } = useArkhe();
    useEffect(() => {
        if (hasText(error))
            announcer.announce(error);
    }, [error, announcer]);
    if (hasText(error)) {
        return (_jsx("p", { ...partAttrs('field', 'error'), id: ids.error, children: error }));
    }
    return hasText(hint) ? (_jsx("p", { ...partAttrs('field', 'hint'), id: ids.hint, children: hint })) : null;
};

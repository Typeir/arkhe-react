/**
 * @fileoverview Field: label, optional readout, one control, hint or error,
 * wired together by ids.
 *
 * @module packages/react/src/Field
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, fieldControlAttrs, fieldIds, flag, partAttrs, } from '@arkhe/core';
import { useId } from 'react';
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
export const Field = ({ label, readout, hint, error, children, }) => {
    const ids = fieldIds(useId());
    const showHint = Boolean(hint) && !error;
    return (_jsxs("div", { className: ARKHE_CLASS, ...partAttrs('field', 'root'), "data-invalid": flag(Boolean(error)), children: [_jsxs("div", { ...partAttrs('field', 'head'), children: [_jsx("label", { ...partAttrs('field', 'label'), id: ids.label, htmlFor: ids.control, children: label }), readout === undefined ? null : (_jsx("output", { ...partAttrs('field', 'readout'), htmlFor: ids.control, "aria-live": 'off', children: readout }))] }), children(fieldControlAttrs(ids, showHint, Boolean(error))), showHint ? (_jsx("p", { ...partAttrs('field', 'hint'), id: ids.hint, children: hint })) : null, error ? (_jsx("p", { ...partAttrs('field', 'error'), id: ids.error, children: error })) : null] }));
};

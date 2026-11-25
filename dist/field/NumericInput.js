/**
 * @fileoverview NumericInput: a number field with step buttons on Zag's
 * number-input machine. Outside it is a number or `null`.
 *
 * @module packages/react/src/field/NumericInput
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, fieldDescribedBy, fieldIds, guardInputProps, numericMachineProps, REACT_EVENTS, } from '@arkhe/core';
import * as numberInput from '@zag-js/number-input';
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import { useId } from 'react';
import { useArkheEnvironment } from '../base/ArkheEnvironment.js';
import { useArkhe } from '../base/ArkheProvider.js';
import { Icon } from '../base/Icon.js';
import { FieldNote } from './FieldNote.js';
import { useNumericSync } from './useNumericSync.js';
/**
 * Renders a number field. A controlled value set while typing waits until
 * blur, so a parent that clamps cannot eat keystrokes.
 *
 * @component
 * @param {NumericInputProps} props - Label, value, bounds, callbacks.
 * @returns {JSX.Element} Number field.
 */
export const NumericInput = ({ label, value, defaultValue, onValueChange, onValueCommit, min, max, step, name, required, disabled, readOnly, hint, error, }) => {
    const { labels, locale } = useArkhe();
    const env = useArkheEnvironment();
    const { sync, track } = useNumericSync(value);
    const id = useId();
    const ids = fieldIds(id);
    const service = useMachine(numberInput.machine, {
        ...numericMachineProps({
            id,
            label,
            labels,
            locale,
            value,
            defaultValue,
            min,
            max,
            step,
            name,
            required,
            invalid: Boolean(error),
            disabled,
            readOnly,
            getRootNode: env.getRootNode,
        }),
        onValueChange: (details) => {
            sync.emit(details.valueAsNumber, onValueChange);
        },
        onValueCommit: (details) => {
            sync.commit(details.valueAsNumber, onValueCommit, { min, max });
        },
    });
    const api = track(numberInput.connect(service, normalizeProps));
    return (_jsxs("div", { ...mergeProps(api.getRootProps(), { className: ARKHE_CLASS }), children: [_jsx("label", { ...api.getLabelProps(), children: label }), _jsxs("div", { ...api.getControlProps(), children: [_jsx("button", { ...api.getDecrementTriggerProps(), children: _jsx(Icon, { name: 'minus' }) }), _jsx("input", { ...guardInputProps(api.getInputProps(), { min, max }, sync, REACT_EVENTS), "aria-describedby": fieldDescribedBy(ids, hint, error) }), _jsx("button", { ...api.getIncrementTriggerProps(), children: _jsx(Icon, { name: 'plus' }) })] }), _jsx(FieldNote, { ids: ids, hint: hint, error: error })] }));
};

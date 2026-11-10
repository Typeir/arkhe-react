/**
 * @fileoverview NumericInput: a number field with step buttons on Zag's
 * number-input machine. Outside it is a number or `null`.
 *
 * @module packages/react/src/NumericInput
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, REACT_EVENTS, guardInputProps, numericMachineProps, } from '@arkhe/core';
import * as numberInput from '@zag-js/number-input';
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import { useId } from 'react';
import { useArkhe } from './ArkheProvider.js';
import { useArkheEnvironment } from './ArkheEnvironment.js';
import { Icon } from './Icon.js';
import { useNumericSync } from './useNumericSync.js';
/**
 * Renders a number field. A controlled value set while typing waits until
 * blur, so a parent that clamps cannot eat keystrokes.
 *
 * @component
 * @param {NumericInputProps} props - Label, value, bounds, callbacks.
 * @returns {JSX.Element} Number field.
 */
export const NumericInput = (props) => {
    const { label, value, onValueChange, onValueCommit, min, max } = props;
    const { labels, locale } = useArkhe();
    const env = useArkheEnvironment();
    const { sync, track } = useNumericSync(value);
    const service = useMachine(numberInput.machine, {
        ...numericMachineProps({
            ...props,
            id: useId(),
            labels,
            locale,
            getRootNode: env.getRootNode,
        }),
        onValueChange: (details) => sync.emit(details.valueAsNumber, onValueChange),
        onValueCommit: (details) => sync.commit(details.valueAsNumber, onValueCommit, { min, max }),
    });
    const api = track(numberInput.connect(service, normalizeProps));
    return (_jsxs("div", { ...mergeProps(api.getRootProps(), { className: ARKHE_CLASS }), children: [_jsx("label", { ...api.getLabelProps(), children: label }), _jsxs("div", { ...api.getControlProps(), children: [_jsx("button", { ...api.getDecrementTriggerProps(), children: _jsx(Icon, { name: 'minus' }) }), _jsx("input", { ...guardInputProps(api.getInputProps(), { min, max }, sync, REACT_EVENTS) }), _jsx("button", { ...api.getIncrementTriggerProps(), children: _jsx(Icon, { name: 'plus' }) })] })] }));
};

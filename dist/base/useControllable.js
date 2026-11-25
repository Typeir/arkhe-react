/**
 * @fileoverview One controlled / uncontrolled state for every component
 * (R2): the host's value when given, else the component's own, seeded by the
 * default. A change runs through core's reducer template, so only a real
 * change is stored and reported.
 *
 * @module packages/react/src/base/useControllable
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
'use client';
import { dispatch } from '@arkhe/core';
import { useState } from 'react';
/**
 * Takes the action's value; the same value keeps the state object, so the
 * dispatch skips the commit.
 *
 * @function settle
 * @template S
 * @param {S} state - Value now.
 * @param {SetAction<S>} action - New value.
 * @returns {S} Next value.
 */
function settle(state, action) {
    return Object.is(state, action.next) ? state : action.next;
}
/**
 * Holds a value that is controlled when the host passes one and the
 * component's own otherwise. Own state changes only while uncontrolled;
 * every real change is reported.
 *
 * @function useControllable
 * @template S
 * @param {ControllableOptions<S>} options - Host value, default, callback.
 * @returns {ControllableHandle<S>} Current value and `commit`.
 */
export function useControllable({ value, defaultValue, onChange, }) {
    const [own, setOwn] = useState(defaultValue);
    const current = value === undefined ? own : value;
    const store = (next) => {
        if (value === undefined)
            setOwn(next);
        onChange?.(next);
    };
    const commit = (next) => {
        dispatch(settle, current, { type: 'set', next }, null, store);
    };
    return { current, commit };
}

/**
 * @fileoverview React glue for `NumericSync`: one sync per field, fed each
 * new controlled value after render.
 *
 * @module packages/react/src/useNumericSync
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { NumericSync, } from '@arkhe/core';
import { useEffect, useState } from 'react';
/**
 * Creates the field's sync and feeds it `value` after each change.
 *
 * @function useNumericSync
 * @param {NumericValue | undefined} value - Controlled value.
 * @returns {NumericSyncHandle} Sync and API tracker.
 */
export function useNumericSync(value) {
    const [handle] = useState(() => {
        let latest = null;
        return {
            sync: new NumericSync(() => latest),
            track: (api) => {
                latest = api;
                return api;
            },
        };
    });
    const { sync } = handle;
    useEffect(() => sync.receive(value), [sync, value]);
    return handle;
}

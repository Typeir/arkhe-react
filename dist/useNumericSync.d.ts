/**
 * @fileoverview React glue for `NumericSync`: one sync per field, fed each
 * new controlled value after render.
 *
 * @module packages/react/src/useNumericSync
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { NumericSync, type NumericMachineApi, type NumericValue } from '@arkhe/core';
/**
 * What the hook returns.
 *
 * @interface NumericSyncHandle
 * @property {NumericSync} sync - Field sync.
 * @property {<T extends NumericMachineApi>(api: T) => T} track - Records the live Zag API and returns it.
 */
export interface NumericSyncHandle {
    readonly sync: NumericSync;
    readonly track: <T extends NumericMachineApi>(api: T) => T;
}
/**
 * Creates the field's sync and feeds it `value` after each change.
 *
 * @function useNumericSync
 * @param {NumericValue | undefined} value - Controlled value.
 * @returns {NumericSyncHandle} Sync and API tracker.
 */
export declare function useNumericSync(value: NumericValue | undefined): NumericSyncHandle;

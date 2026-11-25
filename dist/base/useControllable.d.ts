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
/**
 * What `useControllable` holds and reports.
 *
 * @interface ControllableOptions
 * @template S
 * @property {S | undefined} value - Host value; makes the state controlled. `null` is a value.
 * @property {S} defaultValue - First own value while uncontrolled.
 * @property {((next: S) => void) | undefined} onChange - Reports each change.
 */
export interface ControllableOptions<S> {
    readonly value: S | undefined;
    readonly defaultValue: S;
    readonly onChange: ((next: S) => void) | undefined;
}
/**
 * Current value and the handler that sets and reports it.
 *
 * @interface ControllableHandle
 * @template S
 * @property {S} current - Host value when controlled, else the own one.
 * @property {(next: S) => void} commit - Stores `next` while uncontrolled and reports it; a repeat does nothing.
 */
export interface ControllableHandle<S> {
    readonly current: S;
    readonly commit: (next: S) => void;
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
export declare function useControllable<S>({ value, defaultValue, onChange, }: ControllableOptions<S>): ControllableHandle<S>;

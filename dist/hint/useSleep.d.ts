/**
 * @fileoverview A hint trigger that sleeps until its first hover, focus or
 * tap. Asleep, it carries Zag's closed trigger attributes and wake handlers.
 * Awake, the machine runs in a child that reports its trigger props back:
 * attributes re-render the trigger only when they change, handlers go
 * through stable proxies, so the trigger node, and its focus, survive.
 * Zag's focus-visible tracking starts with the first sleeping trigger, as it
 * would with the first machine, so the press that wakes a hint still counts
 * as a pointer and the focus after it does not open the hint.
 *
 * @module packages/react/src/hint/useSleep
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
import { type HintScope, type HintWake } from '@arkhe/core';
import { type HTMLAttributes } from 'react';
/**
 * Why the machine runs: what woke it, or `open` when it started open.
 *
 * @typedef {HintWake | 'open'} Waking
 */
export type Waking = HintWake | 'open';
/**
 * What `useSleep` returns.
 *
 * @interface Sleep
 * @property {Waking | null} waking - Why the machine runs; null while asleep.
 * @property {HTMLAttributes<HTMLElement>} attrs - Trigger props to spread.
 * @property {(props: object) => void} report - The live machine hands its trigger props here after each render.
 * @property {() => boolean} hovering - The pointer that woke the hint is still over the trigger.
 * @property {boolean} fresh - It has not slept yet, so `defaultOpen` still counts.
 * @property {string | null} press - Pointer kind of the press that woke it; null when none did.
 * @property {() => void} sleep - The live machine closed and finished its exit; back to sleep.
 */
export interface Sleep {
    readonly waking: Waking | null;
    readonly attrs: HTMLAttributes<HTMLElement>;
    readonly report: (props: object) => void;
    readonly hovering: () => boolean;
    readonly fresh: boolean;
    readonly press: string | null;
    readonly sleep: () => void;
}
/**
 * Sleeping trigger state for one hint.
 *
 * @function useSleep
 * @param {HintScope} scope - Machine scope.
 * @param {string} id - Machine id.
 * @param {boolean} open - Held open by the host; wakes at once.
 * @param {boolean} defaultOpen - Starts open; counts until the first sleep.
 * @returns {Sleep} Wake state, trigger props, report and sleep callbacks.
 */
export declare function useSleep(scope: HintScope, id: string, open: boolean, defaultOpen: boolean): Sleep;
/**
 * What `useSleepAgain` needs from a live hint.
 *
 * @interface SleepAgainInput
 * @property {boolean} closed - Nothing asks it open, and the machine is closed and shows nothing.
 * @property {() => boolean} idle - The machine is closed right now, read live.
 * @property {boolean} opened - It opened since it woke.
 * @property {() => boolean} pressing - A press is waiting for its click.
 * @property {() => boolean} hovering - The waking pointer is still over the trigger.
 * @property {string} positionerId - Id of the hint's positioner, whose exit is awaited.
 * @property {() => void} sleep - Puts the trigger back to sleep.
 */
export interface SleepAgainInput {
    readonly closed: boolean;
    readonly idle: () => boolean;
    readonly opened: boolean;
    readonly pressing: () => boolean;
    readonly hovering: () => boolean;
    readonly positionerId: string;
    readonly sleep: () => void;
}
/**
 * Sends a live hint back to sleep once it is closed and its exit animations
 * have ended, unless a press still waits for its click, or it never opened
 * and the pointer is still on the trigger.
 *
 * @function useSleepAgain
 * @param {SleepAgainInput} input - Machine state and the sleep callback.
 * @returns {void}
 */
export declare function useSleepAgain({ closed, idle, opened, pressing, hovering, positionerId, sleep, }: SleepAgainInput): void;

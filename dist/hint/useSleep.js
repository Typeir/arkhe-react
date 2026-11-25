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
'use client';
import { afterExit, REACT_EVENTS, sleepingTrigger, WakeWatch, } from '@arkhe/core';
import { trackFocusVisible } from '@zag-js/focus-visible';
import { useEffect, useEffectEvent, useMemo, useRef, useState, } from 'react';
import { useArkheEnvironment } from '../base/ArkheEnvironment.js';
/**
 * Whether two attribute records hold the same values.
 *
 * @function same
 * @param {TriggerProps} one - One record.
 * @param {TriggerProps} other - The other.
 * @returns {boolean} Equal.
 */
function same(one, other) {
    const keys = Object.keys(one);
    return (keys.length === Object.keys(other).length &&
        keys.every((key) => one[key] === other[key]));
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
export function useSleep(scope, id, open, defaultOpen) {
    const env = useArkheEnvironment();
    useEffect(() => {
        trackFocusVisible({ root: env.getRootNode() })();
    }, [env]);
    const [slept, setSlept] = useState(false);
    const held = open || (defaultOpen && !slept);
    const [waking, setWaking] = useState(held ? 'open' : null);
    if (waking === null && held)
        setWaking('open');
    const [view, setView] = useState(() => ({ ...sleepingTrigger(scope, id) }));
    const [keys, setKeys] = useState([]);
    const handlers = useRef({});
    const [report] = useState(() => (props) => {
        const attrs = {};
        const fns = {};
        for (const [key, value] of Object.entries(props)) {
            if (typeof value === 'function')
                fns[key] = value;
            else if (value !== undefined)
                attrs[key] = value;
        }
        handlers.current = fns;
        setView((prev) => (same(prev, attrs) ? prev : attrs));
        const names = Object.keys(fns);
        setKeys((prev) => prev.length === names.length && names.every((k, i) => prev[i] === k)
            ? prev
            : names);
    });
    const proxies = useMemo(() => Object.fromEntries(keys.map((key) => [
        key,
        (event) => {
            handlers.current[key]?.(event);
        },
    ])), [keys]);
    const [watch] = useState(() => new WakeWatch(REACT_EVENTS, setWaking));
    const [hovering] = useState(() => () => watch.hovering);
    const [leave] = useState(() => (event) => {
        watch.leave();
        handlers.current[REACT_EVENTS.pointerleave]?.(event);
    });
    const [sleep] = useState(() => () => {
        handlers.current = {};
        watch.reset();
        setView({ ...sleepingTrigger(scope, id) });
        setKeys([]);
        setWaking(null);
        setSlept(true);
    });
    const attrs = waking === null
        ? { ...view, ...watch.handlers }
        : { ...view, ...proxies, [REACT_EVENTS.pointerleave]: leave };
    return {
        waking,
        attrs: attrs,
        report,
        hovering,
        fresh: !slept,
        press: watch.press,
        sleep,
    };
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
export function useSleepAgain({ closed, idle, opened, pressing, hovering, positionerId, sleep, }) {
    const env = useArkheEnvironment();
    const ready = useEffectEvent(() => closed && idle() && !pressing() && (opened || !hovering()));
    useEffect(() => {
        if (!closed)
            return undefined;
        return afterExit(env.getRootNode(), positionerId, () => {
            if (ready())
                sleep();
        });
    }, [closed, env, positionerId, sleep]);
}

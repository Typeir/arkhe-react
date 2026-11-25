/**
 * @fileoverview React glue for `ContentLoader`: one loader per component,
 * read through React's external-store hook.
 *
 * @module packages/react/src/feedback/useContentLoader
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { loaderFor } from '@arkhe/core';
import { useCallback, useState, useSyncExternalStore } from 'react';
/**
 * State of a component with no source, or before the client renders.
 *
 * @constant IDLE
 * @type {LoadState<never>}
 */
const IDLE = { status: 'idle' };
/**
 * Unsubscribe of a component with no loader: nothing to undo.
 *
 * @function unsubscribeNothing
 * @returns {void}
 */
function unsubscribeNothing() {
    return undefined;
}
/**
 * Builds a loader for `source`.
 *
 * @function hold
 * @template T
 * @param {(() => Promise<T>) | undefined} source - Fetches the content.
 * @returns {Held<T>} Source and loader.
 */
function hold(source) {
    return { source, loader: source ? loaderFor(source) : null };
}
/**
 * Keeps one loader per `source`. A new `source` gets a new loader, so keep
 * it stable (`useCallback`) unless what it loads changed. Without a source
 * the state stays idle.
 *
 * @function useContentLoader
 * @template T
 * @param {(() => Promise<T>) | undefined} source - Fetches the content.
 * @returns {ContentLoaderHandle<T>} State and start.
 */
export function useContentLoader(source) {
    const [held, setHeld] = useState(() => hold(source));
    const current = held.source === source ? held : hold(source);
    if (current !== held)
        setHeld(current);
    const { loader } = current;
    const subscribe = useCallback((listener) => loader?.subscribe(listener) ?? unsubscribeNothing, [loader]);
    const state = useSyncExternalStore(subscribe, () => loader?.snapshot() ?? IDLE, () => IDLE);
    const load = useCallback(() => void loader?.load(), [loader]);
    return { state, load };
}

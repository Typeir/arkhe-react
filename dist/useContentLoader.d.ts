/**
 * @fileoverview React glue for `ContentLoader`: one loader per component,
 * read through React's external-store hook.
 *
 * @module packages/react/src/useContentLoader
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { type LoadState } from '@arkhe/core';
/**
 * What the hook returns.
 *
 * @interface ContentLoaderHandle
 * @template T
 * @property {LoadState<T>} state - Current load state.
 * @property {() => void} load - Starts the load once.
 */
export interface ContentLoaderHandle<T> {
    readonly state: LoadState<T>;
    readonly load: () => void;
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
export declare function useContentLoader<T>(source: (() => Promise<T>) | undefined): ContentLoaderHandle<T>;

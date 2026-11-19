/**
 * @fileoverview Whether the component is past hydration. Portals render
 * only after it, so server markup holds none and matches the client's
 * first render.
 *
 * @module packages/react/src/useHydrated
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
/**
 * Returns false on the server and while hydrating, true after, and true
 * straight away in a client-only render.
 *
 * @function useHydrated
 * @returns {boolean} Hydrated.
 */
export declare function useHydrated(): boolean;

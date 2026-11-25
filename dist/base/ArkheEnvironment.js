/**
 * @fileoverview Sets where the Arkhé components below it live: the root node
 * Zag queries, and the element portals mount into.
 *
 * @module packages/react/src/base/ArkheEnvironment
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createEnvironment, DEFAULT_ENVIRONMENT, } from '@arkhe/core';
import { createContext, useContext, useMemo, } from 'react';
/**
 * Environment of the subtree; the main document's when no provider is above.
 *
 * @constant EnvironmentContext
 * @type {import('react').Context<ArkheEnvironmentValue>}
 */
const EnvironmentContext = createContext(DEFAULT_ENVIRONMENT);
/**
 * Publishes an environment to every Arkhé component below.
 *
 * @component
 * @param {ArkheEnvironmentProps} props - Root node, container, subtree.
 * @returns {JSX.Element} Provider.
 */
export const ArkheEnvironment = ({ rootNode, container, children, }) => {
    const value = useMemo(() => createEnvironment({ rootNode, container }), [rootNode, container]);
    return _jsx(EnvironmentContext, { value: value, children: children });
};
/**
 * Returns the nearest environment, or the main document's.
 *
 * @function useArkheEnvironment
 * @returns {ArkheEnvironmentValue} Environment.
 */
export function useArkheEnvironment() {
    return useContext(EnvironmentContext);
}

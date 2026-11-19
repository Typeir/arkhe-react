/**
 * @fileoverview Sets where the Arkhé components below it live: the root node
 * Zag queries, and the element portals mount into.
 *
 * @module packages/react/src/ArkheEnvironment
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { DEFAULT_ENVIRONMENT, createEnvironment, } from '@arkhe/core';
import { createContext, useContext, useMemo, } from 'react';
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
    return (_jsx(EnvironmentContext.Provider, { value: value, children: children }));
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

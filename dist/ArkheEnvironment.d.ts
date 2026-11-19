/**
 * @fileoverview Sets where the Arkhé components below it live: the root node
 * Zag queries, and the element portals mount into.
 *
 * @module packages/react/src/ArkheEnvironment
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { type ArkheEnvironmentValue, type RootNode } from '@arkhe/core';
import { type JSX, type ReactNode } from 'react';
/**
 * Props of ArkheEnvironment.
 *
 * @interface ArkheEnvironmentProps
 * @property {() => RootNode} [rootNode] - Returns the root node, e.g. a shadow root.
 * @property {HTMLElement} [container] - Portal target. Defaults to the root node's body.
 * @property {ReactNode} children - Subtree.
 */
export interface ArkheEnvironmentProps {
    readonly rootNode?: () => RootNode;
    readonly container?: HTMLElement;
    readonly children: ReactNode;
}
/**
 * Publishes an environment to every Arkhé component below.
 *
 * @component
 * @param {ArkheEnvironmentProps} props - Root node, container, subtree.
 * @returns {JSX.Element} Provider.
 */
export declare const ArkheEnvironment: ({ rootNode, container, children, }: ArkheEnvironmentProps) => JSX.Element;
/**
 * Returns the nearest environment, or the main document's.
 *
 * @function useArkheEnvironment
 * @returns {ArkheEnvironmentValue} Environment.
 */
export declare function useArkheEnvironment(): ArkheEnvironmentValue;

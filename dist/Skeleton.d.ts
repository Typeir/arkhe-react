/**
 * @fileoverview Skeleton placeholders. `Skeleton` declares one shape;
 * `SkeletonGroup` owns a set of them: it shows them while loading, swaps in
 * the content when loading ends, and has the canvas effect engine reveal it.
 * The CSS skeleton shows until a canvas has painted the group.
 *
 * @module packages/react/src/Skeleton
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import { type JSX, type ReactNode } from 'react';
/**
 * Props of Skeleton.
 *
 * @interface SkeletonProps
 * @property {'line' | 'block'} [shape] - A text line or a block. Defaults to `line`.
 * @property {string} [width] - CSS width. Defaults to the full row.
 * @property {string} [height] - CSS height. Defaults by shape.
 */
export interface SkeletonProps {
    readonly shape?: 'line' | 'block';
    readonly width?: string;
    readonly height?: string;
}
/**
 * Props of SkeletonGroup.
 *
 * @interface SkeletonGroupProps
 * @property {boolean} loading - True: show `skeleton` and animate. False: show `children` and reveal them.
 * @property {ReactNode} skeleton - Shapes in the final layout's shape.
 * @property {ReactNode} [children] - The real content, mounted only once loading ends.
 * @property {boolean} [effect] - False keeps the CSS skeleton for this group. Defaults to true.
 * @property {() => void} [onRevealed] - Called when the reveal has finished, or at once without an effect.
 */
export interface SkeletonGroupProps {
    readonly loading: boolean;
    readonly skeleton: ReactNode;
    readonly children?: ReactNode;
    readonly effect?: boolean;
    readonly onRevealed?: () => void;
}
/**
 * Renders one placeholder shape, hidden from assistive technology.
 *
 * @component
 * @param {SkeletonProps} props - Component props.
 * @param {'line' | 'block'} [props.shape] - Shape.
 * @param {string} [props.width] - CSS width.
 * @param {string} [props.height] - CSS height.
 * @returns {JSX.Element} Placeholder.
 */
export declare const Skeleton: ({ shape, width, height, }: SkeletonProps) => JSX.Element;
/**
 * Owns a skeleton and its content. While loading, its only text is the
 * hidden `loading` label, which the announcer speaks. The engine attaches
 * on mount and whenever loading starts, is told the content is ready in a
 * layout effect, so the cover paints before the browser does, and detaches
 * on unmount. Without a loaded engine the content just shows.
 *
 * @component
 * @param {SkeletonGroupProps} props - Component props.
 * @param {boolean} props.loading - Loading.
 * @param {ReactNode} props.skeleton - Shapes.
 * @param {ReactNode} [props.children] - Content.
 * @param {boolean} [props.effect] - Canvas effect on.
 * @param {() => void} [props.onRevealed] - Reveal finished.
 * @returns {JSX.Element} Owner.
 */
export declare const SkeletonGroup: ({ loading, skeleton, children, effect, onRevealed, }: SkeletonGroupProps) => JSX.Element;

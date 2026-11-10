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
'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, announceText, flag, partAttrs, } from '@arkhe/core';
import { useEffect, useLayoutEffect, useRef, } from 'react';
import { useArkhe } from './ArkheProvider.js';
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
export const Skeleton = ({ shape = 'line', width, height, }) => {
    const style = {
        '--skeleton-width': width,
        '--skeleton-height': height,
    };
    return (_jsx("span", { className: ARKHE_CLASS, ...partAttrs('skeleton', 'root'), "data-shape": shape, style: style, "aria-hidden": true }));
};
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
export const SkeletonGroup = ({ loading, skeleton, children, effect = true, onRevealed, }) => {
    const { labels, announcer, effects } = useArkhe();
    const host = useRef(null);
    const label = useRef(null);
    const shown = useRef(loading);
    const revealed = useRef(onRevealed);
    useLayoutEffect(() => {
        revealed.current = onRevealed;
    });
    useEffect(() => loading && label.current
        ? announceText(label.current, announcer, () => 'polite')
        : undefined, [announcer, loading]);
    const attached = useRef(null);
    useEffect(() => {
        const el = host.current;
        if (!loading || !effect || !el)
            return;
        const attach = (fx) => {
            attached.current = fx;
            fx?.attach(el);
        };
        if (effects.engine)
            return attach(effects.engine);
        let live = true;
        void effects.request().then((fx) => {
            if (live)
                attach(fx);
        });
        return () => {
            live = false;
        };
    }, [effects, loading, effect]);
    useLayoutEffect(() => {
        const was = shown.current;
        shown.current = loading;
        const el = host.current;
        if (!was || loading || !el)
            return;
        const done = () => revealed.current?.();
        const fx = effect ? attached.current : null;
        if (fx)
            fx.ready(el, done);
        else
            done();
    }, [loading, effect]);
    useEffect(() => {
        const el = host.current;
        return () => {
            if (el)
                attached.current?.detach(el);
        };
    }, []);
    return (_jsx("div", { ref: host, className: ARKHE_CLASS, ...partAttrs('skeleton', 'group'), "data-loading": flag(loading), children: loading ? (_jsxs(_Fragment, { children: [_jsx("span", { ref: label, ...partAttrs('skeleton', 'label'), children: labels.loading }), skeleton] })) : (children) }));
};

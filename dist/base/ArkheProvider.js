/**
 * @fileoverview App-wide adapters: translated labels, icon sets, the link
 * component, the announcer and the canvas effect engine. Components read
 * them through `useArkhe`. Without a provider the announcer makes its
 * regions on first use, and a shared default engine is used.
 *
 * @module packages/react/src/base/ArkheProvider
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Announcer, DEFAULT_LOCALE, FxLoader, resolveLabels, } from '@arkhe/core';
import { createContext, useContext, useLayoutEffect, useMemo, useState, } from 'react';
import { useStableRecord } from './useStableRecord.js';
/**
 * Imports the effect engine, a chunk of its own.
 *
 * @function loadFx
 * @returns {Promise<FxModule>} Engine module.
 */
function loadFx() {
    return import('@arkhe/core/fx');
}
/**
 * What components read outside any provider: English labels, Lucide icons,
 * plain anchors, an unmounted announcer.
 *
 * @constant DEFAULT_CONTEXT
 * @type {ArkheContextValue}
 */
const DEFAULT_CONTEXT = {
    labels: resolveLabels(),
    locale: DEFAULT_LOCALE,
    icons: [],
    link: 'a',
    announcer: new Announcer(),
    effects: new FxLoader({}, loadFx),
    hoverCards: true,
};
/**
 * Adapters of the subtree, from the nearest provider.
 *
 * @constant ArkheContext
 * @type {import('react').Context<ArkheContextValue>}
 */
const ArkheContext = createContext(DEFAULT_CONTEXT);
/**
 * Supplies labels, icons, the link renderer, the announcer and the effect
 * engine to every Arkhé component below. Mounts the announcer's live
 * regions with itself, and destroys its engine with itself. Labels and
 * icons written inline keep one identity while their contents hold, so a
 * re-render of the app does not re-render every Arkhé component.
 *
 * @component
 * @param {ArkheProviderProps} props - Component props.
 * @param {Partial<ArkheLabels>} [props.labels] - Translated label templates.
 * @param {string} [props.locale] - BCP 47 locale for plurals and numbers.
 * @param {IconSet<IconComponent>} [props.icons] - Icons by Lucide name.
 * @param {LinkComponent} [props.link] - Link renderer.
 * @param {EffectsSetting} [props.effects] - Canvas effect options, or `false`.
 * @param {boolean} [props.hoverCards] - `false` opens hover cards on click only.
 * @param {ReactNode} props.children - App subtree.
 * @returns {JSX.Element} Provider.
 */
export const ArkheProvider = ({ labels, locale, icons, link, effects, hoverCards, children, }) => {
    const [announcer] = useState(() => new Announcer());
    const [engine] = useState(() => new FxLoader(effects ?? {}, loadFx));
    const stableLabels = useStableRecord(labels);
    const iconSet = useStableRecord(icons);
    useLayoutEffect(() => announcer.mount(), [announcer]);
    useLayoutEffect(() => engine.mount(), [engine]);
    const value = useMemo(() => ({
        labels: resolveLabels(stableLabels),
        locale: locale ?? DEFAULT_LOCALE,
        icons: iconSet ? [iconSet] : [],
        link: link ?? 'a',
        announcer,
        effects: engine,
        hoverCards: hoverCards ?? true,
    }), [stableLabels, locale, iconSet, link, announcer, engine, hoverCards]);
    return _jsx(ArkheContext, { value: value, children: children });
};
/**
 * Returns the nearest provider's adapters, or the defaults outside any
 * provider.
 *
 * @function useArkhe
 * @returns {ArkheContextValue} Adapters.
 */
export function useArkhe() {
    return useContext(ArkheContext);
}

/**
 * @fileoverview App-wide adapters: translated labels, icon sets, the link
 * component, the announcer and the canvas effect engine. Components read
 * them through `useArkhe`. Without a provider the announcer makes its
 * regions on first use, and a shared default engine is used.
 *
 * @module packages/react/src/ArkheProvider
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Announcer, FxLoader, DEFAULT_LOCALE, resolveLabels, } from '@arkhe/core';
import { createContext, useContext, useLayoutEffect, useMemo, useState, } from 'react';
/**
 * Imports the effect engine, a chunk of its own.
 *
 * @function loadFx
 * @returns {Promise<FxModule>} Engine module.
 */
function loadFx() {
    return import('@arkhe/core/fx');
}
const DEFAULT_CONTEXT = {
    labels: resolveLabels(),
    locale: DEFAULT_LOCALE,
    icons: [],
    link: 'a',
    announcer: new Announcer(),
    effects: new FxLoader({}, loadFx),
};
const ArkheContext = createContext(DEFAULT_CONTEXT);
/**
 * Supplies labels, icons, the link renderer, the announcer and the effect
 * engine to every Arkhé component below. Mounts the announcer's live
 * regions with itself, and destroys its engine with itself.
 *
 * @component
 * @param {ArkheProviderProps} props - Component props.
 * @param {Partial<ArkheLabels>} [props.labels] - Translated label templates.
 * @param {string} [props.locale] - BCP 47 locale for plurals and numbers.
 * @param {IconSet<IconComponent>} [props.icons] - Icons by Lucide name.
 * @param {LinkComponent} [props.link] - Link renderer.
 * @param {EffectsSetting} [props.effects] - Canvas effect options, or `false`.
 * @param {ReactNode} props.children - App subtree.
 * @returns {JSX.Element} Provider.
 */
export const ArkheProvider = ({ labels, locale, icons, link, effects, children, }) => {
    const [announcer] = useState(() => new Announcer());
    const [engine] = useState(() => new FxLoader(effects ?? {}, loadFx));
    useLayoutEffect(() => announcer.mount(), [announcer]);
    useLayoutEffect(() => engine.mount(), [engine]);
    const value = useMemo(() => ({
        labels: resolveLabels(labels),
        locale: locale ?? DEFAULT_LOCALE,
        icons: icons ? [icons] : [],
        link: link ?? 'a',
        announcer,
        effects: engine,
    }), [labels, locale, icons, link, announcer, engine]);
    return (_jsx(ArkheContext.Provider, { value: value, children: children }));
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

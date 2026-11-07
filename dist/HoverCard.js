/**
 * @fileoverview HoverCard: a rich reference card on Zag's hover-card machine.
 * Cards nest (a card's content may hold more cards), load content on first
 * open, and pin open until unpinned. The card mounts on first open,
 * portalled into the environment's container, so server markup holds the
 * trigger alone and the body may hold any content.
 *
 * @module packages/react/src/HoverCard
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, floatingMachineProps, formatLabel, } from '@arkhe/core';
import * as hoverCard from '@zag-js/hover-card';
import { Portal, mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import { useEffect, useId, useState } from 'react';
import { useArkhe } from './ArkheProvider.js';
import { useArkheEnvironment } from './ArkheEnvironment.js';
import { Button } from './Button.js';
import { HintContext, HintTrigger, useHint, useHintNode, useOpenState, } from './HintTrigger.js';
import { Status } from './Status.js';
import { useContentLoader } from './useContentLoader.js';
import { usePortalContainer } from './usePortalContainer.js';
/**
 * Renders a trigger that opens a reference card on hover, focus or tap. A
 * tap outside or Escape closes it, unless pinned. A tap on a link trigger
 * opens the card; the header's link follows it. A card stays open while
 * a card nested in it is open. Unpinning hands the card back to hover: it
 * stays open while the pointer is over it.
 *
 * @component
 * @param {HoverCardProps<T>} props - Title, trigger, body, open state, timing.
 * @returns {JSX.Element} Trigger, and the card once opened.
 */
export const HoverCard = ({ title, children, href, inline, content, load, loaded, pinnable = true, open, defaultOpen, onOpenChange, placement = 'bottom-start', openDelay = 400, closeDelay = 200, }) => {
    const { labels } = useArkhe();
    const env = useArkheEnvironment();
    const container = usePortalContainer();
    const node = useHintNode();
    const [pinned, setPinned] = useState(false);
    const { shown, change } = useOpenState(open, defaultOpen, onOpenChange);
    const body = useContentLoader(load);
    const service = useMachine(hoverCard.machine, {
        ...floatingMachineProps({
            id: useId(),
            open: shown,
            hold: pinned,
            placement,
            onOpenChange: (next) => {
                if (node.request(next))
                    change(next);
            },
            getRootNode: env.getRootNode,
        }),
        openDelay,
        closeDelay,
    });
    const api = hoverCard.connect(service, normalizeProps);
    const positioner = api.getPositionerProps();
    const hint = useHint({
        open: api.open,
        setOpen: (next) => {
            if (next || !pinned)
                change(next);
        },
        trigger: api.getTriggerProps(),
        positionerId: positioner.id ?? '',
        node,
        leaving: () => service.state.matches('closing'),
    });
    const { state, load: start } = body;
    useEffect(() => {
        if (api.open)
            start();
    }, [api.open, start]);
    const togglePin = () => {
        if (pinned)
            change(service.state.matches('open'));
        setPinned(!pinned);
    };
    return (_jsxs("span", { className: ARKHE_CLASS, "data-scope": 'hover-card', "data-part": 'root', children: [_jsx(HintTrigger, { attrs: hint.trigger, href: href, inline: inline, children: children }), hint.mounted ? (_jsx(Portal, { container: container, getRootNode: env.getRootNode, children: _jsx("div", { className: ARKHE_CLASS, children: _jsx("div", { ...mergeProps(positioner, { hidden: !api.open }), children: _jsxs("div", { ...api.getContentProps(), "data-pinned": pinned ? '' : undefined, children: [_jsxs("div", { "data-scope": 'hover-card', "data-part": 'header', children: [_jsx("span", { "data-scope": 'hover-card', "data-part": 'title', children: title }), href !== undefined ? (_jsx(Button, { variant: 'ghost', icon: 'external-link', label: formatLabel(labels.openLink, { label: title }), href: href })) : null, pinnable ? (_jsx(Button, { variant: 'ghost', icon: pinned ? 'pin-off' : 'pin', label: formatLabel(pinned ? labels.unpin : labels.pin, {
                                                label: title,
                                            }), pressed: pinned, onClick: togglePin })) : null] }), _jsx("div", { "data-scope": 'hover-card', "data-part": 'body', children: _jsxs(HintContext, { value: node, children: [content, state.status === 'loading' ? (_jsx(Status, { kind: 'loading' })) : null, state.status === 'error' ? _jsx(Status, { kind: 'error' }) : null, state.status === 'ready' ? loaded?.(state.value) : null] }) })] }) }) }) })) : null] }));
};

/**
 * @fileoverview HoverCard: a rich reference card on Zag's hover-card machine.
 * Cards nest (a card's content may hold more cards), load content on first
 * open, and pin open until unpinned.
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
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import { useEffect, useId, useState } from 'react';
import { useArkhe } from './ArkheProvider.js';
import { useArkheEnvironment } from './ArkheEnvironment.js';
import { Button } from './Button.js';
import { Status } from './Status.js';
import { useContentLoader } from './useContentLoader.js';
/**
 * Renders a trigger that opens a reference card on hover or focus. The card
 * renders in place, so a nested card stays inside its parent's layer.
 * Unpinning hands the card back to hover: it stays open while the pointer
 * is over it.
 *
 * @component
 * @param {HoverCardProps<T>} props - Title, trigger, body, timing.
 * @returns {JSX.Element} Trigger and card.
 */
export const HoverCard = ({ title, children, content, load, loaded, pinnable = true, placement = 'bottom-start', openDelay = 400, closeDelay = 200, }) => {
    const { labels } = useArkhe();
    const env = useArkheEnvironment();
    const [pinned, setPinned] = useState(false);
    const [open, setOpen] = useState(false);
    const body = useContentLoader(load);
    const service = useMachine(hoverCard.machine, {
        ...floatingMachineProps({
            id: useId(),
            open,
            hold: pinned,
            placement,
            strategy: 'fixed',
            onOpenChange: setOpen,
            getRootNode: env.getRootNode,
        }),
        openDelay,
        closeDelay,
    });
    const api = hoverCard.connect(service, normalizeProps);
    const { state, load: start } = body;
    useEffect(() => {
        if (api.open)
            start();
    }, [api.open, start]);
    const togglePin = () => {
        if (pinned)
            setOpen(service.state.matches('open'));
        setPinned(!pinned);
    };
    return (_jsxs("span", { className: ARKHE_CLASS, "data-scope": 'hover-card', "data-part": 'root', children: [_jsx("button", { type: 'button', ...api.getTriggerProps(), children: children }), _jsx("span", { ...mergeProps(api.getPositionerProps(), { hidden: !api.open }), children: _jsxs("span", { ...api.getContentProps(), "data-pinned": pinned ? '' : undefined, children: [_jsxs("span", { "data-scope": 'hover-card', "data-part": 'header', children: [_jsx("span", { "data-scope": 'hover-card', "data-part": 'title', children: title }), pinnable ? (_jsx(Button, { variant: 'ghost', icon: pinned ? 'pin-off' : 'pin', label: formatLabel(pinned ? labels.unpin : labels.pin, {
                                        label: title,
                                    }), pressed: pinned, onClick: togglePin })) : null] }), _jsxs("span", { "data-scope": 'hover-card', "data-part": 'body', children: [content, state.status === 'loading' ? _jsx(Status, { kind: 'loading' }) : null, state.status === 'error' ? _jsx(Status, { kind: 'error' }) : null, state.status === 'ready' ? loaded?.(state.value) : null] })] }) })] }));
};

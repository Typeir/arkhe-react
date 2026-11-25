/**
 * @fileoverview The running half of HoverCard: Zag's hover-card machine,
 * started on the first hover, focus or tap. Hands its trigger props to the
 * sleeping trigger, replays the waking event, renders the card once opened,
 * and goes back to sleep once closed: pinning, moving, loading and nested
 * cards all live here.
 *
 * @module packages/react/src/hint/LiveHoverCard
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, CardAccess, cardContentProps, cardTriggerAria, elementById, flag, floatingMachineProps, HINT_GUTTER, partAttrs, REACT_EVENTS, } from '@arkhe/core';
import * as hoverCard from '@zag-js/hover-card';
import { mergeProps, normalizeProps, Portal, useMachine } from '@zag-js/react';
import { useEffect, useEffectEvent, useLayoutEffect, useState, } from 'react';
import { useArkheEnvironment } from '../base/ArkheEnvironment.js';
import { useArkhe } from '../base/ArkheProvider.js';
import { useControllable } from '../base/useControllable.js';
import { usePortalContainer } from '../base/usePortalContainer.js';
import { Status } from '../feedback/Status.js';
import { useContentLoader } from '../feedback/useContentLoader.js';
import { CardHeader } from './CardHeader.js';
import { HintContext, useHint, useHintNode } from './HintTrigger.js';
import { useCardDrag } from './useCardDrag.js';
import { useSleepAgain } from './useSleep.js';
/**
 * Runs the hover-card machine for a woken HoverCard.
 *
 * @component
 * @param {LiveHoverCardProps<T>} props - HoverCard props, id, wake, report.
 * @returns {JSX.Element | null} The card, once opened.
 */
export const LiveHoverCard = ({ title, href, headerLink = true, actions, inline, content, load, loaded, pinnable = true, open, defaultOpen, onOpenChange, placement = 'bottom-start', openDelay = 400, closeDelay = 200, width, card, id, waking, sleeper, }) => {
    const { report, hovering, press, sleep } = sleeper;
    const { hoverCards, labels, announcer } = useArkhe();
    const env = useArkheEnvironment();
    const container = usePortalContainer();
    const node = useHintNode();
    const [pinned, setPinned] = useState(false);
    const [detached, setDetached] = useState(false);
    const { current: shown, commit } = useControllable({
        value: open,
        defaultValue: defaultOpen ?? false,
        onChange: onOpenChange,
    });
    if (detached && !shown)
        setDetached(false);
    const body = useContentLoader(load);
    const service = useMachine(hoverCard.machine, {
        ...floatingMachineProps({
            id,
            open: shown,
            hold: pinned,
            placement,
            gutter: HINT_GUTTER,
            onOpenChange: (next) => {
                if (node.request(next))
                    commit(next);
            },
            getRootNode: env.getRootNode,
        }),
        openDelay,
        closeDelay,
        disabled: !(card ?? hoverCards),
    });
    const api = hoverCard.connect(service, normalizeProps);
    const positioner = api.getPositionerProps();
    const contentProps = cardContentProps(api.getContentProps(), pinned, REACT_EVENTS);
    const triggerProps = api.getTriggerProps();
    const [triggerId, contentId] = [triggerProps.id ?? '', contentProps.id ?? ''];
    const togglePin = () => {
        if (pinned)
            commit(service.state.matches('open'));
        setPinned(!pinned);
        setDetached(false);
    };
    const unpinAndClose = () => {
        setPinned(false);
        setDetached(false);
        commit(false);
    };
    const release = useEffectEvent(unpinAndClose);
    const shut = useEffectEvent(() => {
        commit(false);
    });
    const hint = useHint({
        open: api.open,
        setOpen: (next) => {
            if (next || !pinned)
                commit(next);
        },
        trigger: triggerProps,
        positionerId: positioner.id ?? '',
        node,
        leaving: () => service.state.matches('closing'),
        activate: href === undefined ? togglePin : undefined,
        keys: href === undefined && inline,
        pressed: press,
    });
    const move = useCardDrag({
        open: api.open && hint.mounted,
        contentId,
        triggerId,
        getRootNode: env.getRootNode,
        detached,
        setDetached: (on) => {
            if (on)
                setPinned(true);
            setDetached(on);
        },
        pin: () => {
            setPinned(true);
        },
        title,
        labels,
        announce: (text) => {
            announcer.announce(text);
        },
    });
    const { state, load: start } = body;
    useEffect(() => {
        if (api.open)
            start();
    }, [api.open, start]);
    useEffect(() => {
        if (!api.open)
            return undefined;
        const byId = (key) => elementById(env.getRootNode(), key);
        const access = new CardAccess({
            getRootNode: env.getRootNode,
            trigger: () => byId(triggerId),
            content: () => byId(contentId),
            node,
            close: () => {
                shut();
            },
            release: () => {
                release();
            },
        });
        access.pin(pinned);
        return access.attach();
    }, [api.open, pinned, env, node, triggerId, contentId]);
    useLayoutEffect(() => {
        report({
            ...hint.trigger,
            ...cardTriggerAria({
                link: href !== undefined,
                inline: Boolean(inline),
                open: api.open,
                contentId,
                bodyId: `${id}body`,
            }),
        });
    });
    useSleepAgain({
        closed: !shown && !api.open && service.state.matches('closed'),
        idle: () => service.state.matches('closed'),
        opened: hint.mounted,
        pressing: hint.pressing,
        hovering,
        positionerId: positioner.id ?? '',
        sleep,
    });
    const replay = useEffectEvent(() => {
        if (!(card ?? hoverCards))
            return;
        const el = elementById(env.getRootNode(), triggerId);
        if (waking === 'focus' && el?.matches(':focus') === true) {
            service.send({ type: 'TRIGGER_FOCUS' });
        }
        if (waking === 'hover' && hovering()) {
            service.send({ type: 'POINTER_ENTER', src: 'trigger' });
        }
    });
    useEffect(() => {
        replay();
    }, []);
    if (!hint.mounted)
        return null;
    return (_jsx(Portal, { container: container, getRootNode: env.getRootNode, children: _jsx("div", { className: ARKHE_CLASS, ...partAttrs('hover-card', 'frame'), "data-detached": flag(detached), children: _jsx("div", { ...mergeProps(positioner, { hidden: !api.open }), children: _jsxs("div", { ...mergeProps(contentProps, {
                        role: 'dialog',
                        'aria-labelledby': `${id}title`,
                    }), "data-pinned": flag(pinned), "data-width": width, children: [_jsx(CardHeader, { title: title, titleId: `${id}title`, href: headerLink ? href : undefined, actions: actions, pinnable: pinnable, pinned: pinned, detached: detached, onMove: move, onTogglePin: togglePin, onClose: () => {
                                elementById(env.getRootNode(), triggerId)?.focus();
                                unpinAndClose();
                            } }), _jsx("div", { ...partAttrs('hover-card', 'body'), id: `${id}body`, children: _jsxs(HintContext, { value: node, children: [content, state.status === 'loading' ? _jsx(Status, { kind: 'loading' }) : null, state.status === 'error' ? _jsx(Status, { kind: 'error' }) : null, state.status === 'ready' ? loaded?.(state.value) : null] }) })] }) }) }) }));
};

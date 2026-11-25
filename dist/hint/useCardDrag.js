/**
 * @fileoverview Hooks a hover card up to core `CardDrag` while it is open,
 * and answers its move menu. Not exported: HoverCard uses it.
 *
 * @module packages/react/src/hint/useCardDrag
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
'use client';
import { CardDrag, elementById, formatLabel, isCorner, MOVE_BACK, moveMenu, } from '@arkhe/core';
import { useEffect, useEffectEvent, useRef } from 'react';
/**
 * Drags the open card and answers its move menu.
 *
 * @function useCardDrag
 * @param {CardDragOptions} options - Card, state and labels.
 * @returns {(value: string) => void} Handles a move menu choice.
 */
export function useCardDrag({ open, contentId, triggerId, getRootNode, detached, setDetached, pin, title, labels, announce, }) {
    const drag = useRef(null);
    const isDetached = useEffectEvent(() => detached);
    const detach = useEffectEvent(() => {
        setDetached(true);
    });
    const pinCard = useEffectEvent(() => {
        pin();
    });
    const moved = useEffectEvent(() => {
        announce(formatLabel(labels.cardMoved, { label: title }));
    });
    useEffect(() => {
        if (!open)
            return undefined;
        const card = () => elementById(getRootNode(), contentId);
        const instance = new CardDrag({
            card,
            trigger: () => elementById(getRootNode(), triggerId),
            frame: () => card()?.closest('[data-part="frame"]') ?? null,
            header: () => card()?.querySelector('[data-part="header"]') ?? null,
            grip: () => card()?.querySelector('[data-scope="menu"][data-part="trigger"]') ?? null,
            detached: () => isDetached(),
            detach: () => {
                detach();
            },
            pin: () => {
                pinCard();
            },
            moved: () => {
                moved();
            },
        });
        drag.current = instance;
        const stop = instance.attach();
        return () => {
            stop();
            drag.current = null;
        };
    }, [open, contentId, triggerId, getRootNode]);
    const move = (value) => {
        if (value === MOVE_BACK) {
            setDetached(false);
        }
        else if (isCorner(value)) {
            drag.current?.moveToCorner(value);
        }
        const place = moveMenu(labels, true).find((entry) => 'value' in entry && entry.value === value);
        if (place && 'label' in place) {
            announce(formatLabel(labels.cardMovedTo, { label: title, place: place.label }));
        }
    };
    return move;
}

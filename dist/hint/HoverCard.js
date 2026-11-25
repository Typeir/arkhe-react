/**
 * @fileoverview HoverCard: a rich reference card on Zag's hover-card machine.
 * Cards nest (a card's content may hold more cards), load content on first
 * open, and pin open until unpinned. The machine sleeps until the first
 * hover, focus or tap; the card mounts on first open, portalled into the
 * environment's container, so server markup holds the trigger alone and the
 * body may hold any content.
 *
 * @module packages/react/src/hint/HoverCard
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, cardTriggerAria, partAttrs, } from '@arkhe/core';
import { useId } from 'react';
import { HintTrigger } from './HintTrigger.js';
import { LiveHoverCard } from './LiveHoverCard.js';
import { useSleep } from './useSleep.js';
/**
 * Renders a trigger that opens a reference card on hover, focus or tap. A
 * click or Enter on a button or inline trigger pins it; a link trigger
 * follows its link, and a tap on it opens the card. Tab reaches into the
 * open card and out past the trigger; focus leaving an unpinned card closes
 * it. Escape closes the innermost card, pinned or not, and focus inside it
 * returns to the trigger. A tap outside closes an unpinned card. A card
 * stays open while a card nested in it is open. Unpinning hands the card
 * back to hover: it stays open while the pointer is over it.
 * The machine sleeps until the first hover, focus or tap, and again once
 * the card has closed.
 *
 * @component
 * @param {HoverCardProps<T>} props - Title, trigger, body, open state, timing.
 * @returns {JSX.Element} Trigger, and the card once opened.
 */
export const HoverCard = (props) => {
    const { children, href, inline, open, defaultOpen } = props;
    const id = useId();
    const sleep = useSleep('hover-card', id, open === true, defaultOpen === true);
    const attrs = sleep.waking === null
        ? {
            ...sleep.attrs,
            ...cardTriggerAria({
                link: href !== undefined,
                inline: Boolean(inline),
                open: false,
                contentId: '',
                bodyId: '',
            }),
        }
        : sleep.attrs;
    return (_jsxs("span", { className: ARKHE_CLASS, ...partAttrs('hover-card', 'root'), children: [_jsx(HintTrigger, { attrs: attrs, href: href, inline: inline, children: children }), sleep.waking === null ? null : (_jsx(LiveHoverCard, { ...props, defaultOpen: sleep.fresh ? defaultOpen : undefined, id: id, waking: sleep.waking, sleeper: sleep }))] }));
};

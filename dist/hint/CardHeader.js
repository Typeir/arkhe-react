/**
 * @fileoverview A hover card's header: the grip that drags the card and opens
 * its move menu, its small chrome title, the host's actions, then the
 * built-in link, pin and close buttons. Not exported:
 * HoverCard draws it.
 *
 * @module packages/react/src/hint/CardHeader
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatLabel, moveMenu, partAttrs } from '@arkhe/core';
import { Button } from '../action/Button.js';
import { Menu } from '../action/Menu.js';
import { useArkhe } from '../base/ArkheProvider.js';
/**
 * Renders the header of a hover card.
 *
 * @component
 * @param {CardHeaderProps} props - Component props.
 * @returns {JSX.Element} Header.
 */
export const CardHeader = ({ title, titleId, href, actions, pinnable, pinned, onTogglePin, onClose, detached, onMove, }) => {
    const { labels } = useArkhe();
    return (_jsxs("div", { ...partAttrs('hover-card', 'header'), children: [_jsx(Menu, { trigger: formatLabel(labels.moveCard, { label: title }), icon: 'grip-vertical', items: moveMenu(labels, detached), onSelect: onMove }), _jsx("span", { ...partAttrs('hover-card', 'title'), id: titleId, children: title }), actions === undefined ? null : (_jsx("span", { ...partAttrs('hover-card', 'actions'), children: actions })), href !== undefined ? (_jsx(Button, { shape: 'plain', size: 'm', icon: 'external-link', label: formatLabel(labels.openLink, { label: title }), href: href })) : null, pinnable ? (_jsx(Button, { shape: 'plain', size: 'm', icon: 'pin', label: formatLabel(pinned ? labels.unpin : labels.pin, {
                    label: title,
                }), pressed: pinned, onClick: onTogglePin })) : null, _jsx("span", { ...partAttrs('hover-card', 'close'), hidden: !pinned, children: _jsx(Button, { shape: 'plain', tone: 'danger', size: 'm', icon: 'x', label: formatLabel(labels.closeCard, { label: title }), onClick: onClose }) })] }));
};

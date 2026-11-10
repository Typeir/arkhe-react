/**
 * @fileoverview Button: text, icon, icon-only, toggle or link, one component.
 * Links render through the provider's link component.
 *
 * @module packages/react/src/Button
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, flag, partAttrs } from '@arkhe/core';
import { useArkhe } from './ArkheProvider.js';
import { Icon } from './Icon.js';
/**
 * Renders a button, or a link when `href` is set. A disabled link is a plain
 * anchor that keeps its text but loses its address, click and tab stop.
 *
 * @component
 * @param {ButtonProps} props - Component props.
 * @param {ReactNode} [props.children] - Visible text.
 * @param {ButtonVariant} [props.variant] - Visual weight.
 * @param {string} [props.icon] - Lucide name of a leading icon.
 * @param {string} [props.label] - Accessible name.
 * @param {'square' | 'rhombus'} [props.shape] - Icon-only outline.
 * @param {boolean} [props.pressed] - Toggle state.
 * @param {string} [props.href] - Link address.
 * @param {boolean} [props.disabled] - Blocks interaction.
 * @param {'button' | 'submit' | 'reset'} [props.type] - Button type.
 * @param {MouseEventHandler<HTMLElement>} [props.onClick] - Click handler.
 * @returns {JSX.Element} Button or link.
 */
export const Button = ({ children, variant = 'default', icon, label, shape, pressed, href, disabled, type = 'button', onClick, }) => {
    const { link: Link } = useArkhe();
    const shared = {
        className: ARKHE_CLASS,
        ...partAttrs('button', 'root'),
        'data-variant': variant,
        'data-icon-only': flag(children === undefined),
        'data-shape': shape,
        'aria-label': label,
        'aria-pressed': pressed,
        onClick,
    };
    const content = (_jsxs(_Fragment, { children: [icon ? _jsx(Icon, { name: icon }) : null, children] }));
    if (href !== undefined && disabled) {
        return (_jsx("a", { ...shared, onClick: undefined, "aria-disabled": true, tabIndex: -1, children: content }));
    }
    if (href !== undefined) {
        return (_jsx(Link, { ...shared, href: href, children: content }));
    }
    return (_jsx("button", { ...shared, type: type, disabled: disabled, children: content }));
};

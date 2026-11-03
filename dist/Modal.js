/**
 * @fileoverview Modal on Zag's dialog machine. Stays mounted once hydrated;
 * the `hidden` attribute plus CSS transitions animate entry and exit, so no
 * presence machine is needed.
 *
 * @module packages/react/src/Modal
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ARKHE_CLASS, FocusReturn, dialogMachineProps, hideShadowSiblings, } from '@arkhe/core';
import * as dialog from '@zag-js/dialog';
import { Portal, mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import { useEffect, useId, useRef, useState, useSyncExternalStore, } from 'react';
import { useArkhe } from './ArkheProvider.js';
import { useArkheEnvironment } from './ArkheEnvironment.js';
import { Icon } from './Icon.js';
import { usePortalContainer } from './usePortalContainer.js';
/**
 * Store subscription that never fires: hydration state only flips once.
 *
 * @function subscribeNever
 * @returns {() => void} No-op unsubscribe.
 */
function subscribeNever() {
    return () => undefined;
}
/**
 * Renders a modal dialog. The portal mounts after hydration so server HTML
 * matches the client; Zag stays closed until then, or its focus trap and
 * title check would run before the content exists.
 *
 * @component
 * @param {ModalProps} props - Title, open state, body.
 * @returns {JSX.Element} Trigger and portal.
 */
export const Modal = ({ title, description, trigger, open, defaultOpen, onOpenChange, role, finalFocus, children, }) => {
    const { labels } = useArkhe();
    const env = useArkheEnvironment();
    const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);
    const [inner, setInner] = useState(defaultOpen ?? false);
    const [focusReturn] = useState(() => new FocusReturn());
    useEffect(() => focusReturn.watch(env.getRootNode()), [focusReturn, env]);
    const change = (next) => {
        setInner(next);
        onOpenChange?.(next);
    };
    const service = useMachine(dialog.machine, dialogMachineProps({
        id: useId(),
        open: open ?? inner,
        ready: hydrated,
        role,
        onOpenChange: change,
        finalFocus,
        focusReturn,
        getRootNode: env.getRootNode,
    }));
    const api = dialog.connect(service, normalizeProps);
    const container = usePortalContainer();
    const content = useRef(null);
    useEffect(() => {
        if (!api.open || !content.current)
            return undefined;
        return hideShadowSiblings(content.current);
    }, [api.open]);
    return (_jsxs(_Fragment, { children: [trigger === undefined ? null : (_jsx("button", { ...mergeProps(api.getTriggerProps(), { className: ARKHE_CLASS }), children: trigger })), hydrated ? (_jsx(Portal, { container: container, getRootNode: env.getRootNode, children: _jsxs("div", { className: ARKHE_CLASS, children: [_jsx("div", { ...api.getBackdropProps() }), _jsx("div", { ...api.getPositionerProps(), children: _jsxs("div", { ref: content, ...api.getContentProps(), "aria-describedby": description === undefined
                                    ? undefined
                                    : api.getDescriptionProps().id, children: [_jsxs("header", { "data-scope": 'dialog', "data-part": 'header', children: [_jsx("h2", { ...api.getTitleProps(), children: title }), _jsx("button", { ...api.getCloseTriggerProps(), "aria-label": labels.close, children: _jsx(Icon, { name: 'x' }) })] }), _jsxs("div", { "data-scope": 'dialog', "data-part": 'body', children: [description === undefined ? null : (_jsx("p", { ...api.getDescriptionProps(), children: description })), children] })] }) })] }) })) : null] }));
};

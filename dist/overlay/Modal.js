/**
 * @fileoverview Modal on Zag's dialog machine. Stays mounted once hydrated;
 * the `hidden` attribute plus CSS transitions animate entry and exit, so no
 * presence machine is needed.
 *
 * @module packages/react/src/overlay/Modal
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ARKHE_CLASS, dialogMachineProps, flag, FocusReturn, hideShadowSiblings, partAttrs, watchCloseRequest, } from '@arkhe/core';
import * as dialog from '@zag-js/dialog';
import { mergeProps, normalizeProps, Portal, useMachine } from '@zag-js/react';
import { useEffect, useEffectEvent, useId, useRef, useState, } from 'react';
import { useArkheEnvironment } from '../base/ArkheEnvironment.js';
import { useArkhe } from '../base/ArkheProvider.js';
import { Icon } from '../base/Icon.js';
import { useControllable } from '../base/useControllable.js';
import { useHydrated } from '../base/useHydrated.js';
import { usePortalContainer } from '../base/usePortalContainer.js';
/**
 * Renders a modal dialog, centred or as a bottom sheet. The portal mounts after hydration so server HTML
 * matches the client; Zag stays closed until then, or its focus trap and
 * title check would run before the content exists.
 *
 * @component
 * @param {ModalProps} props - Title, open state, body.
 * @returns {JSX.Element} Trigger and portal.
 */
export const Modal = ({ title, description, trigger, open, defaultOpen, onOpenChange, role, initialFocus, finalFocus, sheet, children, }) => {
    const { labels } = useArkhe();
    const env = useArkheEnvironment();
    const hydrated = useHydrated();
    const { current: shown, commit } = useControllable({
        value: open,
        defaultValue: defaultOpen ?? false,
        onChange: onOpenChange,
    });
    const [focusReturn] = useState(() => new FocusReturn());
    useEffect(() => focusReturn.watch(env.getRootNode()), [focusReturn, env]);
    const id = useId();
    const service = useMachine(dialog.machine, dialogMachineProps({
        id,
        open: shown,
        ready: hydrated,
        role,
        onOpenChange: commit,
        initialFocus,
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
    const requestClose = useEffectEvent(() => {
        api.setOpen(false);
    });
    useEffect(() => {
        if (!api.open)
            return undefined;
        return watchCloseRequest(env.getRootNode(), requestClose);
    }, [api.open, env]);
    return (_jsxs(_Fragment, { children: [trigger === undefined ? null : (_jsx("button", { ...mergeProps(api.getTriggerProps(), { className: ARKHE_CLASS }), children: trigger })), hydrated ? (_jsx(Portal, { container: container, getRootNode: env.getRootNode, children: _jsxs("div", { className: ARKHE_CLASS, children: [_jsx("div", { ...api.getBackdropProps() }), _jsx("div", { ...api.getPositionerProps(), "data-sheet": flag(sheet), children: _jsxs("div", { ref: content, ...api.getContentProps(), "data-sheet": flag(sheet), "aria-describedby": description === undefined
                                    ? undefined
                                    : api.getDescriptionProps().id, children: [_jsxs("div", { ...partAttrs('dialog', 'header'), children: [_jsx("h2", { ...api.getTitleProps(), children: title }), _jsx("button", { ...api.getCloseTriggerProps(), "aria-label": labels.close, children: _jsx(Icon, { name: 'x' }) })] }), _jsxs("div", { ...partAttrs('dialog', 'body'), children: [description === undefined ? null : (_jsx("p", { ...api.getDescriptionProps(), children: description })), children] })] }) })] }) })) : null] }));
};

/**
 * @fileoverview Combobox: a text input that filters a list of options, on
 * Zag's combobox machine. Serves three jobs: a searchable select, a picker
 * that adds the chosen option elsewhere and empties itself, and a search box
 * whose host supplies results and takes free text on Enter.
 *
 * @module packages/react/src/Combobox
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, REACT_EVENTS, comboboxMachineProps, filterOptions, guardComboboxKeys, isGrouped, optionCollection, partAttrs, queryAfterChange, slug, } from '@arkhe/core';
import * as combobox from '@zag-js/combobox';
import { Portal, mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import { useId, useMemo, useState } from 'react';
import { useArkhe } from './ArkheProvider.js';
import { useArkheEnvironment } from './ArkheEnvironment.js';
import { Icon } from './Icon.js';
import { Status } from './Status.js';
import { useHydrated } from './useHydrated.js';
import { usePortalContainer } from './usePortalContainer.js';
/**
 * Renders the default option body: label, then a muted description.
 *
 * @function defaultItem
 * @param {ComboboxOption} item - Option.
 * @returns {ReactNode} Body.
 */
function defaultItem(item) {
    return (_jsxs(_Fragment, { children: [_jsx("span", { "data-scope": 'combobox', "data-part": 'item-label', children: item.label }), item.description ? (_jsx("span", { "data-scope": 'combobox', "data-part": 'item-description', children: item.description })) : null] }));
}
/**
 * Renders a labelled combobox and its portalled option list.
 *
 * @component
 * @param {ComboboxProps<T>} props - Label, options, selection, search hooks.
 * @returns {JSX.Element} Combobox.
 */
export const Combobox = (props) => {
    const { label, items, filter, loading, renderItem = defaultItem } = props;
    const { labels, locale } = useArkhe();
    const env = useArkheEnvironment();
    const container = usePortalContainer();
    const hydrated = useHydrated();
    const [query, setQuery] = useState('');
    const shown = useMemo(() => filterOptions(items, query, filter), [items, query, filter]);
    const collection = useMemo(() => combobox.collection(optionCollection(shown)), [shown]);
    const note = Boolean(loading) || shown.length === 0;
    const service = useMachine(combobox.machine, {
        ...comboboxMachineProps({
            ...props,
            id: useId(),
            labels,
            locale,
            submits: props.onSubmit !== undefined,
            getRootNode: env.getRootNode,
        }),
        collection,
        onInputValueChange: (details) => {
            setQuery(queryAfterChange(details));
            props.onInputChange?.(details.inputValue);
        },
        onValueChange: (details) => props.onValueChange?.(details.value[0] ?? null),
        onSelect: (details) => {
            const item = items.find((option) => option.value === details.itemValue);
            if (item)
                props.onSelect?.(item);
        },
    });
    const api = combobox.connect(service, normalizeProps);
    const option = (item) => (_jsx("div", { ...api.getItemProps({ item }), children: renderItem(item) }, item.value));
    return (_jsxs("div", { ...mergeProps(api.getRootProps(), { className: ARKHE_CLASS }), children: [_jsx("label", { ...api.getLabelProps(), children: label }), _jsxs("div", { ...api.getControlProps(), children: [_jsx("input", { ...guardComboboxKeys(api.getInputProps(), {
                            highlighted: () => api.highlightedValue,
                            inputValue: () => api.inputValue,
                            select: (value) => api.selectValue(value),
                            close: () => api.setOpen(false),
                            submit: props.onSubmit,
                        }, REACT_EVENTS) }), _jsx("button", { ...api.getClearTriggerProps(), children: _jsx(Icon, { name: 'x' }) }), _jsx("button", { ...api.getTriggerProps(), children: _jsx(Icon, { name: 'chevron-down' }) })] }), hydrated ? (_jsx(Portal, { container: container, getRootNode: env.getRootNode, children: _jsx("div", { className: ARKHE_CLASS, children: _jsxs("div", { ...api.getPositionerProps(), children: [note ? (_jsx("div", { ...partAttrs('combobox', 'note'), hidden: !api.open, children: loading ? (_jsx(Status, { kind: 'loading' })) : (_jsx("div", { ...partAttrs('combobox', 'empty'), children: labels.comboboxEmpty })) })) : null, _jsx("div", { ...mergeProps(api.getContentProps(), {
                                    hidden: note || !api.open,
                                }), children: note
                                    ? null
                                    : isGrouped(shown)
                                        ? collection.group().map(([group, members]) => (_jsxs("div", { ...api.getItemGroupProps({ id: slug(group) }), children: [_jsx("div", { ...api.getItemGroupLabelProps({
                                                        htmlFor: slug(group),
                                                    }), children: group }), members.map(option)] }, group)))
                                        : shown.map(option) })] }) }) })) : null] }));
};

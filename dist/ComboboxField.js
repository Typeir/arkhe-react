/**
 * @fileoverview ComboboxField: a text input that filters a list of options,
 * on Zag's combobox machine. Not exported: it is the body of the searchable
 * Select, of Picker and of Search.
 *
 * @module packages/react/src/ComboboxField
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, REACT_EVENTS, EMPTY_VALUE, comboboxMachineProps, fieldDescribedBy, fieldIds, flag, fromEmptyValue, filterOptions, guardComboboxKeys, isGrouped, optionCollection, queryAfterChange, toEmptyValue, withEmptyOption, } from '@arkhe/core';
import * as combobox from '@zag-js/combobox';
import { Portal, mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import { useId, useMemo, useState } from 'react';
import { useArkhe } from './ArkheProvider.js';
import { useArkheEnvironment } from './ArkheEnvironment.js';
import { ComboboxList } from './ComboboxList.js';
import { FieldNote } from './FieldNote.js';
import { Icon } from './Icon.js';
import { useHydrated } from './useHydrated.js';
import { usePortalContainer } from './usePortalContainer.js';
import { useVirtualRows } from './useVirtualRows.js';
/**
 * Renders the default option body: icon, label, then a muted description.
 *
 * @function optionBody
 * @param {SelectOption} item - Option.
 * @param {'combobox' | 'select'} scope - Zag scope of the list.
 * @returns {ReactNode} Body.
 */
export function optionBody(item, scope) {
    return (_jsxs(_Fragment, { children: [item.icon ? _jsx(Icon, { name: item.icon }) : null, _jsx("span", { "data-scope": scope, "data-part": 'item-label', children: item.label }), item.description ? (_jsx("span", { "data-scope": scope, "data-part": 'item-description', children: item.description })) : null] }));
}
/**
 * Renders a labelled combobox and its portalled option list.
 *
 * @component
 * @param {ComboboxFieldProps<T>} props - Label, options, selection, search hooks.
 * @returns {JSX.Element} Combobox.
 */
export const ComboboxField = (props) => {
    const { label, filter, loading, failed, emptyLabel } = props;
    const items = useMemo(() => withEmptyOption(props.items, emptyLabel), [props.items, emptyLabel]);
    const renderItem = props.renderItem ?? ((item) => optionBody(item, 'combobox'));
    const { labels, locale } = useArkhe();
    const env = useArkheEnvironment();
    const container = usePortalContainer();
    const hydrated = useHydrated();
    const [query, setQuery] = useState('');
    const shown = useMemo(() => filterOptions(items, query, filter), [items, query, filter]);
    const collection = useMemo(() => combobox.collection(optionCollection(shown)), [shown]);
    const { attach, ...rows } = useVirtualRows(shown.length, isGrouped(shown) ? undefined : props.rowPitch);
    const note = loading
        ? 'loading'
        : failed
            ? 'failed'
            : shown.length === 0
                ? 'empty'
                : undefined;
    const id = useId();
    const ids = fieldIds(id);
    const service = useMachine(combobox.machine, {
        ...comboboxMachineProps({
            ...props,
            id,
            invalid: Boolean(props.error),
            labels,
            locale,
            value: toEmptyValue(props.value, emptyLabel),
            defaultValue: toEmptyValue(props.defaultValue ?? null, emptyLabel),
            submits: props.onSubmit !== undefined,
            getRootNode: env.getRootNode,
        }),
        ...(props.inline && !props.clearOnSelect
            ? { selectionBehavior: 'preserve' }
            : {}),
        ...(rows.on ? { scrollToIndexFn: rows.scrollTo } : {}),
        collection,
        onInputValueChange: (details) => {
            setQuery(queryAfterChange(details));
            props.onInputChange?.(details.inputValue);
            if (details.reason === 'input-change')
                props.onQuery?.(details.inputValue);
        },
        onValueChange: (details) => props.onValueChange?.(fromEmptyValue(details.value[0] ?? null)),
        onSelect: (details) => {
            const item = items.find((option) => option.value === details.itemValue);
            if (item)
                props.onSelect?.(item);
        },
    });
    const api = combobox.connect(service, normalizeProps);
    const focusInline = () => {
        api.setInputValue('');
        api.setOpen(true);
    };
    const option = (item, index) => (_jsx("div", { ...api.getItemProps({ item }), ...rows.position(index), children: item.value === EMPTY_VALUE && emptyLabel !== undefined
            ? optionBody(item, 'combobox')
            : renderItem(item) }, item.value));
    const list = (_jsx(ComboboxList, { api: api, collection: collection, shown: shown, note: note, emptyText: labels.selectEmpty, option: option, inline: props.inline, rows: rows, attach: attach }));
    return (_jsxs("div", { ...mergeProps(api.getRootProps(), { className: ARKHE_CLASS }), "data-size": props.size, "data-label-hidden": flag(props.labelHidden), children: [_jsx("label", { ...api.getLabelProps(), children: label }), _jsxs("div", { ...api.getControlProps(), children: [_jsx("input", { ...mergeProps(guardComboboxKeys(api.getInputProps(), {
                            highlighted: () => api.highlightedValue,
                            inputValue: () => api.inputValue,
                            select: (value) => api.selectValue(value),
                            close: () => api.setOpen(false),
                            submit: props.onSubmit,
                        }, REACT_EVENTS), props.inline ? { onFocus: focusInline } : {}, {
                            enterKeyHint: props.enterKeyHint,
                            'aria-describedby': fieldDescribedBy(ids, props.hint, props.error),
                        }) }), _jsx("button", { ...api.getClearTriggerProps(), children: _jsx(Icon, { name: 'x' }) }), props.inline ? null : (_jsx("button", { ...api.getTriggerProps(), children: _jsx(Icon, { name: 'chevron-down' }) }))] }), _jsx(FieldNote, { ids: ids, hint: props.hint, error: props.error }), props.name === undefined ? null : (_jsx("input", { type: 'hidden', name: props.name, value: fromEmptyValue(api.value[0] ?? null) ?? '' })), props.inline ? (list) : hydrated ? (_jsx(Portal, { container: container, getRootNode: env.getRootNode, children: _jsx("div", { className: ARKHE_CLASS, children: _jsx("div", { ...api.getPositionerProps(), children: list }) }) })) : null] }));
};

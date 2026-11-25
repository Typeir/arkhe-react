/**
 * @fileoverview ComboboxField: a text input that filters a list of options,
 * on Zag's combobox machine. Not exported: it is the body of the searchable
 * Select, of Picker and of Search.
 *
 * @module packages/react/src/select/ComboboxField
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, comboboxMachineProps, EMPTY_VALUE, fieldDescribedBy, fieldIds, filterOptions, flag, fromEmptyValue, guardComboboxKeys, isGrouped, listNote, optionCollection, queryAfterChange, REACT_EVENTS, toEmptyValue, withEmptyOption, } from '@arkhe/core';
import * as combobox from '@zag-js/combobox';
import { mergeProps, normalizeProps, Portal, useMachine } from '@zag-js/react';
import { useId, useMemo, useState } from 'react';
import { useArkheEnvironment } from '../base/ArkheEnvironment.js';
import { useArkhe } from '../base/ArkheProvider.js';
import { Icon } from '../base/Icon.js';
import { useHydrated } from '../base/useHydrated.js';
import { usePortalContainer } from '../base/usePortalContainer.js';
import { FieldNote } from '../field/FieldNote.js';
import { useVirtualRows } from '../list/useVirtualRows.js';
import { ComboboxList } from './ComboboxList.js';
import { optionBody } from './optionBody.js';
/**
 * Renders a labelled combobox and its portalled option list.
 *
 * @component
 * @param {ComboboxFieldProps<T>} props - Label, options, selection, search hooks.
 * @returns {JSX.Element} Combobox.
 */
export const ComboboxField = ({ label, items: options, placeholder, value, defaultValue, onValueChange, onSelect, clearOnSelect, onInputChange, onQuery, filter, loading, failed, stale, onSubmit, renderItem = (item) => optionBody(item, 'combobox'), disabled, placement, emptyLabel, size, labelHidden, inline, name, hint, error, enterKeyHint, required, rowPitch, }) => {
    const items = useMemo(() => withEmptyOption(options, emptyLabel), [options, emptyLabel]);
    const { labels, locale } = useArkhe();
    const env = useArkheEnvironment();
    const container = usePortalContainer();
    const hydrated = useHydrated();
    const [query, setQuery] = useState('');
    const shown = useMemo(() => filterOptions(items, query, filter), [items, query, filter]);
    const collection = useMemo(() => combobox.collection(optionCollection(shown)), [shown]);
    const { attach, ...rows } = useVirtualRows(shown.length, isGrouped(shown) ? undefined : rowPitch);
    const note = listNote(loading, failed, shown.length);
    const id = useId();
    const ids = fieldIds(id);
    const service = useMachine(combobox.machine, {
        ...comboboxMachineProps({
            id,
            label,
            labels,
            locale,
            value: toEmptyValue(value, emptyLabel),
            defaultValue: toEmptyValue(defaultValue ?? null, emptyLabel),
            clearOnSelect,
            submits: onSubmit !== undefined,
            loading,
            disabled,
            required,
            invalid: Boolean(error),
            placeholder,
            placement,
            getRootNode: env.getRootNode,
        }),
        ...(inline && !clearOnSelect
            ? { selectionBehavior: 'preserve' }
            : {}),
        ...(rows.on ? { scrollToIndexFn: rows.scrollTo } : {}),
        collection,
        onInputValueChange: (details) => {
            setQuery(queryAfterChange(details));
            onInputChange?.(details.inputValue);
            if (details.reason === 'input-change')
                onQuery?.(details.inputValue);
        },
        onValueChange: (details) => onValueChange?.(fromEmptyValue(details.value[0] ?? null)),
        onSelect: (details) => {
            const item = items.find((option) => option.value === details.itemValue);
            if (item)
                onSelect?.(item);
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
    const list = (_jsx(ComboboxList, { api: api, collection: collection, shown: shown, note: note, emptyText: labels.selectEmpty, option: option, inline: inline, rows: rows, attach: attach, stale: stale }));
    return (_jsxs("div", { ...mergeProps(api.getRootProps(), { className: ARKHE_CLASS }), "data-size": size, "data-label-hidden": flag(labelHidden), children: [_jsx("label", { ...api.getLabelProps(), children: label }), _jsxs("div", { ...api.getControlProps(), children: [_jsx("input", { ...mergeProps(guardComboboxKeys(api.getInputProps(), {
                            highlighted: () => api.highlightedValue,
                            inputValue: () => api.inputValue,
                            select: (next) => {
                                api.selectValue(next);
                            },
                            close: () => {
                                api.setOpen(false);
                            },
                            submit: onSubmit,
                        }, REACT_EVENTS), inline ? { onFocus: focusInline } : {}, {
                            enterKeyHint,
                            'aria-describedby': fieldDescribedBy(ids, hint, error),
                        }) }), _jsx("button", { ...api.getClearTriggerProps(), children: _jsx(Icon, { name: 'x' }) }), inline ? null : (_jsx("button", { ...api.getTriggerProps(), children: _jsx(Icon, { name: 'chevron-down' }) }))] }), _jsx(FieldNote, { ids: ids, hint: hint, error: error }), name === undefined ? null : (_jsx("input", { type: 'hidden', name: name, value: fromEmptyValue(api.value[0] ?? null) ?? '' })), inline ? list : null, inline || !hydrated ? null : (_jsx(Portal, { container: container, getRootNode: env.getRootNode, children: _jsx("div", { className: ARKHE_CLASS, children: _jsx("div", { ...api.getPositionerProps(), children: list }) }) }))] }));
};

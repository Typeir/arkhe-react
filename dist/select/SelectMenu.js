/**
 * @fileoverview SelectMenu: a button that opens a list of options, on Zag's
 * select machine. Not exported: it is the body of Select when not
 * searchable. A hidden native select mirrors the value for forms; with
 * virtual rows it holds only the chosen option.
 *
 * @module packages/react/src/select/SelectMenu
 * @version 1.0.0
 * @author Typeir
 * @since 0.2.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, EMPTY_VALUE, fieldDescribedBy, fieldIds, flag, fromEmptyValue, isGrouped, optionCollection, selectMachineProps, slug, toEmptyValue, uniqueByValue, withEmptyOption, } from '@arkhe/core';
import { mergeProps, normalizeProps, Portal, useMachine } from '@zag-js/react';
import * as select from '@zag-js/select';
import { useId, useMemo } from 'react';
import { useArkheEnvironment } from '../base/ArkheEnvironment.js';
import { useArkhe } from '../base/ArkheProvider.js';
import { Icon } from '../base/Icon.js';
import { useHydrated } from '../base/useHydrated.js';
import { usePortalContainer } from '../base/usePortalContainer.js';
import { FieldNote } from '../field/FieldNote.js';
import { useVirtualRows } from '../list/useVirtualRows.js';
import { optionBody } from './optionBody.js';
/**
 * Renders a labelled select button and its portalled option list.
 *
 * @component
 * @param {SelectMenuProps<T>} props - Label, options, selection.
 * @returns {JSX.Element} Select.
 */
export const SelectMenu = ({ label, items, placeholder, value, defaultValue, onValueChange, renderItem = (item) => optionBody(item, 'select'), name, required, autoComplete, disabled, placement, emptyLabel, size, labelHidden, hint, error, rowPitch, }) => {
    const { labels } = useArkhe();
    const env = useArkheEnvironment();
    const container = usePortalContainer();
    const hydrated = useHydrated();
    const shown = useMemo(() => uniqueByValue(withEmptyOption(items, emptyLabel)), [items, emptyLabel]);
    const collection = useMemo(() => select.collection(optionCollection(shown)), [shown]);
    const { attach, ...rows } = useVirtualRows(shown.length, isGrouped(shown) ? undefined : rowPitch);
    const id = useId();
    const ids = fieldIds(id);
    const service = useMachine(select.machine, {
        ...selectMachineProps({
            id,
            label,
            labels,
            value: toEmptyValue(value, emptyLabel),
            defaultValue: toEmptyValue(defaultValue ?? null, emptyLabel),
            name,
            required,
            invalid: Boolean(error),
            autoComplete,
            disabled,
            placement,
            getRootNode: env.getRootNode,
        }),
        ...(rows.on ? { scrollToIndexFn: rows.scrollTo } : {}),
        collection,
        onValueChange: (details) => onValueChange?.(fromEmptyValue(details.value[0] ?? null)),
    });
    const api = select.connect(service, normalizeProps);
    const option = (item, index) => (_jsx("div", { ...api.getItemProps({ item }), ...rows.position(index), children: item.value === EMPTY_VALUE && emptyLabel !== undefined
            ? optionBody(item, 'select')
            : renderItem(item) }, item.value));
    const options = () => {
        if (rows.on) {
            return shown
                .slice(rows.range.start, rows.range.end)
                .map((item, at) => option(item, rows.range.start + at));
        }
        if (!isGrouped(shown))
            return shown.map(option);
        return collection.group().map(([group, members]) => (_jsxs("div", { ...api.getItemGroupProps({ id: slug(group) }), children: [_jsx("div", { ...api.getItemGroupLabelProps({ htmlFor: slug(group) }), children: group }), members.map(option)] }, group)));
    };
    return (_jsxs("div", { ...mergeProps(api.getRootProps(), { className: ARKHE_CLASS }), "data-size": size, "data-label-hidden": flag(labelHidden), children: [_jsx("label", { ...api.getLabelProps(), children: label }), _jsx("div", { ...api.getControlProps(), children: _jsxs("button", { ...api.getTriggerProps(), "aria-describedby": fieldDescribedBy(ids, hint, error), children: [_jsx("span", { ...api.getValueTextProps(), children: api.valueAsString || placeholder }), _jsx("span", { ...api.getIndicatorProps(), children: _jsx(Icon, { name: 'chevron-down' }) })] }) }), _jsx(FieldNote, { ids: ids, hint: hint, error: error }), _jsxs("select", { ...api.getHiddenSelectProps(), children: [_jsx("option", { value: '', children: emptyLabel }), shown
                        .filter((item) => item.value !== EMPTY_VALUE &&
                        (!rows.on || api.value.includes(item.value)))
                        .map((item) => (_jsx("option", { value: item.value, disabled: item.disabled, children: item.label }, item.value)))] }), hydrated ? (_jsx(Portal, { container: container, getRootNode: env.getRootNode, children: _jsx("div", { className: ARKHE_CLASS, children: _jsx("div", { ...api.getPositionerProps(), children: _jsx("div", { ...api.getContentProps(), ref: attach, style: rows.vars, "data-virtual": flag(rows.on), children: options() }) }) }) })) : null] }));
};

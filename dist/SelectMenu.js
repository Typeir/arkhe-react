/**
 * @fileoverview SelectMenu: a button that opens a list of options, on Zag's
 * select machine. Not exported: it is the body of Select when not
 * searchable. A hidden native select mirrors the value for forms; with
 * virtual rows it holds only the chosen option.
 *
 * @module packages/react/src/SelectMenu
 * @version 1.0.0
 * @author Typeir
 * @since 0.2.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ARKHE_CLASS, EMPTY_VALUE, fieldDescribedBy, fieldIds, flag, fromEmptyValue, isGrouped, optionCollection, selectMachineProps, slug, toEmptyValue, uniqueByValue, withEmptyOption, } from '@arkhe/core';
import { Portal, mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as select from '@zag-js/select';
import { useId, useMemo } from 'react';
import { useArkhe } from './ArkheProvider.js';
import { useArkheEnvironment } from './ArkheEnvironment.js';
import { optionBody } from './ComboboxField.js';
import { FieldNote } from './FieldNote.js';
import { Icon } from './Icon.js';
import { useHydrated } from './useHydrated.js';
import { usePortalContainer } from './usePortalContainer.js';
import { useVirtualRows } from './useVirtualRows.js';
/**
 * Renders a labelled select button and its portalled option list.
 *
 * @component
 * @param {SelectMenuProps<T>} props - Label, options, selection.
 * @returns {JSX.Element} Select.
 */
export const SelectMenu = (props) => {
    const { label, items, placeholder, emptyLabel } = props;
    const renderItem = props.renderItem ?? ((item) => optionBody(item, 'select'));
    const { labels } = useArkhe();
    const env = useArkheEnvironment();
    const container = usePortalContainer();
    const hydrated = useHydrated();
    const shown = useMemo(() => uniqueByValue(withEmptyOption(items, emptyLabel)), [items, emptyLabel]);
    const collection = useMemo(() => select.collection(optionCollection(shown)), [shown]);
    const { attach, ...rows } = useVirtualRows(shown.length, isGrouped(shown) ? undefined : props.rowPitch);
    const id = useId();
    const ids = fieldIds(id);
    const service = useMachine(select.machine, {
        ...selectMachineProps({
            ...props,
            id,
            invalid: Boolean(props.error),
            labels,
            value: toEmptyValue(props.value, emptyLabel),
            defaultValue: toEmptyValue(props.defaultValue ?? null, emptyLabel),
            getRootNode: env.getRootNode,
        }),
        ...(rows.on ? { scrollToIndexFn: rows.scrollTo } : {}),
        collection,
        onValueChange: (details) => props.onValueChange?.(fromEmptyValue(details.value[0] ?? null)),
    });
    const api = select.connect(service, normalizeProps);
    const option = (item, index) => (_jsx("div", { ...api.getItemProps({ item }), ...rows.position(index), children: item.value === EMPTY_VALUE && emptyLabel !== undefined
            ? optionBody(item, 'select')
            : renderItem(item) }, item.value));
    return (_jsxs("div", { ...mergeProps(api.getRootProps(), { className: ARKHE_CLASS }), "data-size": props.size, "data-label-hidden": flag(props.labelHidden), children: [_jsx("label", { ...api.getLabelProps(), children: label }), _jsx("div", { ...api.getControlProps(), children: _jsxs("button", { ...api.getTriggerProps(), "aria-describedby": fieldDescribedBy(ids, props.hint, props.error), children: [_jsx("span", { ...api.getValueTextProps(), children: api.valueAsString || placeholder }), _jsx("span", { ...api.getIndicatorProps(), children: _jsx(Icon, { name: 'chevron-down' }) })] }) }), _jsx(FieldNote, { ids: ids, hint: props.hint, error: props.error }), _jsxs("select", { ...api.getHiddenSelectProps(), children: [_jsx("option", { value: '', children: emptyLabel }), shown
                        .filter((item) => item.value !== EMPTY_VALUE &&
                        (!rows.on || api.value.includes(item.value)))
                        .map((item) => (_jsx("option", { value: item.value, disabled: item.disabled, children: item.label }, item.value)))] }), hydrated ? (_jsx(Portal, { container: container, getRootNode: env.getRootNode, children: _jsx("div", { className: ARKHE_CLASS, children: _jsx("div", { ...api.getPositionerProps(), children: _jsx("div", { ...api.getContentProps(), ref: attach, style: rows.vars, "data-virtual": flag(rows.on), children: rows.on
                                ? shown
                                    .slice(rows.range.start, rows.range.end)
                                    .map((item, at) => option(item, rows.range.start + at))
                                : isGrouped(shown)
                                    ? collection.group().map(([group, members]) => (_jsxs("div", { ...api.getItemGroupProps({ id: slug(group) }), children: [_jsx("div", { ...api.getItemGroupLabelProps({
                                                    htmlFor: slug(group),
                                                }), children: group }), members.map(option)] }, group)))
                                    : shown.map(option) }) }) }) })) : null] }));
};

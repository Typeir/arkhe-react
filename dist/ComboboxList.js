/**
 * @fileoverview ComboboxList: the option list of ComboboxField, or the line
 * that stands in for it while results load, fail or are empty. Not
 * exported. It renders in the floating dropdown, or inline in a sheet.
 *
 * @module packages/react/src/ComboboxList
 * @version 1.0.0
 * @author Typeir
 * @since 0.2.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { flag, isGrouped, partAttrs, slug, } from '@arkhe/core';
import { mergeProps } from '@zag-js/react';
import { Status } from './Status.js';
/**
 * Renders the note line, then the listbox with grouped or flat options.
 *
 * @component
 * @param {ComboboxListProps<T>} props - API, options, note.
 * @returns {JSX.Element} Note and listbox.
 */
export const ComboboxList = ({ api, collection, shown, note, emptyText, option, inline, rows, attach, }) => {
    const open = inline || api.open;
    return (_jsxs(_Fragment, { children: [note ? (_jsx("div", { ...partAttrs('combobox', 'note'), "data-inline": flag(inline), hidden: !open, children: note === 'loading' ? (_jsx(Status, { kind: 'loading' })) : note === 'failed' ? (_jsx(Status, { kind: 'error' })) : (_jsx("div", { ...partAttrs('combobox', 'empty'), children: emptyText })) })) : null, _jsx("div", { ...mergeProps(api.getContentProps(), { hidden: !!note || !open }), ref: attach, style: rows.vars, "data-virtual": flag(rows.on), "data-inline": flag(inline), children: note
                    ? null
                    : rows.on
                        ? shown
                            .slice(rows.range.start, rows.range.end)
                            .map((item, at) => option(item, rows.range.start + at))
                        : isGrouped(shown)
                            ? collection.group().map(([group, members]) => (_jsxs("div", { ...api.getItemGroupProps({ id: slug(group) }), children: [_jsx("div", { ...api.getItemGroupLabelProps({ htmlFor: slug(group) }), children: group }), members.map(option)] }, group)))
                            : shown.map(option) })] }));
};

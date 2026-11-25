/**
 * @fileoverview ComboboxList: the option list of ComboboxField, or the line
 * that stands in for it while results load, fail or are empty. Not
 * exported. It renders in the floating dropdown, or inline in a sheet.
 *
 * @module packages/react/src/select/ComboboxList
 * @version 1.0.0
 * @author Typeir
 * @since 0.2.0
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { flag, isGrouped, partAttrs, slug, } from '@arkhe/core';
import { mergeProps } from '@zag-js/react';
import { Status } from '../feedback/Status.js';
/**
 * Renders the line that stands in for the options.
 *
 * @function noteBody
 * @param {ListNote} note - Which line.
 * @param {string} emptyText - Text of the empty line.
 * @returns {ReactNode} Line.
 */
function noteBody(note, emptyText) {
    if (note === 'loading')
        return _jsx(Status, { kind: 'loading' });
    if (note === 'failed')
        return _jsx(Status, { kind: 'error' });
    return _jsx("div", { ...partAttrs('combobox', 'empty'), children: emptyText });
}
/**
 * Renders the note line, then the listbox with grouped or flat options.
 *
 * @component
 * @param {ComboboxListProps<T>} props - API, options, note.
 * @returns {JSX.Element} Note and listbox.
 */
export const ComboboxList = ({ api, collection, shown, note, emptyText, option, inline, rows, attach, stale, }) => {
    const open = inline || api.open;
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
    return (_jsxs(_Fragment, { children: [note ? (_jsx("div", { ...partAttrs('combobox', 'note'), "data-inline": flag(inline), hidden: !open, children: noteBody(note, emptyText) })) : null, _jsx("div", { ...mergeProps(api.getContentProps(), {
                    hidden: Boolean(note) || !open,
                }), ref: attach, style: rows.vars, "data-virtual": flag(rows.on), "data-inline": flag(inline), "data-stale": flag(stale), "aria-busy": stale || undefined, children: note ? null : options() })] }));
};

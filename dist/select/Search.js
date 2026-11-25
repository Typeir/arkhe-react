/**
 * @fileoverview Search: a text input whose host answers each query, grouped
 * when results name groups. Enter with nothing highlighted submits the text.
 * Nothing filters here: with `search`, each query runs the host's request
 * once typing pauses, aborting the one before, so the host filters where
 * the data lives; without it, the host answers `onInputChange` with
 * `items`. At phone width it opens a sheet that closes on a choice or a
 * submit. On Zag's combobox machine.
 *
 * @module packages/react/src/select/Search
 * @version 1.0.0
 * @author Typeir
 * @since 0.2.0
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ARKHE_CLASS, partAttrs, searchBusy, SearchRequest, } from '@arkhe/core';
import { useEffect, useState } from 'react';
import { useNarrow } from '../base/useNarrow.js';
import { ComboboxField } from './ComboboxField.js';
import { SheetField } from './SheetField.js';
/**
 * Renders a labelled search box over host-answered results.
 *
 * @component
 * @param {SearchProps<T>} props - Label, request or results, callbacks.
 * @returns {JSX.Element} Search.
 */
export const Search = ({ search, debounce, items = [], onInputChange, loading, ...rest }) => {
    const [state, setState] = useState({
        items: [],
        loading: false,
        failed: false,
    });
    const [request] = useState(() => new SearchRequest(setState, debounce));
    useEffect(() => () => {
        request.destroy();
    }, [request]);
    const narrow = useNarrow();
    const answered = search === undefined;
    const busy = answered
        ? searchBusy(Boolean(loading), items.length)
        : searchBusy(state.loading, state.items.length);
    const field = (close) => (_jsx(ComboboxField, { ...rest, items: answered ? items : state.items, loading: busy.loading, stale: busy.stale, failed: !answered && state.failed, filter: false, enterKeyHint: 'search', onInputChange: onInputChange, onQuery: (text) => {
            if (search)
                request.query(text, search);
        }, ...(close
            ? {
                labelHidden: true,
                hint: undefined,
                error: undefined,
                inline: true,
                onSelect: (item) => {
                    rest.onSelect?.(item);
                    close();
                },
                onSubmit: (text) => {
                    rest.onSubmit?.(text);
                    close();
                },
            }
            : {}) }));
    return (_jsx("search", { className: ARKHE_CLASS, ...partAttrs('search', 'root'), children: narrow ? (_jsx(SheetField, { label: rest.label, placeholder: rest.placeholder, size: rest.size, labelHidden: rest.labelHidden, disabled: rest.disabled, hint: rest.hint, error: rest.error, children: field })) : (field()) }));
};

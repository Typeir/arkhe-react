/**
 * @fileoverview Default body of an option in a select or combobox list:
 * icon, label, then a muted description. Not exported.
 *
 * @module packages/react/src/select/optionBody
 * @version 1.0.0
 * @author Typeir
 * @since 0.1.0
 */
import type { ReactNode } from 'react';
import { type SelectOption } from '@arkhe/core';
/**
 * Renders the default option body: icon, label, then a muted description.
 *
 * @function optionBody
 * @param {SelectOption} item - Option.
 * @param {'combobox' | 'select'} scope - Zag scope of the list.
 * @returns {ReactNode} Body.
 */
export declare function optionBody(item: SelectOption, scope: 'combobox' | 'select'): ReactNode;

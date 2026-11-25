/**
 * @fileoverview The ground a tab set's panels leave for tab sets inside
 * them, passed down by context so folder tabs alternate as they nest.
 *
 * @module packages/react/src/section/tabsGround
 * @version 1.0.0
 * @author Typeir
 * @since 0.4.0
 */
import { type TabsGround } from '@arkhe/core';
/**
 * Ground the nearest enclosing tab set leaves; the page's with none.
 *
 * @constant TabsGroundContext
 * @type {import('react').Context<TabsGround>}
 */
export declare const TabsGroundContext: import("react").Context<TabsGround>;

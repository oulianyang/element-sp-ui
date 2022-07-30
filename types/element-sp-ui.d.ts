import Vue, { PluginObject } from 'vue'
import { ElementSpUIComponent, ElementSpUIComponentSize, ElementSpUIHorizontalAlignment } from './component'

import { ElButton } from './button'
import { ElButtonGroup } from './button-group'
import { ElInput } from './input'
import { ElInputNumber } from './input-number'
import { ElIcon } from './icon'

export interface InstallationOptions {
  locale: any,
  i18n: any,
  size: string
}

/** The version of element-sp-ui */
export const version: string

/**
 * Install all element-sp-ui components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(ElementSpUI)` to install.
 */
export function install (vue: typeof Vue, options: InstallationOptions): void

/** ElementSpUI component common definition */
export type Component = ElementSpUIComponent

/** Component size definition for button, input, etc */
export type ComponentSize = ElementSpUIComponentSize

/** Horizontal alignment */
export type HorizontalAlignment = ElementSpUIHorizontalAlignment

/** Button Component */
export class Button extends ElButton {}

/** Button Group Component */
export class ButtonGroup extends ElButtonGroup {}

/** Input Component */
export class Input extends ElInput {}

/** Input Number Component */
export class InputNumber extends ElInputNumber {}

/** Icon Component */
export class Icon extends ElIcon {}
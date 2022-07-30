import Vue from 'vue'

/** ElementUI component common definition */
export declare class ElementSpUIComponent extends Vue {
  /** Install component into Vue */
  static install (vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type ElementSpUIComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type ElementSpUIHorizontalAlignment = 'left' | 'center' | 'right'

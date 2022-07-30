<!--
 * @Author: your name
 * @Date: 2022-03-18 14:36:44
 * @LastEditTime: 2022-03-18 16:01:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \element\packages\link\src\main.vue
-->
<template>
  <a
    :class="[
      'sp-link',
      type ? `sp-link--${type}` : '',
      disabled && 'is-disabled',
      underline && !disabled && 'is-underline',
      alwaysUnderline && 'is-always-underline'
    ]"
    :href="disabled ? null : href"
    v-bind="$attrs"
    @click="handleClick"
  >

    <i :class="icon" v-if="icon"></i>

    <span v-if="$slots.default" class="sp-link--inner">
      <slot></slot>
    </span>

    <template v-if="$slots.icon"><slot v-if="$slots.icon" name="icon"></slot></template>
  </a>
</template>

<script>

export default {
  name: 'ElLink',

  props: {
    type: {
      type: String,
      default: 'primary'
    },
    underline: {
      type: Boolean,
      default: false
    },
    alwaysUnderline: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    href: String,
    icon: String
  },

  methods: {
    handleClick(event) {
      if (!this.disabled) {
        if (!this.href) {
          this.$emit('click', event);
        }
      }
    }
  }
};
</script>

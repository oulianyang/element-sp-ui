<template functional>
  <div
    v-bind="data.attrs"
    v-on="listeners"
    :class="[
      data.staticClass,
      'sp-divider',
      (data.attrs && data.attrs.dashed !== undefined) || dashed
        ? 'is-dashed'
        : '',
      `sp-divider--${props.direction}`,
    ]"
  >
    <div
      v-if="slots().default && props.direction !== 'vertical'"
      :class="['sp-divider__text', `is-${props.contentPosition}`]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
// dashed 传props 传不过来，原因不知道
export default {
  name: 'ElDivider',

  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    },
    contentPosition: {
      type: String,
      default: 'center',
      validator(val) {
        return ['left', 'center', 'right'].indexOf(val) !== -1;
      }
    }
  }
};
</script>

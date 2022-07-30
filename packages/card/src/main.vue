<template>
  <div class="sp-card" :class="[shadow ? 'is-' + shadow + '-shadow' : 'is-never-shadow', { 'is-header-border': headerBorder }]">
    <div class="sp-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="sp-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ElCard',
    props: {
      header: {},
      headerBorder: {
        type: Boolean,
        default: false
      },
      bodyStyle: {},
      shadow: {
        type: String
      }
    }
  };
</script>

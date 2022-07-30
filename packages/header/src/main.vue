<template>
  <header class="sp-header" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
  export default {
    name: 'ElHeader',

    componentName: 'ElHeader',

    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>

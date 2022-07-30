<template>
  <div :class="['sp-skeleton__item', `sp-skeleton__${variant}`]">
    <img-placeholder v-if="variant === 'image'" />
  </div>
</template>

<script>
  import ImgPlaceholder from './img-placeholder';

  export default {
    name: 'ElSkeletonItem',
    props: {
      variant: {
        type: String,
        default: 'text'
      }
    },
    components: {
      [ImgPlaceholder.name]: ImgPlaceholder
    }
  };
</script>
<template>
  <div class="sp-page-header" :level="level">
    <div class="sp-page-header__left">
      <!-- <i v-if="'back' in $listeners" class="sp-icon-back" @click="$emit('back')"></i> -->
      <div class="sp-page-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div v-if="content||'content' in $slots" class="sp-page-header__content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script>
import Locale from '../../../src/mixins/locale';

export default {
  name: 'ElPageHeader',

  props: {
    title: {
      type: String,
      default() {
        return Locale.methods.t('el.pageHeader.title');
      }
    },
    level: {
      type: [Number, String],
      default: 1
    },
    content: String
  }
};
</script>

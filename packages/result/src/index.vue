<template>
  <div class="sp-result">
    <div class="sp-result__icon">
      <slot name="icon">
        <i :class="`${iconElement.i} sp-result--icon ${iconElement.c}`" />
      </slot>
    </div>
    <div v-if="title || $slots.title" class="sp-result__title">
      <slot name="title">
        <p>{{ title }}</p>
      </slot>
    </div>
    <div v-if="subTitle || $slots.subTitle" class="sp-result__subtitle">
      <slot name="subTitle">
        <p>{{ subTitle }}</p>
      </slot>
    </div>
    <div v-if="$slots.extra" class="sp-result__extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>
<script>
import IconSuccess from './icon-success.vue';
import IconError from './icon-error.vue';
import IconWarning from './icon-warning.vue';
import IconInfo from './icon-info.vue';

const IconMap = {
  success: {
    i: 'sp-icon-check-circle-fill',
    c: 'sp-icon-success'
  },
  warning: {
    i: 'sp-icon-exclamation-circle-fill',
    c: 'sp-icon-warning'
  },
  error: {
    i: 'sp-icon-close-circle-fill',
    c: 'sp-icon-error'
  },
  info: {
    i: 'sp-icon-info-circle-fill',
    c: 'sp-icon-info'
  }
};

export default {
  name: 'ElResult',
  components: {
    [IconSuccess.name]: IconSuccess,
    [IconError.name]: IconError,
    [IconWarning.name]: IconWarning,
    [IconInfo.name]: IconInfo
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'info'
    }
  },
  computed: {
    iconElement() {
      const icon = this.icon;

      let iconItem = IconMap[icon || 'info'];
      if (!iconItem) {
        iconItem = IconMap['info'];
      }
      return iconItem;
    }
  }
};
</script>

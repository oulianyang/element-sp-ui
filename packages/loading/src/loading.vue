<template>
  <transition name="sp-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="sp-loading-mask"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div :class="['sp-loading-spinner', 'sp-loading-spinner__' + spinner, 'sp-loading-spinner__' + size]">
        <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
        <div v-else class="sp-loading-spinner-iwrap"><i :class="spinner"></i></div>
        <p v-if="text" class="sp-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        size: null,
        text: null,
        spinner: null,
        background: null,
        fullscreen: true,
        visible: false,
        customClass: ''
      };
    },

    methods: {
      handleAfterLeave() {
        this.$emit('after-leave');
      },
      setText(text) {
        this.text = text;
      }
    }
  };
</script>

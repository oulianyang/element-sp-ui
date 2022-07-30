<template>
  <transition name="sp-alert-fade">
    <div
      class="sp-alert"
      :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
      v-show="visible"
      role="alert"
    >
      <i class="sp-alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
      <div class="sp-alert__content"
      ><span class="sp-alert__title" :class="[ isBoldTitle ]" v-if="title || $slots.title"
        ><slot name="title">{{ title }}</slot>
        </span>
        <p class="sp-alert__description" v-if="$slots.default && !description"><slot></slot></p>
        <p class="sp-alert__description" v-if="description && !$slots.default">{{ description }}</p>
        <i class="sp-alert__closebtn" :class="{ 'is-customed': closeText !== '', 'sp-icon-close': closeText === '' }" v-show="closable" @click="close()">{{closeText}}</i>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  const TYPE_CLASSES_MAP = {
    'success': 'sp-icon-check-circle-fill',
    'warning': 'sp-icon-warning-circle-fill',
    'error': 'sp-icon-close-circle-fill'
  };
  export default {
    name: 'ElAlert',

    props: {
      title: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'info'
      },
      closable: {
        type: Boolean,
        default: true
      },
      closeText: {
        type: String,
        default: ''
      },
      showIcon: Boolean,
      center: Boolean,
      effect: {
        type: String,
        default: 'light',
        validator: function(value) {
          return ['light', 'dark'].indexOf(value) !== -1;
        }
      }
    },

    data() {
      return {
        visible: true
      };
    },

    methods: {
      close() {
        this.visible = false;
        this.$emit('close');
      }
    },

    computed: {
      typeClass() {
        return `sp-alert--${ this.type }`;
      },

      iconClass() {
        return TYPE_CLASSES_MAP[this.type] || 'sp-icon-info-circle-fill';
      },

      isBigIcon() {
        return this.description || this.$slots.default ? 'is-big' : '';
      },

      isBoldTitle() {
        return this.description || this.$slots.default ? 'is-bold' : '';
      }
    }
  };
</script>

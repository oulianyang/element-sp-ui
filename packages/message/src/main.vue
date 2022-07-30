<template>
  <transition name="sp-message-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        'sp-message',
        type && !iconClass ? `sp-message--${ type }` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass
      ]"
      :style="positionStyle"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      role="alert">
      <div class="sp-message__main">
        <i :class="iconClass" v-if="iconClass"></i>
        <i :class="typeClass" v-else></i>
        <slot>
          <p v-if="!dangerouslyUseHTMLString" class="sp-message__content">{{ message }}</p>
          <p v-else v-html="message" class="sp-message__content"></p>
        </slot>
        <i v-if="showClose" class="sp-message__closeBtn sp-icon-close" @click="close"></i>
      </div>
      <div v-if="description" class="sp-message__description">
        {{description}}
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  const typeMap = {
    success: 'check-circle-fill',
    info: 'info-circle-fill',
    warning: 'warning-circle-fill',
    error: 'close-circle-fill'
  };

  export default {
    data() {
      return {
        visible: false,
        message: '',
        duration: 5000,
        type: 'info',
        iconClass: '',
        customClass: '',
        onClose: null,
        showClose: false,
        closed: false,
        verticalOffset: 20,
        timer: null,
        dangerouslyUseHTMLString: false,
        center: false,
        description: ''
      };
    },

    computed: {
      typeClass() {
        return this.type && !this.iconClass
          ? `sp-message__icon sp-icon-${ typeMap[this.type] }`
          : '';
      },
      positionStyle() {
        return {
          'top': `${ this.verticalOffset }px`
        };
      }
    },

    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
        }
      }
    },

    methods: {
      handleAfterLeave() {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
      },

      clearTimer() {
        clearTimeout(this.timer);
      },

      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close();
            }
          }, this.duration);
        }
      },
      keydown(e) {
        if (e.keyCode === 27) { // esc关闭消息
          if (!this.closed) {
            this.close();
          }
        }
      }
    },
    mounted() {
      this.startTimer();
      document.addEventListener('keydown', this.keydown);
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keydown);
    }
  };
</script>

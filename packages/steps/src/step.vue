<template>
  <div
    class="sp-step"
    :style="style"
    :class="[
      !isSimple && `is-${$parent.direction}`,
      isSimple && 'is-simple',
      isSmall && 'is-small',
      isLast && !space && !isCenter && 'is-flex',
      isCenter && !isVertical && !isSimple && 'is-center',
    ]"
  >
    <!-- icon & line -->
    <div class="sp-step__head" :class="`is-${currentStatus}`">
      <div
        class="sp-step__line"
        :style="isLast ? '' : { marginRight: $parent.stepOffset + 'px' }"
      >
        <i class="sp-step__line-inner" :style="lineStyle"></i>
      </div>
      <div class="sp-step__icon" :class="[`is-${icon ? 'icon' : 'text'}`, `is-${currentStatus}`]">
        <slot
          v-if="currentStatus !== 'success' && currentStatus !== 'error'"
          name="icon"
        >
          <i v-if="icon" class="sp-step__icon-inner" :class="[icon]"></i>
          <i v-else-if="index < $parent.active" class="sp-step__icon-inner" :class="'sp-icon-check'"></i>
          <div class="sp-step__icon-inner" v-else-if="!icon && !isSimple">
            {{ index + 1 }}
          </div>
        </slot>
        <i
          v-else
          :class="[
            'sp-icon-' + (currentStatus === 'success' ? 'check' : 'close'),
          ]"
          class="sp-step__icon-inner is-status"
        >
        </i>
      </div>
      <div v-if="!isVertical || isSimple" class="sp-step__main"><div
        class="sp-step__line-wrap"><div
            class="sp-step__title"
            ref="title"
            :class="['is-' + currentStatus]"
          >
            <slot name="title">{{ title }}</slot>
          </div>
          <div v-if="isSimple" class="sp-step__arrow"></div>
          <div
            class="sp-step__line"
            :style="isLast ? '' : { marginRight: $parent.stepOffset + 'px' }"
          >
            <i class="sp-step__line-inner" :style="lineStyle"></i>
          </div>
        </div>
        <div
          v-if="!isSimple" 
          class="sp-step__description"
          :class="['is-' + currentStatus]"
        >
          <slot name="description">{{ description }}</slot>
        </div>
      </div>
    </div>
    <!-- title & description -->
    <div v-if="isVertical && !isSimple" class="sp-step__main"><div 
      class="sp-step__title" ref="title" :class="['is-' + currentStatus]">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="isSimple" class="sp-step__arrow"></div>
      <div
        v-else
        class="sp-step__description"
        :class="['is-' + currentStatus]"
      >
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElStep',

  props: {
    title: String,
    icon: String,
    description: String,
    status: String
  },

  data() {
    return {
      index: -1,
      lineStyle: {},
      internalStatus: ''
    };
  },

  beforeCreate() {
    this.$parent.steps.push(this);
  },

  beforeDestroy() {
    const steps = this.$parent.steps;
    const index = steps.indexOf(this);
    if (index >= 0) {
      steps.splice(index, 1);
    }
  },

  computed: {
    currentStatus() {
      return this.status || this.internalStatus;
    },
    prevStatus() {
      const prevStep = this.$parent.steps[this.index - 1];
      return prevStep ? prevStep.currentStatus : 'wait';
    },
    isCenter() {
      return this.$parent.alignCenter;
    },
    isVertical() {
      return this.$parent.direction === 'vertical';
    },
    isSimple() {
      return this.$parent.simple;
    },
    isLast() {
      const parent = this.$parent;
      return parent.steps[parent.steps.length - 1] === this;
    },
    stepsCount() {
      return this.$parent.steps.length;
    },
    isSmall() {
      return this.$parent.size === 'small';
    },
    space() {
      const {
        isSimple,
        $parent: { space }
      } = this;
      return isSimple ? '' : space;
    },
    style: function() {
      const style = {};
      const parent = this.$parent;
      const len = parent.steps.length;

      const space =
        typeof this.space === 'number'
          ? this.space + 'px'
          : this.space
            ? this.space
            : 100 / (len - (this.isCenter ? 0 : 1)) + '%';
      style.flexBasis = space;
      if (this.isVertical) return style;
      if (this.isLast) {
        style.maxWidth = 100 / this.stepsCount + '%';
      } else {
        style.marginRight = -this.$parent.stepOffset + 'px';
      }

      return style;
    }
  },

  methods: {
    updateStatus(val) {
      const prevChild = this.$parent.$children[this.index - 1];

      if (val > this.index) {
        this.internalStatus = this.$parent.finishStatus;
      } else if (val === this.index && this.prevStatus !== 'error') {
        this.internalStatus = this.$parent.processStatus;
      } else {
        this.internalStatus = 'wait';
      }

      if (prevChild) prevChild.calcProgress(this.internalStatus);
    },

    calcProgress(status) {
      let step = 100;
      const style = {};
      style.transitionDelay = 150 * this.index + 'ms';
      if (status === this.$parent.processStatus) {
        // step = this.currentStatus !== 'error' ? 100 : 100;
      } else if (status === 'wait') {
        step = 0;
        style.transitionDelay = -150 * this.index + 'ms';
      }
      if (step && !this.isSimple && this.isVertical) {
        style.borderLeftWidth = '1px';
      } else if (step && !this.isSimple && !this.isVertical) {
        style.borderTopWidth = '1px';
      } else {
        style.borderWidth = 0;
      }
      this.$parent.direction === 'vertical'
        ? (style.height = step + '%')
        : (style.width = step + '%');

      this.lineStyle = style;
    }
  },

  mounted() {
    const unwatch = this.$watch('index', (val) => {
      this.$watch('$parent.active', this.updateStatus, { immediate: true });
      this.$watch(
        '$parent.processStatus',
        () => {
          const activeIndex = this.$parent.active;
          this.updateStatus(activeIndex);
        },
        { immediate: true }
      );
      unwatch();
    });
  }
};
</script>

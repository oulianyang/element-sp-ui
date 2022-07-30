<template>
  <div
    class="sp-rate"
    @keydown="handleKey"
    role="slider"
    :aria-valuenow="currentValue"
    :aria-valuetext="text"
    aria-valuemin="0"
    :aria-valuemax="max"
    tabindex="0"
    :class="size === 'big' ? 'sp-rate-big' : ''"
    >
    <span
      v-for="(item, key) in max"
      class="sp-rate__item"
      @mousemove="setCurrentValue(item, $event)"
      @mouseleave="resetCurrentValue"
      @click="selectValue(item)"
      :style="{ cursor: rateDisabled ? 'auto' : 'pointer' }"
      :key="key">
      <el-tooltip :disabled="(!showText && !showScore) || !showTip" placement="top" :content="text">
        <i
        :class="[classes[item - 1], { 'hover': hoverIndex === item }]"
        class="sp-rate__icon"
        :style="getIconStyle(item)">
        <i
          v-if="showDecimalIcon(item)"
          :class="decimalIconClass"
          :style="decimalStyle"
          class="sp-rate__decimal">
        </i>
      </i>
      </el-tooltip>
    </span>
    <span v-if="(showText || showScore) && (!showTip)" class="sp-rate__text" :style="{ color: textColor }">{{ text }}</span>
  </div>
</template>

<script>
  import ElTooltip from '@fe/element-sp-ui/packages/tooltip';
  import { hasClass } from '@fe/element-sp-ui/src/utils/dom';
  import { isObject } from '@fe/element-sp-ui/src/utils/types';
  import Migrating from '@fe/element-sp-ui/src/mixins/migrating';

  export default {
    name: 'ElRate',

    components: {
      ElTooltip
    },

    mixins: [Migrating],

    inject: {
      elForm: {
        default: ''
      }
    },

    data() {
      return {
        pointerAtLeftHalf: true,
        currentValue: this.value,
        hoverIndex: -1
      };
    },

    props: {
      size: String,
      value: {
        type: Number,
        default: 0
      },
      lowThreshold: {
        type: Number,
        default: 2
      },
      highThreshold: {
        type: Number,
        default: 4
      },
      max: {
        type: Number,
        default: 5
      },
      colors: {
        type: [Array, Object],
        default() {
          return ['#F0BF18', '#F0BF18', '#F0BF18'];
        }
      },
      voidColor: {
        type: String,
        default: '#d9d9d9'
      },
      disabledVoidColor: {
        type: String,
        default: '#d9d9d9'
      },
      iconClasses: {
        type: [Array, Object],
        default() {
          return ['sp-icon-star-fill', 'sp-icon-star-fill', 'sp-icon-star-fill'];
        }
      },
      voidIconClass: {
        type: String,
        default: 'sp-icon-star-fill'
      },
      disabledVoidIconClass: {
        type: String,
        default: 'sp-icon-star-fill'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      allowHalf: {
        type: Boolean,
        default: false
      },
      showText: {
        type: Boolean,
        default: false
      },
      showScore: {
        type: Boolean,
        default: false
      },
      textColor: {
        type: String,
        default: '#1f2d3d'
      },
      texts: {
        type: Array,
        default() {
          return ['极差', '失望', '一般', '满意', '惊喜'];
        }
      },
      scoreTemplate: {
        type: String,
        default: '{value}'
      },
      showTip: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      text() {
        let result = '';
        if (this.showScore) {
          result = this.scoreTemplate.replace(/\{\s*value\s*\}/, this.rateDisabled
            ? this.value
            : this.currentValue);
        } else if (this.showText) {
          result = this.texts[Math.ceil(this.currentValue) - 1];
        }
        return result;
      },

      decimalStyle() {
        let width = '';
        if (this.rateDisabled) {
          width = `${ this.valueDecimal }%`;
        } else if (this.allowHalf) {
          width = '50%';
        }
        return {
          color: this.activeColor,
          width
        };
      },

      valueDecimal() {
        return this.value * 100 - Math.floor(this.value) * 100;
      },

      classMap() {
        return Array.isArray(this.iconClasses)
          ? {
            [this.lowThreshold]: this.iconClasses[0],
            [this.highThreshold]: { value: this.iconClasses[1], excluded: true },
            [this.max]: this.iconClasses[2]
          } : this.iconClasses;
      },

      decimalIconClass() {
        return this.getValueFromMap(this.value, this.classMap);
      },

      voidClass() {
        return this.rateDisabled ? this.disabledVoidIconClass : this.voidIconClass;
      },

      activeClass() {
        return this.getValueFromMap(this.currentValue, this.classMap);
      },

      colorMap() {
        return Array.isArray(this.colors)
          ? {
            [this.lowThreshold]: this.colors[0],
            [this.highThreshold]: { value: this.colors[1], excluded: true },
            [this.max]: this.colors[2]
          } : this.colors;
      },

      activeColor() {
        return this.getValueFromMap(this.currentValue, this.colorMap);
      },

      classes() {
        let result = [];
        let i = 0;
        let threshold = this.currentValue;
        if (this.allowHalf && this.currentValue !== Math.floor(this.currentValue)) {
          threshold--;
        }
        for (; i < threshold; i++) {
          result.push(this.activeClass);
        }
        for (; i < this.max; i++) {
          result.push(this.voidClass);
        }
        return result;
      },

      rateDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      }
    },

    watch: {
      value(val) {
        this.currentValue = val;
        this.pointerAtLeftHalf = this.value !== Math.floor(this.value);
      }
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'text-template': 'text-template is renamed to score-template.'
          }
        };
      },

      getValueFromMap(value, map) {
        const matchedKeys = Object.keys(map)
          .filter(key => {
            const val = map[key];
            const excluded = isObject(val) ? val.excluded : false;
            return excluded ? value < key : value <= key;
          })
          .sort((a, b) => a - b);
        const matchedValue = map[matchedKeys[0]];
        return isObject(matchedValue) ? matchedValue.value : (matchedValue || '');
      },

      showDecimalIcon(item) {
        let showWhenDisabled = this.rateDisabled && this.valueDecimal > 0 && item - 1 < this.value && item > this.value;
        /* istanbul ignore next */
        let showWhenAllowHalf = this.allowHalf &&
          this.pointerAtLeftHalf &&
          item - 0.5 <= this.currentValue &&
          item > this.currentValue;
        return showWhenDisabled || showWhenAllowHalf;
      },

      getIconStyle(item) {
        const voidColor = this.rateDisabled ? this.disabledVoidColor : this.voidColor;
        return {
          color: item <= this.currentValue ? this.activeColor : voidColor
        };
      },

      selectValue(value) {
        if (this.rateDisabled) {
          return;
        }
        if (this.allowHalf && this.pointerAtLeftHalf) {
          this.$emit('input', this.currentValue);
          this.$emit('change', this.currentValue);
        } else {
          this.$emit('input', value);
          this.$emit('change', value);
        }
      },

      handleKey(e) {
        if (this.rateDisabled) {
          return;
        }
        let currentValue = this.currentValue;
        const keyCode = e.keyCode;
        if (keyCode === 38 || keyCode === 39) { // left / down
          if (this.allowHalf) {
            currentValue += 0.5;
          } else {
            currentValue += 1;
          }
          e.stopPropagation();
          e.preventDefault();
        } else if (keyCode === 37 || keyCode === 40) {
          if (this.allowHalf) {
            currentValue -= 0.5;
          } else {
            currentValue -= 1;
          }
          e.stopPropagation();
          e.preventDefault();
        }
        currentValue = currentValue < 0 ? 0 : currentValue;
        currentValue = currentValue > this.max ? this.max : currentValue;

        this.$emit('input', currentValue);
        this.$emit('change', currentValue);
      },

      setCurrentValue(value, event) {
        if (this.rateDisabled) {
          return;
        }
        /* istanbul ignore if */
        if (this.allowHalf) {
          let target = event.target;
          if (hasClass(target, 'sp-rate__item')) {
            target = target.querySelector('.sp-rate__icon');
          }
          if (hasClass(target, 'sp-rate__decimal')) {
            target = target.parentNode;
          }
          this.pointerAtLeftHalf = event.offsetX * 2 <= target.clientWidth;
          this.currentValue = this.pointerAtLeftHalf ? value - 0.5 : value;
        } else {
          this.currentValue = value;
        }
        this.hoverIndex = value;
      },

      resetCurrentValue() {
        if (this.rateDisabled) {
          return;
        }
        if (this.allowHalf) {
          this.pointerAtLeftHalf = this.value !== Math.floor(this.value);
        }
        this.currentValue = this.value;
        this.hoverIndex = -1;
      }
    },

    created() {
      if (!this.value) {
        this.$emit('input', 0);
      }
    }
  };
</script>

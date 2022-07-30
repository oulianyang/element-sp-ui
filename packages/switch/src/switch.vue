<template>
  <div
    class="sp-switch"
    :class="{ 'is-disabled': switchDisabled, 'is-checked': checked, 'sp-switch-small': size === 'small' }"
    role="switch"
    :aria-checked="checked"
    :aria-disabled="switchDisabled"
    @click.prevent="switchValue"
  >
    <input
      class="sp-switch__input"
      type="checkbox"
      @change="handleChange"
      ref="input"
      :id="id"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="switchDisabled"
      @keydown.enter="switchValue"
    />
    <span
      :class="[
        'sp-switch__label',
        'sp-switch__label--left',
        !checked ? 'is-active' : '',
      ]"
      v-if="inactiveIconClass || inactiveText"
    >
      <i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText" :aria-hidden="checked">{{
        inactiveText
      }}</span>
    </span>
    <!-- 选中字段 未选中字段 有值 宽度设置失效 -->
    <span
      class="sp-switch__core"
      ref="core"
      :style="{ width: checkedChildren || unCheckedChildren ? 'auto' : coreWidth + 'px' }"
    >
      <!-- <span class="sp-switch-inner" v-html="checked ? checkedChildren : unCheckedChildren">{{checked ? checkedChildren : unCheckedChildren}}</span> -->
      <span class="sp-switch-inner" v-html="checked ? checkedChildren : unCheckedChildren"></span>
    </span>
    <span
      :class="[
        'sp-switch__label',
        'sp-switch__label--right',
        checked ? 'is-active' : '',
      ]"
      v-if="activeIconClass || activeText"
    >
      <i :class="[activeIconClass]" v-if="activeIconClass"></i>
      <span v-if="!activeIconClass && activeText" :aria-hidden="!checked">{{
        activeText
      }}</span>
    </span>
  </div>
</template>
<script>
import emitter from '@fe/element-sp-ui/src/mixins/emitter';
import Migrating from '@fe/element-sp-ui/src/mixins/migrating';
import Focus from '@fe/element-sp-ui/src/mixins/focus';

export default {
  name: 'ElSwitch',
  mixins: [Focus('input'), Migrating, emitter],
  inject: {
    elForm: {
      default: ''
    }
  },
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: ''
    },
    activeIconClass: {
      type: String,
      default: ''
    },
    inactiveIconClass: {
      type: String,
      default: ''
    },
    activeText: String,
    inactiveText: String,
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    id: String,
    // 新增选中按钮的字段
    checkedChildren: String,
    // 新增未选中字段
    unCheckedChildren: String,
    // 新增控制按钮大小 default small
    size: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      coreWidth: this.width
    };
  },
  created() {
    if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
      this.$emit('input', this.inactiveValue);
    }
  },
  computed: {
    checked() {
      return this.value === this.activeValue;
    },
    switchDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },
  watch: {
    checked() {
      this.$refs.input.checked = this.checked;
      if (this.activeColor || this.inactiveColor) {
        this.setBackgroundColor();
      }
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [this.value]);
      }
    }
  },
  methods: {
    handleChange(event) {
      const val = this.checked ? this.inactiveValue : this.activeValue;
      // 值改变新增返回选中的中文字
      this.$emit('input', val, this.checked ? this.unCheckedChildren : this.checkedChildren);
      this.$emit('change', val, this.checked ? this.unCheckedChildren : this.checkedChildren);
      this.$nextTick(() => {
        // set input's checked property
        // in case parent refuses to change component's value
        if (this.$refs.input) {
          this.$refs.input.checked = this.checked;
        }
      });
    },
    setBackgroundColor() {
      let newColor = this.checked ? this.activeColor : this.inactiveColor;
      this.$refs.core.style.borderColor = newColor;
      this.$refs.core.style.backgroundColor = newColor;
    },
    switchValue() {
      !this.switchDisabled && this.handleChange();
    },
    getMigratingConfig() {
      return {
        props: {
          'on-color': 'on-color is renamed to active-color.',
          'off-color': 'off-color is renamed to inactive-color.',
          'on-text': 'on-text is renamed to active-text.',
          'off-text': 'off-text is renamed to inactive-text.',
          'on-value': 'on-value is renamed to active-value.',
          'off-value': 'off-value is renamed to inactive-value.',
          'on-icon-class': 'on-icon-class is renamed to active-icon-class.',
          'off-icon-class': 'off-icon-class is renamed to inactive-icon-class.'
        }
      };
    }
  },
  mounted() {
    /* istanbul ignore if */
    this.coreWidth = this.width || 'auto';
    if (this.activeColor || this.inactiveColor) {
      this.setBackgroundColor();
    }
    this.$refs.input.checked = this.checked;
  }
};
</script>

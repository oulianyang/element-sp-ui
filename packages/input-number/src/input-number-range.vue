<script>
import { get } from 'lodash';
import { isEmpty, isEqual } from '@fe/element-sp-ui/src/utils/util';
import inputNumber from '@fe/element-sp-ui/packages/input-number';
export default {
  name: 'ElInputNumberRange',
  props: {
    childConfig: {
      type: [Object, Array],
      default() {
        return {};
      }
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    disabled: Boolean,
    size: String,
    placeholder: String,
    value: {
      type: [Array, Object],
      default() {
        return {};
      }
    },
    checkLimit: { // 是否验证区间输入
      type: Boolean,
      default: false
    },
    separateText: {
      type: String,
      default: '至'
    }
  },
  components: {
    inputNumber
  },
  data() {
    return {
      currentValue: [0, 0],
      inputDefaultProps: {
        controls: false
      }
    };
  },
  computed: {
    childInputProps() {
      let inputProps1 = {
        ...this.inputDefaultProps,
        ...this._childProps[0],
        disabled: this.inputNumberRangeDisabled[0],
        size: this.inputNumberRangeSize,
        value: this.currentValue[0]
      };
      let inputProps2 = {
        ...this.inputDefaultProps,
        ...this._childProps[1],
        disabled: this.inputNumberRangeDisabled[1],
        size: this.inputNumberRangeSize,
        value: this.currentValue[1]
      };

      this._inputLimit.max && (inputProps1.max = this._inputLimit.max);
      this._inputLimit.min && (inputProps2.min = this._inputLimit.min);

      return [inputProps1, inputProps2];
    },
    _childProps() {
      let childConfig = this.childConfig;
      let isObjct = Object.prototype.toString.call(childConfig).toLowerCase() === '[object object]';
      if (isObjct) {
        return [childConfig.props, childConfig.props];
      } else {
        return [(childConfig[0] || {}).props, (childConfig[1] || {}).props];
      }
    },
    _inputLimit(config) {
      if (!this.checkLimit) { return {}; } // 不验证区间直接返回
      let currentValue = this.currentValue;
      let limitConfig = {};
      if (currentValue[0] !== undefined && currentValue[0] > config.min) {
        limitConfig.min = currentValue[0];
      }
      if (currentValue[1] !== undefined && currentValue[0] < config.max) {
        limitConfig.max = currentValue[1];
      }
      return limitConfig;
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    inputNumberRangeSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputNumberRangeDisabled() {
      let disabledArray = [
        !!get(this._childProps, '[0].disabled') || this.disabled || !!(this.elForm || {}).disabled,
        !!get(this._childProps, '[1].disabled') || this.disabled || !!(this.elForm || {}).disabled
      ];
      disabledArray[2] = disabledArray[0] && disabledArray[1];
      return disabledArray;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.currentValue = value || {};
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    changeValue() {
      this.$emit('change', this.currentValue);
    },
    inputValue(event, index) {
      if (event === this.currentValue[index]) {
        return;
      };
      let forceFlg = false; // 越界强制更新标识
      // 大小区间验证
      if (index === 0 && !isEmpty(this.currentValue[1])) {
        forceFlg = true;
        event > this.currentValue[1] && (event = this.currentValue[1]);
      } else if (!isEmpty(this.currentValue[0])) {
        forceFlg = true;
        event < this.currentValue[0] && (event = this.currentValue[0]);
      }
      let newValue = {...this.currentValue, [index]: event};

      this.setCurrentValue(newValue, forceFlg);
    },
    setCurrentValue(newVal, forceFlg) {
      if (!forceFlg && isEqual(this.currentValue, newVal)) {
        return;
      }
      this.$emit('input', newVal);
      this.currentValue = newVal;
    }
  },
  render() {
    let { $slots } = this;
    return (
      <div class={[
        'sp-input-number-range',
        this.inputNumberRangeSize ? 'sp-input-number-range--' + this.inputNumberRangeSize : '',
        { 'is-disabled': this.inputNumberRangeDisabled[2] },
        {
          'sp-input-number-range-group': $slots.prepend || $slots.append,
          'sp-input-number-range-group--append': $slots.append,
          'sp-input-number-range-group--prepend': $slots.prepend
        }
      ]}>
        {$slots.prepend &&
          // 前置元素
          (
            <div class="sp-input-number-range-group__prepend">
              {$slots.prepend}
            </div>
          )
        }
        <div class="sp-input-number-range__local">
          <input-number placeholder={get(this.childInputProps, '[0].placeholder') || this.placeholder} class="sp-input-number-range__local-child" {...{
            props: {
              ...this.props,
              ...this.childInputProps[0]
            },
            on: {
              ...this.$listeners,
              change: this.changeValue,
              input: ($event) => {
                this.inputValue($event, 0);
              }
            }
          }}
          ></input-number>
          <span class="sp-input-number-range__separate sp-input-number-range__local-child">{this.separateText}</span>
          <input-number placeholder={get(this.childInputProps, '[1].placeholder') || this.placeholder} class="sp-input-number-range__local-child" {...{
            props: {
              ...this.props,
              ...this.childInputProps[1]
            },
            on: {
              ...this.$listeners,
              change: this.changeValue,
              input: ($event) => {
                this.inputValue($event, 1);
              }
            }
          }}></input-number>
        </div>
        {
          $slots.append &&
          // 后置元素
          (
            <div class="sp-input-number-range-group__append">
              {$slots.append}
            </div>
          )
        }
      </div>
    );
  }
};
</script>

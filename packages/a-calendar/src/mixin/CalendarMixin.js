import { hasProp } from '../utils/props-util';
import moment from 'moment';
import { isAllowedDate, getTodayTime } from '../utils/vc-utils';
function noop() {}

export function getNowByCurrentStateValue(value) {
  let ret;
  if (value) {
    ret = getTodayTime(value);
  } else {
    ret = moment();
  }
  return ret;
}
const CalendarMixin = {
  name: 'CalendarMixinWrapper',
  props: {
    value: Object,
    defaultValue: Object
  },

  data() {
    const props = this.$props;
    const sValue = props.value || props.defaultValue || getNowByCurrentStateValue();
    return {
      sValue,
      sSelectedValue: props.selectedValue || props.defaultSelectedValue
    };
  },
  watch: {
    value(val) {
      const sValue = val || this.defaultValue || getNowByCurrentStateValue(this.sValue);
      this.sValue = sValue;
    },
    selectedValue(val) {
      this.sSelectedValue = val;
    }
  },
  methods: {
    onSelect(value, cause) {
      if (value) {
        this.setValue(value);
      }
      this.setSelectedValue(value, cause);
    },

    renderRoot(newProps) {
      const props = this.$props;
      const prefixCls = props.prefixCls;

      const className = {
        [prefixCls]: 1,
        [`${prefixCls}-hidden`]: !props.visible,
        // [props.className]: !!props.className,
        [newProps.class]: !!newProps.class
      };
      return (
        <div
          ref="rootInstance"
          class={className}
          tabIndex="0"
          onKeydown={this.onKeyDown || noop}
          onBlur={this.onBlur || noop}
        >
          {newProps.children}
        </div>
      );
    },

    setSelectedValue(selectedValue, cause) {
      // if (this.isAllowedDate(selectedValue)) {
      if (!hasProp(this, 'selectedValue')) {
        this.sSelectedValue = selectedValue;
      }
      this.__emit('select', selectedValue, cause);
      // }
    },

    setValue(value) {
      const originalValue = this.sValue;
      if (!hasProp(this, 'value')) {
        this.sValue = value;
      }
      if (
        (originalValue && value && !originalValue.isSame(value)) ||
        (!originalValue && value) ||
        (originalValue && !value)
      ) {
        this.__emit('change', value);
      }
    },

    isAllowedDate(value) {
      const disabledDate = this.disabledDate;
      const disabledTime = this.disabledTime;
      return isAllowedDate(value, disabledDate, disabledTime);
    }
  }
};

export default CalendarMixin;

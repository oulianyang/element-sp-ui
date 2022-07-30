<script>
/* eslint-disable */
import * as moment from 'moment';
import Header from './header/header.vue';
import { getOptionProps, hasProp, initDefaultProps, getListeners } from './utils/props-util';
import interopDefault from './utils/interopDefault';
import { checkValidate, stringToMoment, momentToString, TimeType } from './utils/moment-util';
import FullCalendar from './full-calendar.vue'

function noop() {
  return null;
}

function zerofixed(v) {
  if (v < 10) {
    return `0${v}`;
  }
  return `${v}`;
}

export default {
  name: 'ElACalendar',
  props: {
    value: [String, Object],
    defaultValue: [String, Object],
    mode: {
      type: String,
      default: 'month'
    },
    fullscreen: {
      type: Boolean,
      default: true
    },
    monthCellRender: {
      type: Function
    },
    monthFullCellRender: {
      type: Function
    },
    headerRender: {
      type: Function
    },
    headerRenderType: {
      type: String,
      default: 'panel', // panel | select
    },
    validRange: {
      type: Array,
    },
    valueFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    disabledDate: {
      type: Function
    }
  },
  components: {
    Header,
    FullCalendar
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  data() {
    const { value, defaultValue, valueFormat } = this;
    const sValue = value || defaultValue || interopDefault(moment)();
    checkValidate('Calendar', defaultValue, 'defaultValue', valueFormat);
    checkValidate('Calendar', value, 'value', valueFormat);
    this._sPrefixCls = 'sp-a-fullcalendar';
    return {
      sValue: stringToMoment(sValue, valueFormat),
      sMode: this.mode || 'month'
    };
  },
  computed: {

  },
  watch: {
    value(val) {
      checkValidate('Calendar', val, 'value', this.valueFormat);
      this.sValue = stringToMoment(val, this.valueFormat);
    },
    mode(val) {
      this.sMode = val;
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    onHeaderValueChange(value) {
      this.setValue(value, 'changePanel');
    },
    onHeaderTypeChange(mode) {
      this.sMode = mode;
      this.onPanelChange(this.sValue, mode);
    },
    onPanelChange(value, mode) {
      const val = this.valueFormat ? momentToString(value, this.valueFormat) : value;
      this.$emit('panelChange', val, mode);
      if (value !== this.sValue) {
        this.$emit('change', val);
      }
    },

    onSelect(value) {
      this.setValue(value, 'select');
    },
    setValue(value, way) {
      const prevValue = this.value ? stringToMoment(this.value, this.valueFormat) : this.sValue;
      const { sMode: mode, valueFormat } = this;
      if (!hasProp(this, 'value')) {
        this.sValue = value
      }
      if (way === 'select') {
        if (prevValue && prevValue.month() !== value.month()) {
          this.onPanelChange(value, mode);
        }
        this.$emit('select', valueFormat ? momentToString(value, valueFormat) : value);
      } else if (way === 'changePanel') {
        this.onPanelChange(value, mode);
      }
    },
    getDateRange(validRange, disabledDate) {
      return current => {
        if (!current) {
          return false;
        }
        const [startDate, endDate] = validRange;
        const inRange = !current.isBetween(startDate, endDate, 'days', '[]');
        if (disabledDate) {
          return disabledDate(current) || inRange;
        }
        return inRange;
      };
    },
    monthCellRender2(value) {
      const { _sPrefixCls, $scopedSlots } = this;
      const monthCellRender = this.monthCellRender || $scopedSlots.monthCellRender || noop;
      return (
        <div class={`${_sPrefixCls}-month`}>
          <div class={`${_sPrefixCls}-value`}>{value.localeData().monthsShort(value)}</div>
          <div class={`${_sPrefixCls}-content`}>{monthCellRender(value)}</div>
        </div>
      );
    },

    dateCellRender2(value) {
      const { _sPrefixCls, $scopedSlots } = this;
      const dateCellRender = this.dateCellRender || $scopedSlots.dateCellRender || noop;
      return (
        <div class={`${_sPrefixCls}-date`}>
          <div class={`${_sPrefixCls}-value`}>{zerofixed(value.date())}</div>
          <div class={`${_sPrefixCls}-content`}>{dateCellRender(value)}</div>
        </div>
      );
    }
  },
  render(h) {
    const props = getOptionProps(this);
    const { sValue: value, sMode: mode, $scopedSlots } = this;
    const {
      fullscreen,
      dateFullCellRender,
      monthFullCellRender
    } = props;
    const headerRender = this.headerRender || $scopedSlots.headerRender;

    const monthCellRender =
        monthFullCellRender || $scopedSlots.monthFullCellRender || this.monthCellRender2;
    const dateCellRender =
        dateFullCellRender || $scopedSlots.dateFullCellRender || this.dateCellRender2;

    let disabledDate = props.disabledDate;

    if (props.validRange) {
      disabledDate = this.getDateRange(props.validRange, disabledDate);
    }
    const fullCalendarProps = {
      props: {
        ...props,
        Select: {},
        type: mode === 'year' ? 'month' : 'date',
        prefixCls: this._sPrefixCls,
        showHeader: false,
        value,
        monthCellRender,
        dateCellRender,
        disabledDate
      },
      on: {
        ...getListeners(this),
        select: this.onSelect
      }
    };
    return (
      <div>
        <Header
          headerRenderType={this.headerRenderType}
          fullscreen={fullscreen}
          type={mode}
          headerRender={headerRender}
          value={value}
          prefixCls={this._sPrefixCls}
          onTypeChange={this.onHeaderTypeChange}
          onValueChange={this.onHeaderValueChange}
          validRange={props.validRange}
        />
        <FullCalendar {...fullCalendarProps} />
      </div>
    );
  }
};
</script>

<style scoped lang="scss">

</style>

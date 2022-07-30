<script>
/* eslint-disable */
import moment from 'moment';
import { getOptionProps, hasProp, getListeners } from './utils/props-util';
import BaseMixin from './mixin/BaseMixin';
import DateTable from './date/DateTable';
import MonthTable from './month/MonthTable';
import CalendarMixin, { getNowByCurrentStateValue } from './mixin/CalendarMixin';
import CommonMixin from './mixin/CommonMixin';
// import CalendarHeader from './CalendarHeader';
export default {
  name: 'ElAFullCalendar',
  props: {
    format: {
      type: [String, Array, Function]
    },
    visible: {
      type: Boolean,
      default: true
    },
    prefixCls: {
      default: 'sp-a-calendar'
    },
    defaultType: {
      type: String,
      default: 'date'
    },
    type: {
      type: String
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    monthCellRender: Function,
    dateCellRender: Function,
    showTypeSwitch: {
      type: Boolean,
      default: true
    },
    Select: {
      required: true
    },
    headerComponents: Array,
    headerComponent: Object, // The whole header component
    headerRender: Function,
    showHeader: {
      type: Boolean,
      default: true
    },
    disabledDate: Function,
    value: Object,
    defaultValue: Object,
    selectedValue: Object,
    defaultSelectedValue: Object,
    renderFooter: {
      type: Function,
      default: () => null
    },
    renderSidebar: {
      type: Function,
      default: () => null
    }
  },
  mixins: [BaseMixin, CommonMixin, CalendarMixin],
  components: {

  },
  data() {
    let type;
    if (hasProp(this, 'type')) {
      type = this.type;
    } else {
      type = this.defaultType;
    }
    const props = this.$props;
    return {
      sType: type,
      sValue: props.value || props.defaultValue || moment(),
      sSelectedValue: props.selectedValue || props.defaultSelectedValue
    };
  },
  computed: {

  },
  watch: {
    type(val) {
      this.sType = val;
    },
    value(val) {
      const sValue = val || this.defaultValue || getNowByCurrentStateValue(this.sValue);
      this.sValue = sValue;
    },
    selectedValue(val) {
      this.sSelectedValue = val;
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    onMonthSelect(value) {
      this.onSelect(value, {
        target: 'month'
      });
    },
    setType(type) {
      if (!hasProp(this, 'type')) {
        this.setState({
          sType: type
        });
      }
      this.__emit('typeChange', type);
    }
  },
  render() {
    const props = getOptionProps(this);
    const {
      locale,
      fullscreen,
      showHeader,
      headerComponent,
      headerRender,
      disabledDate,
    } = props;
    const { sValue: value, sType: type, prefixCls } = this;

    let header = null;
    if (showHeader) {
      if (headerRender) {
        header = headerRender(value, type, locale);
      } else {
        const TheHeader = headerComponent || CalendarHeader;
        const headerProps = {
          props: {
            ...props,
            prefixCls: `${prefixCls}-full`,
            type,
            value,
          },
          on: {
            ...getListeners(this),
            typeChange: this.setType,
            valueChange: this.setValue,
          },
          key: 'calendar-header',
        };
        header = <TheHeader {...headerProps} />;
      }
    }

    const table =
      type === 'date' ? (
        <DateTable
          dateRender={props.dateCellRender}
          contentRender={props.dateCellContentRender}
          prefixCls={prefixCls}
          onSelect={this.onSelect}
          value={value}
          disabledDate={disabledDate}
        />
      ) : (
        <MonthTable
          cellRender={props.monthCellRender}
          contentRender={props.monthCellContentRender}
          locale={locale}
          onSelect={this.onMonthSelect}
          prefixCls={`${prefixCls}-month-panel`}
          value={value}
          disabledDate={disabledDate}
        />
      );

    const children = [
      header,
      <div key="calendar-body" class={`${prefixCls}-calendar-body`}>
        {table}
      </div>,
    ];

    const className = [`${prefixCls}-full`];

    if (fullscreen) {
      className.push(`${prefixCls}-fullscreen`);
    }

    return this.renderRoot({
      children,
      class: className.join(' '),
    });
  }
};
</script>

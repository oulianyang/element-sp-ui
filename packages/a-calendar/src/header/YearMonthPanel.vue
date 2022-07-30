<script>
import Button from '@fe/element-sp-ui/packages/button';
import ButtonGroup from '@fe/element-sp-ui/packages/button-group';
import Locale from '@fe/element-sp-ui/src/mixins/locale';
import MonthTable from '@fe/element-sp-ui/packages/date-picker/src/basic/month-table';
import YearTable from '@fe/element-sp-ui/packages/date-picker/src/basic/year-table';
import YearTableHead from './YearTableHead';
export default {
  component: {
    MonthTable,
    YearTable,
    Button,
    ButtonGroup,
    YearTableHead
  },
  mixins: [Locale],
  props: {
    prefixCls: String,
    fullscreen: {
      type: Boolean
    },
    yearSelectOffset: {
      type: Number,
      default: 10
    },
    yearSelectTotal: {
      type: Number,
      default: 20
    },
    type: {
      type: String
    },
    // onValueChange: PropTypes.(value: moment.Moment) => void,
    // onTypeChange: PropTypes.(type: string) => void,
    value: {},
    validRange: {
      type: Array
    },
    headerRender: {
      tyep: Function
    },
    headerRenderType: {
      type: String
    }
  },
  data() {
    return {
      valueTemp: this.value ? this.value._d : new Date(),
      date: this.value ? this.value._d : new Date(),
      visiable: false,
      viewType: 'month'
    };
  },
  computed: {
    offsetValue() {
      let date = new Date(this.valueTemp);
      date.setFullYear(date.getFullYear() - 4);
      return date;
    }
  },
  methods: {
    setViewType(type) {
      this.viewType = type;
    },
    setValue(value) {
      this.valueTemp = value;
      this.date = value;
    },
    handlePickMonth(month) {
      this.$emit('pick', {
        type: 'month',
        value: month
      });
    },
    handlePickYear(year) {
      this.$emit('pick', {
        type: 'year',
        value: year
      });
    },
    changeDate(date) {
      this.date = date;
    }
  },
  render() {
    const { viewType, visiable } = this;
    return <div class={{
      'sp-a-fullcalendar--popperpanel': true,
      'is-hide': !visiable,
      'sp-popper': true
    }}>
      {
        visiable ? viewType === 'month' ? <MonthTable
          {...{
            props: {
              defaultValue: null,
              date: this.valueTemp,
              value: this.valueTemp
            },
            on: {
              'pick': this.handlePickMonth
            }
          }}
        /> : (<div>
          <YearTableHead {...{
            on: {
              'preYear': this.changeDate,
              'nextYear': this.changeDate
            }
          }} date={ this.date } />
          <YearTable
            {...{
              props: {
                defaultValue: null,
                // customerDate: this.offsetValue,
                value: this.valueTemp,
                date: this.date
              },
              on: {
                'pick': this.handlePickYear
              }
            }}
          />
        </div>) : null
      }
    </div>;
  }
};
</script>

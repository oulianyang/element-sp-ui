<script>
/* eslint-disable */
import Select from "@fe/element-sp-ui/packages/select";
import Button from "@fe/element-sp-ui/packages/button";
import ButtonGroup from "@fe/element-sp-ui/packages/button-group";
import Option from "@fe/element-sp-ui/packages/option";
import Locale from "@fe/element-sp-ui/src/mixins/locale";
import Popper from "@fe/element-sp-ui/src/utils/vue-popper";
import YearMonthPanelMixin from "./YearMonthPanelMixin";
  import Clickoutside from '@fe/element-sp-ui/src/utils/clickoutside';

export default {
  name: "ElACalendarHeader",
  props: {
    prefixCls: String,
    fullscreen: {
      type: Boolean,
    },
    yearSelectOffset: {
      type: Number,
      default: 10,
    },
    yearSelectTotal: {
      type: Number,
      default: 20,
    },
    type: {
      type: String,
    },
    // onValueChange: PropTypes.(value: moment.Moment) => void,
    // onTypeChange: PropTypes.(type: string) => void,
    value: {},
    validRange: {
      type: Array,
    },
    headerRender: {
      tyep: Function,
    },
    headerRenderType: {
      type: String
    },
    visibleArrow: {
      default: true
    },
    arrowOffset: {
      default: 0
    }
  },
  components: {
    Select,
    Button,
    ButtonGroup,
    Option,
  },
  mixins: [Locale, Popper, YearMonthPanelMixin],
  directives: {
    Clickoutside
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getYearSelectElement(year) {
      const {
        yearSelectOffset,
        yearSelectTotal,
        fullscreen,
        validRange,
      } = this;
      let start = year - yearSelectOffset;
      let end = start + yearSelectTotal;
      if (validRange) {
        start = validRange[0].get("year");
        end = validRange[1].get("year") + 1;
      }
      const suffix = this.t("el.acalendar.year");

      const options = [];
      for (let index = start; index < end; index++) {
        options.push(
          <Option
            key={`${index}`}
            {...{
              props: {
                value: String(index),
                label: `${index}${suffix}`,
              },
            }}
          />
        );
      }
      return (
        <Select
          style={{ width: "70px" }}
          size={fullscreen ? "default" : "small"}
          class={`${this.prefixCls}-year-select`}
          onChange={this.onYearChange}
          value={String(year)}
        >
          {options}
        </Select>
      );
    },

    getMonthSelectElement(month) {
      const { fullscreen, validRange, value } = this;
      const months = this.t2("el.acalendar.months");
      const options = [];
      let start = 0;
      let end = 12;
      if (validRange) {
        const [rangeStart, rangeEnd] = validRange;
        const currentYear = value.get("year");
        if (rangeEnd.get("year") === currentYear) {
          end = rangeEnd.get("month") + 1;
        }
        if (rangeStart.get("year") === currentYear) {
          start = rangeStart.get("month");
        }
      }
      for (let index = start; index < end; index++) {
        options.push(
          <Option
            key={`${index}`}
            {...{
              props: {
                value: String(index),
                label: months[index],
              },
            }}
          />
        );
      }

      return (
        <Select
          style={{ width: "70px" }}
          size={fullscreen ? "default" : "small"}
          dropdownMatchSelectWidth={false}
          class={`${this.prefixCls}-month-select`}
          value={String(month)}
          onChange={this.onMonthChange}
          getPopupContainer={() => this.getCalenderHeaderNode()}
        >
          {options}
        </Select>
      );
    },

    onYearChange(year) {
      const { value, validRange } = this;
      const newValue = value.clone();
      newValue.year(parseInt(year, 10));
      // switch the month so that it remains within range when year changes
      if (validRange) {
        const [start, end] = validRange;
        const newYear = newValue.get("year");
        const newMonth = newValue.get("month");
        if (newYear === end.get("year") && newMonth > end.get("month")) {
          newValue.month(end.get("month"));
        }
        if (newYear === start.get("year") && newMonth < start.get("month")) {
          newValue.month(start.get("month"));
        }
      }
      this.$emit("valueChange", newValue);
    },

    onMonthChange(month) {
      const newValue = this.value.clone();
      newValue.month(parseInt(month, 10));
      this.$emit("valueChange", newValue);
    },

    onInternalTypeChange(e) {
      this.onTypeChange(e.target.value);
    },

    onTypeChange(val) {
      this.$emit("typeChange", val);
    },

    getCalenderHeaderNode() {
      return this.$refs.calenderHeaderNode;
    },
    getMonthYearSelections() {
      const { type, value } = this.$props;
      const yearReactNode = this.getYearSelectElement(value.year());
      const monthReactNode =
        type === "month" ? this.getMonthSelectElement(value.month()) : null;

      return {
        yearReactNode,
        monthReactNode,
      };
    },

    getTypeSwitch() {
      const { type, fullscreen } = this.$props;
      const size = fullscreen ? "default" : "small";
      return (
        <ButtonGroup size={size}>
          <Button
            size={size}
            onClick={() => {
              this.onInternalTypeChange({
                target: {
                  value: "month",
                },
              });
            }}
            value="month"
          >
            {this.t("el.acalendar.month")}
          </Button>
          <Button
            size={size}
            onClick={() => {
              this.onInternalTypeChange({
                target: {
                  value: "year",
                },
              });
            }}
            value="year"
          >
            {this.t("el.acalendar.year")}
          </Button>
        </ButtonGroup>
      );
    },
    onValueChange() {
      this.$emit("valueChange", ...arguments);
    },
    headerRenderCustom(headerRender) {
      const { type, value } = this.$props;
      return headerRender({
        value,
        type: type || "month",
        onChange: this.onValueChange,
        onTypeChange: this.onTypeChange,
      });
    },
  },
  mounted() {
    setInterval(()=> {
      this.xx ++;
    }, 1000)
  },
  render() {
    const { headerRender, headerRenderType } = this;
    const typeSwitch = this.getTypeSwitch();
    const { yearReactNode, monthReactNode } = this.getMonthYearSelections();
    return headerRender ? (
      this.headerRenderCustom(headerRender)
    ) : (
      headerRenderType === 'panel' ? (this.getPanelHeader()) : (
        <div class={`${this.prefixCls}-header`} ref="calenderHeaderNode">
          {yearReactNode}
          {monthReactNode}
          {typeSwitch}
        </div>)
    );
  },
};
</script>

<style scoped lang="scss"></style>

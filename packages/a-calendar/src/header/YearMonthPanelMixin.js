import Vue from 'vue';
import { get } from 'lodash';
import YearMonthPanel from './YearMonthPanel';
import {
  prevYear,
  nextYear,
  prevMonth,
  nextMonth
} from '@fe/element-sp-ui/src/utils/date-util';
export default {
  component: {
    YearMonthPanel
  },
  data() {
    return {
      popperVisable: false,
      popperPanelType: 'month'
    };
  },
  watch: {
    popperVisable(val) {
      if (val) {
        this.showPanel();
      } else {
        this.hidenPanel();
      }
    },
    value(value) {
      if (value && value._d) {
        this.updatePopperPanelValue(value._d);
      }
    }
  },
  methods: {
    popperPrevMonth() {
      this.popperChangeMonth(prevMonth(this.value._d));
    },
    popperNextMonth() {
      this.popperChangeMonth(nextMonth(this.value._d));
    },

    popperPrevYear() {
      this.popperChangeYear(prevYear(this.value._d, 10));
    },
    popperNextYear() {
      this.popperChangeYear(nextYear(this.value._d, 10));
    },

    popperChangeMonth(date) {
      this.onMonthChange(date.getMonth());
      // this.updatePopperPanelValue(date);
    },
    popperChangeYear(date) {
      this.onYearChange(date.getFullYear());
      // this.updatePopperPanelValue(date);
    },

    updatePopperPanelValue(date) {
      if (get(this, 'panelPopTable.$refs.panel')) {
        this.panelPopTable.$refs.panel.setValue(date);
      }
    },
    popperOutsideClick() {
      this.popperVisable = false;
    },

    popperSwitch(type) {
      if (type === 'year') {
        this.referenceElm = this.$refs.referenceYear;
      } else {
        this.referenceElm = this.$refs.referenceMonth;
      }
      if (this.popperPanelType === type) {
        this.popperVisable = !this.popperVisable;
        this.doDestroy(true);
      } else {
        this.doDestroy(true);
        this.popperPanelType = type;
        this.popperVisable = true;
        this.showPanel();
      }
    },
    showPanel() {
      let type = this.popperPanelType;
      let panelPromis = this.popperElm ? Promise.resolve() : this.createYearMonthPopperPanel();
      panelPromis.then(() => {
        this.panelPopTable.$refs.panel.setViewType(type);
        this.panelPopTable.$refs.panel.visiable = true;
        this.$nextTick(() => {
          this.updatePopper();
        });
      });
    },
    hidenPanel() {
      if (this.panelPopTable) {
        this.panelPopTable.$refs.panel.visiable = false;
        this.destroyPopper();
      }
    },
    onPopperPick({ type, value }) {
      const newValue = this.value.clone();
      if (type === 'year') {
        newValue.year(value);
        this.popperChangeYear(newValue._d);
      } else {
        newValue.month(value);
        this.popperChangeMonth(newValue._d);
      }

      this.popperVisable = false;
    },
    getPanelHeader() {
      // 这里的样式需要需要重写，目前引用的日期组件的样式, 按需加载有问题
      return (<div class={this.prefixCls + '--header'}>
        <button {...{
          on: {
            click: this.popperPrevYear
          }
        }} type="button" class="sp-picker-panel__icon-btn sp-date-picker__prev-btn sp-icon-doubleleft"></button>
        <button {...{
          on: {
            click: this.popperPrevMonth
          }
        }}
        type="button"
        class="sp-picker-panel__icon-btn sp-date-picker__prev-btn sp-icon-left">
        </button>
        <span
          {...{
            directives: [
              {
                name: 'clickoutside',
                value: this.popperOutsideClick
              }
            ]
          }}
          class="sp-date-picker__header-center">
          <span
            ref="referenceYear"
            {...{
              on: {
                click: () => {
                  this.popperSwitch('year');
                }
              }
            }}
            class="sp-date-picker__header-label">{this.value.year() + this.t('el.acalendar.year')}</span>
          <span
            ref="referenceMonth"
            {...{
              on: {
                click: () => {
                  this.popperSwitch('month');
                }
              }
            }}
            class="sp-date-picker__header-label">{this.value.month() + 1 + this.t('el.acalendar.month')}</span>
        </span>
        <button
          {...{
            on: {
              click: this.popperNextMonth
            }
          }}
          type="button"
          class="sp-picker-panel__icon-btn sp-date-picker__next-btn sp-icon-right">
        </button>
        <button
          {...{
            on: {
              click: this.popperNextYear
            }
          }}
          type="button"
          class="sp-picker-panel__icon-btn sp-date-picker__next-btn sp-icon-doubleright">
        </button>
      </div>);
    },
    createYearMonthPopperPanel() {
      const panelTablePromise = new Promise((resolve) => {
        let _this = this;
        new Vue({
          mounted() {
            resolve(this);
          },
          render() {
            return (
              <YearMonthPanel
                {...{
                  props: {
                    ..._this.$props
                  },
                  scopedSlots: this.$scopedSlots,
                  ref: 'panel'
                }}
              ></YearMonthPanel>
            );
          }
        }).$mount();
      });
      return panelTablePromise.then((panelTable) => {
        this.panelPopTable = panelTable;
        this.panelPopTable.$refs.panel.$on('pick', this.onPopperPick);
        this.popperElm = panelTable.$el;
      });
    },
    destoryYearMonthPopperPanel() {
      if (this.panelPopTable) {
        this.panelPopTable.$destroy();
        this.panelPopTable.$off();
        this.panelPopTable.$el.remove();
        this.panelPopTable = null;
      }
    }
  }
};

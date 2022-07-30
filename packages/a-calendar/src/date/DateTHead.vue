<script>
// import DateConstants from './DateConstants';
// import moment from 'moment';
import { t2 } from '@fe/element-sp-ui/src/locale';

export default {
  functional: true,
  render(createElement, context) {
    const { props } = context;
    // const value = props.value;
    // const localeData = value.localeData();
    const prefixCls = props.prefixCls;
    let veryShortWeekdays = [];
    let weekDays = [];
    // const firstDayOfWeek = localeData.firstDayOfWeek();
    // const firstDayOfWeek = 0;
    let showWeekNumberEl;
    // const now = moment();
    // for (let dateColIndex = 0; dateColIndex < DateConstants.DATE_COL_COUNT; dateColIndex++) {
    //   const index = (firstDayOfWeek + dateColIndex) % DateConstants.DATE_COL_COUNT;
    //   now.day(index);
    //   veryShortWeekdays[dateColIndex] = this.t2('el.acalendar.weeks');
    //   weekDays[dateColIndex] = localeData.weekdaysShort(now);
    // }
    veryShortWeekdays = t2('el.acalendar.weeks');
    weekDays = t2('el.acalendar.weeks');

    if (props.showWeekNumber) {
      showWeekNumberEl = (
        <th
          role="columnheader"
          class={`${prefixCls}-column-header ${prefixCls}-week-number-header`}
        >
          <span class={`${prefixCls}-column-header-inner`}>x</span>
        </th>
      );
    }
    const weekDaysEls = weekDays.map((day, xindex) => {
      return (
        <th key={xindex} role="columnheader" title={day} class={`${prefixCls}-column-header`}>
          <span class={`${prefixCls}-column-header-inner`}>{veryShortWeekdays[xindex]}</span>
        </th>
      );
    });
    return (
      <thead>
        <tr role="row">
          {showWeekNumberEl}
          {weekDaysEls}
        </tr>
      </thead>
    );
  }
};
</script>
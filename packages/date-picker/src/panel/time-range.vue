<template>
  <transition
    name="sp-zoom-in-top"
    @after-leave="$emit('dodestroy')">
    <div
      v-show="visible"
      class="sp-time-range-picker sp-picker-panel sp-popper"
      :class="popperClass">
      <div class="sp-time-range-picker__content">
        <!-- <div>{{minDate&&minDate.toISOString()}}</div> -->
        <div v-if="timeRangeIndex === 0" class="sp-time-range-picker__cell">
          <!-- <div class="sp-time-range-picker__header">{{ t('el.datepicker.startTime') }}</div> -->
          <div
            :class="{ 'has-seconds': showSeconds, 'is-arrow': arrowControl }"
            class="sp-time-range-picker__body sp-time-panel__content">
            <time-spinner
              ref="minSpinner"
              :show-seconds="showSeconds"
              :am-pm-mode="amPmMode"
              @change="handleMinChange"
              :arrow-control="arrowControl"
              @select-range="setMinSelectionRange"
              :date="minDate">
            </time-spinner>
          </div>
        </div>
        <div v-else-if="timeRangeIndex === 1" class="sp-time-range-picker__cell">
          <!-- <div class="sp-time-range-picker__header">{{ t('el.datepicker.endTime') }}</div> -->
          <div
            :class="{ 'has-seconds': showSeconds, 'is-arrow': arrowControl }"
            class="sp-time-range-picker__body sp-time-panel__content">
            <time-spinner
              ref="maxSpinner"
              :show-seconds="showSeconds"
              :am-pm-mode="amPmMode"
              @change="handleMaxChange"
              :arrow-control="arrowControl"
              @select-range="setMaxSelectionRange"
              :date="maxDate">
            </time-spinner>
          </div>
        </div>
      </div>
      <div class="sp-time-panel__footer">
        <!-- <button
          type="button"
          class="sp-time-panel__btn cancel"
          @click="handleCancel()">{{ t('el.datepicker.cancel') }}</button> -->
        <button
          type="button"
          class="sp-time-panel__btn confirm"
          @click="handleConfirm()">{{ t('el.datepicker.confirm') }}</button>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import {
    parseDate,
    limitTimeRange,
    modifyDate,
    clearMilliseconds,
    timeWithinRange,
    transformMinDateMaxDate
  } from '../../../../src/utils/date-util';
  import Locale from '../../../../src/mixins/locale';
  import TimeSpinner from '../basic/time-spinner';

  // const MIN_TIME = parseDate('00:00:00', 'HH:mm:ss');
  const MAX_TIME = parseDate('23:59:59', 'HH:mm:ss');

  // const minTimeOfDay = function(date) {
  //   return modifyDate(MIN_TIME, date.getFullYear(), date.getMonth(), date.getDate());
  // };
  
  const maxTimeOfDay = function(date) {
    return modifyDate(MAX_TIME, date.getFullYear(), date.getMonth(), date.getDate());
  };

  // increase time by amount of milliseconds, but within the range of day
  const advanceTime = function(date, amount) {
    return new Date(Math.min(date.getTime() + amount, maxTimeOfDay(date).getTime()));
  };

  export default {
    mixins: [Locale],

    components: { TimeSpinner },

    computed: {
      showSeconds() {
        return (this.format || '').indexOf('ss') !== -1;
      },

      offset() {
        return this.showSeconds ? 11 : 8;
      },

      spinner() {
        return this.selectionRange[0] < this.offset ? this.$refs.minSpinner : this.$refs.maxSpinner;
      },

      btnDisabled() {
        return this.minDate.getTime() > this.maxDate.getTime();
      },
      amPmMode() {
        if ((this.format || '').indexOf('A') !== -1) return 'A';
        if ((this.format || '').indexOf('a') !== -1) return 'a';
        return '';
      }
    },

    data() {
      return {
        popperClass: '',
        minDate: new Date(),
        maxDate: new Date(),
        value: [],
        oldValue: [null, null],
        defaultValue: null,
        format: 'HH:mm:ss',
        visible: false,
        selectionRange: [0, 2],
        arrowControl: false,
        timeRange: [null, null],
        timeRangeIndex: 0,
        arrowOffset: 35
      };
    },

    watch: {
      value(value) {
        if (Array.isArray(value)) {
          this.minDate = new Date(value[0]);
          this.maxDate = new Date(value[1]);
        } else {
          if (Array.isArray(this.defaultValue)) {
            this.minDate = new Date(this.defaultValue[0]);
            this.maxDate = new Date(this.defaultValue[1]);
          } else if (this.defaultValue) {
            this.minDate = new Date(this.defaultValue);
            this.maxDate = advanceTime(new Date(this.defaultValue), 60 * 60 * 1000);
          } else {
            this.minDate = new Date();
            this.maxDate = advanceTime(new Date(), 60 * 60 * 1000);
          }
        }
      },

      visible(val) {
        if (val) {
          // this.oldValue = this.value;
          // this.$nextTick(() => this.$refs.minSpinner && this.$refs.minSpinner.emitSelectRange('hours'));
        }
      },

      timeRangeIndex(index) {
        const popperArrowElm = this.$el.querySelector('.popper__arrow');
        if (popperArrowElm) {
          popperArrowElm.style.left = `${(index * 100) + this.arrowOffset}px`;
        }
      }
    },

    methods: {
      handleClear() {
        this.timeRange = [null, null];
        this.timeRangeIndex = 0;
        this.$emit('pick', null);
      },

      handleCancel() {
        this.$emit('pick', this.oldValue);
      },

      handleMinChange(date) {
        this.minDate = clearMilliseconds(date);
        this.timeRange = [this.minDate, this.timeRange[1]];
        // this.handleChange();
      },

      handleMaxChange(date) {
        this.maxDate = clearMilliseconds(date);
        this.timeRange = [this.timeRange[0], this.maxDate];
        // this.handleChange();
      },

      // handleChange() {

      // this.emitUpdate([this.minDate, this.maxDate][this.timeRangeIndex]);
  
      // if (this.timeRange.filter(t => t).length === 2) {
      //   this.$emit('pick', this.timeRange, true);
      // }

      // this.$emit('pick', [this.minDate, this.maxDate], true);
      // if (this.isValidValue([this.minDate, this.maxDate])) {
      //   if (this.$refs.minSpinner) this.$refs.minSpinner.selectableRange = [[minTimeOfDay(this.minDate), this.maxDate]];
      //   if (this.$refs.maxSpinner) this.$refs.maxSpinner.selectableRange = [[this.minDate, maxTimeOfDay(this.maxDate)]];
      //   this.$emit('pick', [this.minDate, this.maxDate], true);
      // }
      // },

      setMinSelectionRange(start, end) {
        this.$emit('select-range', start, end, 'min');
        this.selectionRange = [start, end];
      },

      setMaxSelectionRange(start, end) {
        this.$emit('select-range', start, end, 'max');
        this.selectionRange = [start + this.offset, end + this.offset];
      },

      handleConfirm(visible = false) {
        if (this.$refs.minSpinner) {
          const minSelectableRange = this.$refs.minSpinner.selectableRange;
          this.minDate = limitTimeRange(this.minDate, minSelectableRange, this.format);
        }
        if (this.$refs.maxSpinner) {
          const maxSelectableRange = this.$refs.maxSpinner.selectableRange;
          this.maxDate = limitTimeRange(this.maxDate, maxSelectableRange, this.format);
        }

        const index = this.timeRange.findIndex(t => !t);
        if (index !== -1) {
          this.timeRangeIndex = index;
          // this.timeRange[index] = [this.minDate, this.maxDate][index];
        }

        if (this.timeRange.filter(t => t).length === 2) {
          this.$emit('pick', transformMinDateMaxDate([this.minDate, this.maxDate]), visible);
        }

      },

      adjustSpinners() {
        if (this.$refs.minSpinner) this.$refs.minSpinner.adjustSpinners();
        if (this.$refs.maxSpinner) this.$refs.maxSpinner.adjustSpinners();
      },

      changeSelectionRange(step) {
        const list = this.showSeconds ? [0, 3, 6, 11, 14, 17] : [0, 3, 8, 11];
        const mapping = ['hours', 'minutes'].concat(this.showSeconds ? ['seconds'] : []);
        const index = list.indexOf(this.selectionRange[0]);
        const next = (index + step + list.length) % list.length;
        const half = list.length / 2;
        if (next < half) {
          if (this.$refs.minSpinner) this.$refs.minSpinner.emitSelectRange(mapping[next]);
        } else {
          if (this.$refs.maxSpinner) this.$refs.maxSpinner.emitSelectRange(mapping[next - half]);
        }
      },

      isValidValue(date) {
        // if (Array.isArray(date)) {
        //   this.$refs.minSpinner && timeWithinRange(this.minDate, this.$refs.minSpinner.selectableRange) && this.$refs.maxSpinner && timeWithinRange(this.maxDate, this.$refs.maxSpinner.selectableRange);
        // }
        return Array.isArray(date) &&
          (!this.$refs.minSpinner || timeWithinRange(this.minDate, this.$refs.minSpinner.selectableRange)) &&
          (!this.$refs.maxSpinner || timeWithinRange(this.maxDate, this.$refs.maxSpinner.selectableRange));
      },

      handleKeydown(event) {
        const keyCode = event.keyCode;
        const mapping = { 38: -1, 40: 1, 37: -1, 39: 1 };

        // Left or Right
        if (keyCode === 37 || keyCode === 39) {
          const step = mapping[keyCode];
          this.changeSelectionRange(step);
          event.preventDefault();
          return;
        }

        // Up or Down
        if (keyCode === 38 || keyCode === 40) {
          const step = mapping[keyCode];
          this.spinner.scrollDown(step);
          event.preventDefault();
          return;
        }
      },
      initValueFn(value) {
        this.$nextTick(() => {
          if (Array.isArray(value)) {
            this.timeRange = [new Date(value[0]), new Date(value[1])];
            this.minDate = new Date(value[0]);
            this.maxDate = new Date(value[1]);
            this.$forceUpdate();
          } else {
            this.timeRange = [null, null];
          }
        });
      }
    }
  };
</script>

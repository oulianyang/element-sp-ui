<template>
  <div
    class="sp-date-picker__header"
  >
    <button
      type="button"
      @click="prevYear"
      :aria-label="t(`el.datepicker.prevYear`)"
      class="sp-picker-panel__icon-btn sp-date-picker__prev-btn sp-icon-doubleleft"
    ></button>
    <span class="sp-date-picker__header-center">
      <span
        role="button"
        class="sp-date-picker__header-label"
        >{{ yearLabel }}</span
      >
    </span>
    <button
      type="button"
      @click="nextYear"
      :aria-label="t(`el.datepicker.nextYear`)"
      class="sp-picker-panel__icon-btn sp-date-picker__next-btn sp-icon-doubleright"
    ></button>
  </div>
</template>
<script>
import Locale from '../../../../src/mixins/locale';
import { prevYear, nextYear } from '../../../../src/utils/date-util';
export default {
  props: {
    date: {
      type: Date,
      default: () => new Date()
    }
  },
  mixins: [Locale],
  computed: {
    year() {
      return this.date.getFullYear();
    },
    yearLabel() {
      const yearTranslation = this.t('el.datepicker.year');
      const startYear = Math.floor(this.year / 10) * 10;
      if (yearTranslation) {
        return startYear + yearTranslation + ' - ' + (startYear + 11) + yearTranslation;
      }
      return startYear + ' - ' + (startYear + 11);
    }
  },
  methods: {
    prevYear() {
      this.$emit('preYear', prevYear(this.date, 10));
    },

    nextYear() {
      this.$emit('nextYear', nextYear(this.date, 10));
    }
  }
};
</script>

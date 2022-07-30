import Calendar from './src/index.vue';

Calendar.install = function(Vue) {
  Vue.component(Calendar.name, Calendar);
};

export default Calendar;

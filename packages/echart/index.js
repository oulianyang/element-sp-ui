import Echart from './src/index.vue';

Echart.install = function(Vue) {
  Vue.component(Echart.name, Echart);
};

export default Echart;

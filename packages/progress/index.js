import ElProgress from './src/progress';

ElProgress.install = function(Vue) {
  Vue.component(ElProgress.name, ElProgress);
};

export default ElProgress;

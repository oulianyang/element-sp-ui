import ElBadge from './src/badge';

/* istanbul ignore next */
ElBadge.install = function(Vue) {
  Vue.component(ElBadge.name, ElBadge);
};

export default ElBadge;

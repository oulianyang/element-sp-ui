import ElAnchor from './src/anchor';

/* istanbul ignore next */
ElAnchor.install = function(Vue) {
  Vue.component(ElAnchor.name, ElAnchor);
};

export default ElAnchor;

import ElTree from './src/tree';

/* istanbul ignore next */
ElTree.install = function(Vue) {
  Vue.component(ElTree.name, ElTree);
};

export default ElTree;

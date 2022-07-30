import SelectTree from './src/select-tree';

/* istanbul ignore next */
SelectTree.install = function(Vue) {
  Vue.component(SelectTree.name, SelectTree);
};

export default SelectTree;

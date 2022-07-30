import ElInputSearch from './src/input-search';

/* istanbul ignore next */
ElInputSearch.install = function(Vue) {
  Vue.component(ElInputSearch.name, ElInputSearch);
};

export default ElInputSearch;

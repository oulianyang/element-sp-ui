import AffixList from './src/affix-list.vue';

AffixList.install = function(Vue) {
  Vue.component(AffixList.name, AffixList);
};

export default AffixList;

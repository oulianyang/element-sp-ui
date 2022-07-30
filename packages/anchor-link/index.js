import ElAnchorLink from '../anchor/src/anchor-link';

/* istanbul ignore next */
ElAnchorLink.install = function(Vue) {
  Vue.component(ElAnchorLink.name, ElAnchorLink);
};

export default ElAnchorLink;

// 组件默认配置
export const defaultTreeConfig = {
  treeProps: {
    label: 'label',
    children: 'children',
    isLeaf: 'isLeaf',
    disabled: 'disabled'
  }
};

// 默认配置获取
export const getDefaultTreeConfig = (config = {}) => {
  return {
    ...defaultTreeConfig,
    ...config
  };
};

export const getCheckNodesChildInfo = (checkedKeys, data, config = {
  childrenKey: 'children',
  key: 'id'
}, parentId) => {
  let nodes = [];
  let { key, childrenKey } = config;
  data.forEach(m => {
    let nodeKey = m[key];
    if (checkedKeys.includes(nodeKey)) {
      nodes.push(m);
    } else if (m[childrenKey]) {
      nodes = nodes.concat(getCheckNodesChildInfo(checkedKeys, m[childrenKey], config, nodeKey));
    }
  });
  return nodes;
};

// 获取子节点
export const getChildNodeKeys = (node, deep = false, config = {
  childrenKey: 'children',
  key: 'id'
}) => {
  const nodesKey = [];
  const { key, childrenKey } = config;
  const children = node[childrenKey];
  if (children) {
    children.forEach(m => {
      nodesKey.push(m[key]);
      if (deep) {
        nodesKey.push(...getChildNodeKeys(m, deep, config));
      }
    });
  }
  return nodesKey;
};

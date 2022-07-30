// tree mixin
import { cloneDeep, debounce, isEqual, uniq } from 'lodash';
import { getDefaultTreeConfig, getCheckNodesChildInfo, getChildNodeKeys } from './select-tree-utils';

export default {
  data() {
    return {
      checkedKeys: [], // 勾选的节点key
      checkedKeysTemp: [], // 勾选的节点
      _treeData: [], // 树数据
      checkedNodes: [] // 勾选的节点
    };
  },
  computed: {
    // 下拉树 父子关联关系
    checkStrictly() {
      if (!this.multiple) {
        return true;
      }
      if (this.checkStrategy === 'checkAll') {
        return false;
      } else {
        return true;
      }
    },
    // 是否监听下拉树选择事件
    isListenSelectTreeChecked() {
      if (this.multiple && ['checkChildren', 'auto'].indexOf(this.checkStrategy) >= 0) {
        return false;
      } else {
        return true;
      }
    },
    // 标识手动选中子节点
    checkedExcludeChildFlg() {
      const { multiple, checkStrategy } = this;
      const strategy = {
        checkAll: true,
        checkStrictly: false,
        checkChildren: true,
        auto: {
          0: false,
          1: true
        }
      };

      if (checkStrategy === 'auto') {
        return strategy.auto[multiple ? 1 : 0];
      } else {
        return strategy[checkStrategy];
      }
    }
  },
  watch: {
    treeData: {
      handler(value, old) {
        if (isEqual(value, old)) { return; }
        this._treeData = cloneDeep(value);
      },
      immediate: true
    }
  },
  created() {
    // 节流更新选中项改变
    this.updateCheckedKeysDebounce = debounce(this.updateCheckedKeys, 300);
  },
  methods: {
    // 单选， 多选 数组，字符串 检查 重置 value
    checkResetValue(value) {
      if (this.multiple && !Array.isArray(value)) {
        value = [];
      } else if (!this.multiple && Array.isArray(value)) {
        value = '';
      }
      return value;
    },
    // 勾选节点
    treeCheckChange(...arg) {
      if (this.isListenSelectTreeChecked) {
        this.listenCheckChange(...arg);
      }
    },
    // 更新选中的节点
    listenCheckChange(data, nodeFlg) {
      // if (!this.multiple) { return; }
      if (nodeFlg) {
        this.addCheckedKeys(data);
      } else {
        this.removeCheckedKeys(data);
      }
      this.updateCheckedKeysDebounce();
    },
    // 过滤并添加勾选的节点
    addCheckedKeys(data) {
      let checkedKeys = this.checkedKeysTemp;
      let nodeKey = data[this.nodeKey];
      let flg = checkedKeys.find(item => item === data[nodeKey]);
      if (flg === -1) {
        checkedKeys.push(nodeKey);
      }
    },
    // 删除选中的节点
    removeCheckedKeys(data) {
      let checkedKeys = this.checkedKeysTemp;
      let nodeKey = data[this.nodeKey];
      let index = checkedKeys.findIndex(item => item === nodeKey);
      if (~index) {
        checkedKeys.splice(index, 1);
      }
    },
    updateCheckedKeys(trigger = true) {
      this.getCheckNodes();
      this.setSelectLabel();
      if (trigger) {
        this.emitInputChange(this.checkedKeysTemp);
      }
    },
    emitInputChange(checkeds) {
      checkeds = [...checkeds];
      if (!this.multiple) {
        checkeds = checkeds[0];
        this.visible = false;
      }
      this.$emit('input', checkeds);
      this.$emit('change', checkeds);
    },
    // 获取勾选的节点
    getCheckNodes() {
      if (!this.treeData || this.treeData.length === 0) {
        this.checkedNodes = [...this.checkedKeysTemp];
        return;
      }
      if (this.checkStrictly) {
        this.checkedNodes = this.$refs.treeRef.getCheckedNodes();
      } else {
        this.checkedNodes = getCheckNodesChildInfo(this.checkedKeysTemp, this.treeData);
      }
    },
    // 父节点选中排除子节点
    setSelectLabel() {
      if (this.multiple) {
        return;
      }
      this.selectedLabel = this.checkedNodes.map(item => {
        if (typeof item === 'string') {
          return item;
        } else {
          return item[getDefaultTreeConfig(this.props).label];
        }
      }).join(',');
    },
    syncSetCheckedKeys(value) {
      // 验证初始 单选，多选值
      value = this.checkResetValue(value);
      if (value === undefined) {
        this.checkedKeys = [];
      } else if (typeof value === 'string' || typeof value === 'number') {
        this.checkedKeys = value === '' ? [] : [value];
      } else {
        this.checkedKeys = cloneDeep(value);
      }
      this.checkedKeysTemp = cloneDeep(this.checkedKeys);
    },
    // 设置选中项
    setCheckedKeys(keys, trigger = true) {
      this.checkedKeysTemp = keys;
      this.$refs.treeRef.setCheckedKeys(keys);
      this.$nextTick(() => {
        this.updateCheckedKeys(trigger);
      });
    },
    // 树组件挂载后初始化选中项
    handleTreeMounted() {
      this.getCheckNodes();
      this.setSelectLabel();
    },
    // 获取 是否 子级需要选中节点
    getCheckedFeatures(node) {
      const { checkedExcludeChildFlg } = this;
      let keysFeatures = [];
      if (checkedExcludeChildFlg) {
        return keysFeatures.concat(getChildNodeKeys(node, true));
      } else {
        return keysFeatures;
      }
    },
    // 节点click
    treeNodeClick(data) {
      if (this.multiple) {
        return;
      }
      this.setCheckedKeys([data[this.nodeKey]]);
    },
    // 下拉树 复选框选中事件
    treeCheck(node, data) {
      if (!this.multiple) {
        return;
      }
      let { checkedKeys } = data;
      let nodeKey = node[this.nodeKey];
      if (checkedKeys.indexOf(nodeKey) >= 0) {
        checkedKeys = uniq([...checkedKeys, ...this.getCheckedFeatures(node)]);
      }
      this.setCheckedKeys(checkedKeys);
    },
    // 过滤树
    treeFilterMethod(value, data) {
      if (!value) { return true;}
      if (this.filterMethod) {
        return this.filterMethod(value, data);
      } else {
        let label = data[getDefaultTreeConfig(this.props).label];
        if (label && label.indexOf(value) > -1) {
          return true;
        } else {
          return false;
        }

      }
    },
    getDefaultTreeConfig: getDefaultTreeConfig
  }
};

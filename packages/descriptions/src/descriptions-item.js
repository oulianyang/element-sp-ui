export default {
  name: 'ElDescriptionsItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    span: {
      type: Number,
      default: 1
    },
    contentClassName: {
      type: String,
      default: ''
    },
    contentStyle: {
      type: Object
    },
    labelClassName: {
      type: String,
      default: ''
    },
    labelStyle: {
      type: Object
    },
    rowHeight: { // 薯片 每行的高度,避免刷新需要直接传入
      type: Number
    },
    showUnFold: { // 薯片 是否显示展开按钮
      type: Boolean
    },
    maxRow: { // 薯片 最大行数
      type: Number
    },
    showTooltip: { // 薯片
      type: Boolean
    },
    tipAutoOverFlowShow: Boolean // 薯片
  },
  render() {
    return null;
  }
};

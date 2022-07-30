import DescriptionsRow from './descriptions-row';
import { isFunction } from '@fe/element-sp-ui/src/utils/types';

export default {
  name: 'ElDescriptions',
  components: {
    [DescriptionsRow.name]: DescriptionsRow
  },
  props: {
    border: {
      type: Boolean,
      default: false
    },
    column: {
      type: Number,
      default: 2
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    size: {
      type: String
      // validator: isValidComponentSize,
    },
    title: {
      type: String,
      default: ''
    },
    extra: {
      type: String,
      default: ''
    },
    labelStyle: {
      type: Object
    },
    contentStyle: {
      type: Object
    },
    labelClassName: {
      type: String,
      default: ''
    },
    contentClassName: {
      type: String,
      default: ''
    },
    colon: {
      type: Boolean,
      default: true
    },
    rowHeight: { // 薯片
      type: Number,
      default: 18
    },
    showUnFold: { // 薯片 是否显示展开按钮
      type: Boolean,
      default: false
    },
    maxRow: { // 薯片 最大行数
      type: Number,
      default: 0
    },
    showTooltip: { // 薯片 是否显示tooltip
      type: Boolean,
      default: true
    },
    tipAutoOverFlowShow: { // 薯片 tooltip是否自动超出时显示
      type: Boolean,
      default: true
    }
  },
  computed: {
    descriptionsSize() {
      return this.size || (this.$ELEMENT || {}).size;
    }
  },
  provide() {
    return {
      elDescriptions: this
    };
  },
  methods: {
    getOptionProps(vnode) {
      if (vnode.componentOptions) {
        const componentOptions = vnode.componentOptions;
        const { propsData = {}, Ctor = {} } = componentOptions;
        const props = (Ctor.options || {}).props || {};
        const res = {};
        for (const k in props) {
          const v = props[k];
          const defaultValue = v.default;
          if (defaultValue !== undefined) {
            res[k] = isFunction(defaultValue) ? defaultValue.call(vnode) : defaultValue;
          }
        }
        return { ...res, ...propsData };
      }
      return {};
    },
    getSlots(vnode) {
      let componentOptions = vnode.componentOptions || {};
      const children = vnode.children || componentOptions.children || [];
      const slots = {};
      children.forEach(child => {
        if (!this.isEmptyElement(child)) {
          const name = (child.data && child.data.slot) || 'default';
          slots[name] = slots[name] || [];
          if (child.tag === 'template') {
            slots[name].push(child.children);
          } else {
            slots[name].push(child);
          }
        }
      });
      return { ...slots };
    },
    isEmptyElement(c) {
      return !(c.tag || (c.text && c.text.trim() !== ''));
    },
    filledNode(node, span, count, isLast = false) {
      if (!node.props) {
        node.props = {};
      }
      if (span > count) {
        node.props.span = count;
      }
      if (isLast) {
        // set the max span, cause of the last td
        node.props.span = count;
      }
      return node;
    },
    getRows() {
      const children = ((this.$slots.default || []).filter(vnode => vnode.tag &&
            vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'ElDescriptionsItem'));
      const nodes = children.map(vnode => {
        return {
          props: this.getOptionProps(vnode),
          slots: this.getSlots(vnode),
          vnode
        };
      });
      const rows = [];
      let temp = [];
      let count = this.column;

      nodes.forEach((node, index) => {
        const span = node.props.span || 1;

        if (index === children.length - 1) {
          temp.push(this.filledNode(node, span, count, true));
          rows.push(temp);
          return;
        }

        if (span < count) {
          count -= span;
          temp.push(node);
        } else {
          temp.push(this.filledNode(node, span, count));
          rows.push(temp);
          count = this.column;
          temp = [];
        }
      });

      return rows;
    }
  },
  render() {
    const { title, extra, border, descriptionsSize, $slots } = this;
    const rows = this.getRows();

    return (
      <div class="sp-descriptions">
        {
          (title || extra || $slots.title || $slots.extra)
            ? <div class="sp-descriptions__header">
              <div class="sp-descriptions__title">
                { $slots.title ? $slots.title : title}
              </div>
              <div class="sp-descriptions__extra">
                { $slots.extra ? $slots.extra : extra }
              </div>
            </div>
            : null
        }

        <div class="sp-descriptions__body">
          <table class={['sp-descriptions__table', {'is-bordered': border}, descriptionsSize ? `sp-descriptions--${descriptionsSize}` : '']}>
            {rows.map(row => (
              <DescriptionsRow row={row}></DescriptionsRow>
            ))}
          </table>
        </div>
      </div>
    );
  }
};

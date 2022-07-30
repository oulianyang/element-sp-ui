<script>
import { getComponentFromProp } from './utils/props-util';
import classNames from 'classnames';

import Tooltip from '../../tooltip';
export default {
  name: 'ElAnchorLink',

  props: {
    href: {
      type: String,
      default: '#'
    },
    title: {
      type: null
    },
    target: String,
    tipPopperClass: {
      type: String,
      default: ''
    },
    tipEffect: {
      type: String,
      default: 'dark'
    },
    tipPlacement: {
      type: String,
      default: 'top'
    },
    tipOffset: {
      type: Number,
      default: 0
    },
    showTooltip: Boolean
  },

  data() {
    this.prefixCls = 'sp-anchor';
    return {};
  },

  components: { Tooltip },

  inject: {
    antAnchor: { default: () => ({}) },
    antAnchorContext: { default: () => ({}) }
  },
  computed: {
    clickPrevent() {
      return this.antAnchorContext.clickPrevent;
    },
    _tooltipShow() {
      if (this.showTooltip !== undefined) {
        return this.showTooltip;
      }
      if (this.antAnchorContext.showTooltip !== undefined) {
        return this.antAnchorContext.showTooltip;
      }

      return true;
    }
  },
  watch: {
    href(val, oldVal) {
      this.$nextTick(() => {
        this.antAnchor.unregisterLink(oldVal);
        this.antAnchor.registerLink(val);
      });
    }
  },
  mounted() {
    this.antAnchor.registerLink(this.href);
  },

  beforeDestroy() {
    this.antAnchor.unregisterLink(this.href);
  },
  methods: {
    handleClick(e) {
      if (this.clickPrevent) {
        e.preventDefault();
      }
      this.antAnchor.scrollTo(this.href);
      const { scrollTo } = this.antAnchor;
      const { href, title } = this.$props;
      if (this.antAnchorContext.$emit) {
        this.antAnchorContext.$emit('click', e, { title, href });
      }
      scrollTo(href);
    }
  },
  render() {
    const { prefixCls, href, $slots, target, tipEffect, tipPlacement, tipOffset, tipPopperClass, _tooltipShow } = this;

    const title = getComponentFromProp(this, 'title');
    const active = this.antAnchor.$data.activeLink === href;
    const wrapperClassName = classNames(`${prefixCls}-link`, {
      [`${prefixCls}-link-active`]: active
    });
    const titleClassName = classNames(`${prefixCls}-link-title`, {
      [`${prefixCls}-link-title-active`]: active
    });
    return (
      <div class={wrapperClassName}>
        <Tooltip disabled={ !_tooltipShow || typeof title !== 'string'} ref="tooltip" popper-class={
          ['sp-anchor-link__tooltip-popper', tipPopperClass].filter(c=>c).join(' ')
        } effect={ tipEffect } placement={ tipPlacement } offset={ tipOffset } >
          <span>
            <a
              class={titleClassName}
              href={href}
              target={target}
              onClick={this.handleClick}
            >
              {title}
            </a>
            {$slots.default}
          </span>
          <slot slot="content">
            {typeof title === 'string' ? title : ''}
          </slot>
        </Tooltip>
      </div>
    );
  }
};
</script>

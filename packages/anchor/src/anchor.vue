<script>
import classNames from 'classnames';
import { on } from '@fe/element-sp-ui/src/utils/dom';
import ElAffix from '@fe/element-sp-ui/packages/affix/index';
import scrollTo from './utils/scrollTo';
import getScroll from './utils/getScroll';
import BaseMixin from './utils/BaseMixin';

function getDefaultContainer() {
  return window;
}
function getOffsetTop(element, container) {
  if (!element) {
    return 0;
  }

  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument.documentElement;
      return rect.top - container.clientTop;
    }
    return rect.top - container.getBoundingClientRect().top;
  }

  return rect.top;
}
const sharpMatcherRegx = /#([^#]+)$/;

export default {
  name: 'ElAnchor',

  components: {
    ElAffix: ElAffix
  },

  mixins: [BaseMixin],

  props: {
    offsetTop: Number,
    bounds: Number,
    wrapperClass: String,
    wrapperStyle: Object,
    getCurrentAnchor: Function,
    targetOffset: Number,
    affix: {
      type: Boolean,
      default: true
    },
    showInkInFixed: false,
    getContainer: {
      type: Function,
      default: getDefaultContainer
    },
    activeLinkBorder: { // 薯片 激活时展示边框
      type: Boolean,
      default: false
    },
    clickPrevent: { // 薯片 点击时阻止默认行为
      type: Boolean,
      default: false
    },
    showTooltip: { // 薯片 是否显示提示
      type: Boolean,
      default: true
    }
  },
  data() {
    this.links = [];
    this._sPrefixCls = '';
    this.prefixCls = 'sp-anchor';
    return {
      activeLink: null
    };
  },
  provide() {
    return {
      antAnchor: {
        registerLink: link => {
          if (!this.links.includes(link)) {
            this.links.push(link);
          }
        },
        unregisterLink: link => {
          const index = this.links.indexOf(link);
          if (index !== -1) {
            this.links.splice(index, 1);
          }
        },
        $data: this.$data,
        scrollTo: this.handleScrollTo
      },
      antAnchorContext: this
    };
  },
  mounted() {
    this.$nextTick(() => {
      const { getContainer } = this;
      this.scrollContainer = getContainer();
      this.scrollEvent = on(this.scrollContainer, 'scroll', this.handleScroll);
      this.handleScroll();
    });
  },
  updated() {
    this.$nextTick(() => {
      if (this.scrollEvent) {
        const { getContainer } = this;
        const currentContainer = getContainer();
        if (this.scrollContainer !== currentContainer) {
          this.scrollContainer = currentContainer;
          this.scrollEvent.remove();
          this.scrollEvent = on(this.scrollContainer, 'scroll', this.handleScroll);
          this.handleScroll();
        }
      }
      this.updateInk();
    });
  },
  beforeDestroy() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  },

  methods: {
    getCurrentActiveLink(offsetTop = 0, bounds = 5) {
      const { getCurrentAnchor } = this;

      if (typeof getCurrentAnchor === 'function') {
        return getCurrentAnchor();
      }
      const activeLink = '';
      if (typeof document === 'undefined') {
        return activeLink;
      }

      const linkSections = [];
      const { getContainer } = this;
      const container = getContainer();
      this.links.forEach(link => {
        const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
        if (!sharpLinkMatch) {
          return;
        }
        const target = document.getElementById(sharpLinkMatch[1]);
        if (target) {
          const top = getOffsetTop(target, container);
          if (top < offsetTop + bounds) {
            linkSections.push({
              link,
              top
            });
          }
        }
      });

      if (linkSections.length) {
        const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
        return maxSection.link;
      }
      return '';
    },

    handleScrollTo(link) {
      const { offsetTop, getContainer, targetOffset } = this;

      this.setCurrentActiveLink(link);
      const container = getContainer();
      const scrollTop = getScroll(container, true);
      const sharpLinkMatch = sharpMatcherRegx.exec(link);
      if (!sharpLinkMatch) {
        return;
      }
      const targetElement = document.getElementById(sharpLinkMatch[1]);
      if (!targetElement) {
        return;
      }

      const eleOffsetTop = getOffsetTop(targetElement, container);
      let y = scrollTop + eleOffsetTop;
      y -= targetOffset !== undefined ? targetOffset : offsetTop || 0;
      this.animating = true;

      scrollTo(y, {
        callback: () => {
          this.animating = false;
        },
        getContainer
      });
    },
    setCurrentActiveLink(link) {
      const { activeLink } = this;

      if (activeLink !== link) {
        this.setState({
          activeLink: link
        });
        this.$emit('change', link);
      }
    },

    handleScroll() {
      if (this.animating) {
        return;
      }
      const { offsetTop, bounds, targetOffset } = this;
      const currentActiveLink = this.getCurrentActiveLink(
        targetOffset !== undefined ? targetOffset : offsetTop || 0,
        bounds,
      );
      this.setCurrentActiveLink(currentActiveLink);
    },

    updateInk() {
      if (typeof document === 'undefined') {
        return;
      }
      const { _sPrefixCls } = this;
      const linkNode = this.$el.getElementsByClassName(`${_sPrefixCls}-link-title-active`)[0];
      if (linkNode) {
        this.$refs.inkNode.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
      }
    }
  },

  render() {
    const {
      prefixCls,
      offsetTop,
      affix,
      showInkInFixed,
      activeLink,
      $slots,
      getContainer,
      activeLinkBorder
    } = this;

    this._sPrefixCls = prefixCls;

    const inkClass = classNames(`${prefixCls}-ink-ball`, {
      visible: activeLink
    });

    const wrapperClass = classNames(this.wrapperClass, `${prefixCls}-wrapper`);

    const anchorClass = classNames(prefixCls, {
      fixed: !affix && !showInkInFixed,
      'sp-anchor-active-link-border': activeLinkBorder
    });

    const wrapperStyle = {
      maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
      ...this.wrapperStyle
    };

    const anchorContent = (
      <div class={wrapperClass} style={wrapperStyle}>
        <div class={anchorClass}>
          <div class={`${prefixCls}-ink`}>
            <span class={inkClass} ref="inkNode" />
          </div>
          {$slots.default}
        </div>
      </div>
    );

    return !affix ? (
      anchorContent
    ) : (
      <ElAffix offsetTop={offsetTop} target={getContainer}>
        {anchorContent}
      </ElAffix>
    );
  }
};
</script>

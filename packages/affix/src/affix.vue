<script>
import getScroll from '@fe/element-sp-ui/src/utils/getScroll';
import throttleByAnimationFrame from '@fe/element-sp-ui/src/utils/throttleByAnimationFrame';
import { isEqual, omit } from 'lodash';

function getDefaultTarget() {
  return typeof window !== 'undefined'
    ? window : null;
}

function getTargetRect(target) {
  return target !== window
    ? target.getBoundingClientRect()
    : { top: 0, left: 0, bottom: 0 };
}

function getOffset(element, target) {
  const elemRect = element.getBoundingClientRect();
  const targetRect = getTargetRect(target);

  const scrollTop = getScroll(target, true);
  const scrollLeft = getScroll(target, false);

  const docElem = window.document.body;
  const clientTop = docElem.clientTop || 0;
  const clientLeft = docElem.clientLeft || 0;

  return {
    top: elemRect.top - targetRect.top +
      scrollTop - clientTop,
    left: elemRect.left - targetRect.left +
      scrollLeft - clientLeft,
    width: elemRect.width,
    height: elemRect.height
  };
}

function addEventListener(target, eventType, callback, option) {
  if (target.addEventListener) {
    let useCapture = false;
    if (typeof option === 'object') {
      useCapture = option.capture || false;
    } else if (typeof option === 'boolean') {
      useCapture = option;
    }
    target.addEventListener(eventType, callback, useCapture);

    return {
      remove() {
        target.removeEventListener(eventType, callback, useCapture);
      }
    };
  } else if (target.attachEvent) {
    target.attachEvent(`on${eventType}`, callback);
    return {
      remove() {
        target.detachEvent(`on${eventType}`, callback);
      }
    };
  }
}

export default {
  name: 'ElAffix',
  props: {
  /**
   * 距离窗口顶部达到指定偏移量后触发
   */
    offsetTop: {
      type: Number
    },
    offset: {
      type: Number
    },
    /** 距离窗口底部达到指定偏移量后触发 */
    offsetBottom: {
      type: Number
    },
    /** 固定状态改变时触发的回调函数 */
    // onChange?: (affixed?: boolean) => void;
    /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
    target: {
      type: Function
    }
  },
  data() {
    this.events = [
      'resize',
      'scroll',
      'touchstart',
      'touchmove',
      'touchend',
      'pageshow',
      'load'
    ];
    this.eventHandlers = {};
    return {
      affixStyle: undefined,
      placeholderStyle: undefined
    };
  },
  computed: {

  },
  watch: {
    target(val) {
      this.$nextTick(() => {
        this.clearEventListeners();
        this.setTargetEventListeners(val);
        // Mock Event object.
        this.updatePosition({});
      });
    }
  },
  created() {

  },
  beforeMount() {
    this.updatePosition = throttleByAnimationFrame(this.updatePosition);
  },
  mounted() {
    const target = this.target || getDefaultTarget;

    this.timeout = setTimeout(() => {
      this.setTargetEventListeners(target);
    });
  },
  beforeDestroy() {
    this.clearEventListeners();
    clearTimeout(this.timeout);
    this.updatePosition.cancel();
  },
  methods: {
    setState(state, callback) {
      Object.assign(this.$data, typeof state === 'function' ? state(this.$data) : state);
      this.$nextTick(() => {
        callback && callback();
      });
    },
    setAffixStyle(e, affixStyle) {
      const { target = getDefaultTarget } = this;
      const originalAffixStyle = this.affixStyle;
      const isWindow = target() === window;
      if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
        return;
      }
      if (isEqual(affixStyle, originalAffixStyle)) {
        return;
      }
      this.setState({ affixStyle: affixStyle }, () => {
        const affixed = !!this.affixStyle;
        if ((affixStyle && !originalAffixStyle) ||
          (!affixStyle && originalAffixStyle)) {
          this.$emit('change', affixed);
        }
      });
    },

    setPlaceholderStyle(placeholderStyle) {
      const originalPlaceholderStyle = this.placeholderStyle;
      if (isEqual(placeholderStyle, originalPlaceholderStyle)) {
        return;
      }
      this.setState({ placeholderStyle: placeholderStyle });
    },
    syncPlaceholderStyle(e) {
      const { affixStyle } = this;
      if (!affixStyle) {
        return;
      }
      this.$refs.placeholderNode.style.cssText = '';
      this.setAffixStyle(e, {
        ...affixStyle,
        width: this.$refs.placeholderNode.offsetWidth + 'px'
      });
      this.setPlaceholderStyle({
        width: this.$refs.placeholderNode.offsetWidth + 'px'
      });
    },
    setTargetEventListeners(getTarget) {
      const target = getTarget();

      this.clearEventListeners();

      this.events.forEach(eventName => {
        this.eventHandlers[eventName] = addEventListener(target, eventName, this.updatePosition);
      });
    },
    clearEventListeners() {
      this.events.forEach(eventName => {
        const handle = this.eventHandlers[eventName];
        if (handle && handle.remove) {
          handle.remove();
        }
      });
    },
    // 更新位置
    updatePosition(e) {
      let { offsetTop } = this;
      const { offsetBottom, offset, target = getDefaultTarget } = this;
      const targetNode = target();

      // Backwards support
      offsetTop = offsetTop || offset;
      const scrollTop = getScroll(targetNode, true);
      const affixNode = this.$el;
      const elemOffset = getOffset(affixNode, targetNode);
      const elemSize = {
        width: this.$refs.fixedNode.offsetWidth,
        height: this.$refs.fixedNode.offsetHeight
      };

      const offsetMode = {
        top: false,
        bottom: false
      };
      // Default to `offsetTop=0`.
      if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
        offsetMode.top = true;
        offsetTop = 0;
      } else {
        offsetMode.top = typeof offsetTop === 'number';
        offsetMode.bottom = typeof offsetBottom === 'number';
      }

      const targetRect = getTargetRect(targetNode);
      const targetInnerHeight =
      targetNode.innerHeight || targetNode.clientHeight;
      if (scrollTop > elemOffset.top - offsetTop && offsetMode.top) {
      // Fixed Top
        const width = `${elemOffset.width}px`;
        const top = `${targetRect.top + offsetTop}px`;
        this.setAffixStyle(e, {
          position: 'fixed',
          top,
          left: `${targetRect.left + elemOffset.left}px`,
          width
        });
        this.setPlaceholderStyle({
          width,
          height: `${elemSize.height}px`
        });
      } else if (
        scrollTop < elemOffset.top + elemSize.height + offsetBottom - targetInnerHeight &&
        offsetMode.bottom
      ) {
      // Fixed Bottom
        const targetBottomOffet = targetNode === window ? 0 : (window.innerHeight - targetRect.bottom);
        const width = `${elemOffset.width}px`;
        this.setAffixStyle(e, {
          position: 'fixed',
          bottom: targetBottomOffet + offsetBottom + 'px',
          left: targetRect.left + elemOffset.left + 'px',
          width
        });
        this.setPlaceholderStyle({
          width,
          height: elemOffset.height + 'px'
        });
      } else {
        const { affixStyle } = this;
        if (e.type === 'resize' && affixStyle && affixStyle.position === 'fixed' && affixNode.offsetWidth) {
          this.setAffixStyle(e, { ...affixStyle, width: affixNode.offsetWidth + 'px' });
        } else {
          this.setAffixStyle(e, null);
        }
        this.setPlaceholderStyle(null);
      }
      if (e.type === 'resize') {
        this.syncPlaceholderStyle(e);
      }
    }
  },
  render() {
    const { affixStyle, placeholderStyle, $slots, $props } = this;

    const props = {
      attrs: omit($props, ['offsetTop', 'offsetBottom', 'target'])
    };

    return (
      <div {...props} class="sp-affix" style={placeholderStyle} ref='placeholderNode'>
        <div class={{
          'sp-affix__content': affixStyle
        }} style={affixStyle} ref='fixedNode'>
          {$slots.default}
        </div>
      </div>
    );
  }
};
</script>

<style scoped lang="scss">

</style>

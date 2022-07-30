<script>
import ElAffix from '@fe/element-sp-ui/packages/affix/index';
import ElIcons from '@fe/element-sp-ui/packages/icon/index';
import { requestAnimationEaseInOut } from '@fe/element-sp-ui/src/utils/util';
import { throttle } from 'lodash';
import dragDom from '@fe/element-sp-ui/src/directives/drag-dom';

export default {
  name: 'AffixList',
  props: {
    target: String,
    position: {
      type: String,
      default: 'left'
    },
    offsetTop: {
      type: String
    },
    offsetBottom: {
      type: String
    },
    offsetRight: {
      type: String
    },
    offsetLeft: {
      type: String
    },
    list: {
      type: Array,
      default: () => []
    },
    visibilityHeight: {
      type: Number,
      default: 400
    },
    dragMove: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ElIcons,
    ElAffix
  },
  directives: {
    dragDom
  },
  data() {
    return {
      visible: false,
      container: document,
      horizontalLeft: false // 是否在左侧
    };
  },
  computed: {
  //   el() {
  //     let el;
  //     if (this.target) {
  //       el = document.querySelector(this.target);
  //     }
  //     if (!el) {
  //       el = document.documentElement;
  //       this.container = document;
  //     } else {
  //       this.container = el;
  //     }
  //     return el;
  //   }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.updateHorizontal();
        });
      }
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.container.addEventListener('scroll', this.throttleScroll);
      this.throttleScroll();
    });

    setTimeout(() => {
      this.updateHorizontal();
    });
  },
  methods: {
    init() {
      this.container = document;
      this.el = document.documentElement;
      if (this.target) {
        this.el = document.querySelector(this.target);
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`);
        }
        this.container = this.el;
      }
    },
    scrollToTop() {
      let el = this.el;
      let scrollTop = el.scrollTop;
      requestAnimationEaseInOut((val) => {
        el.scrollTop = scrollTop * val;
      });
    },
    throttleScroll: throttle(function() {
      const scrollTop = this.el.scrollTop;
      this.visible = scrollTop >= this.visibilityHeight;
    }, 300),
    updateHorizontal() {
      let target = this.$el;
      if (target && ((target.offsetLeft + target.clientWidth / 2) / document.body.clientWidth) > 0.5) {
        this.horizontalLeft = false;
      } else {
        this.horizontalLeft = true;
      }
    },
    dragMoveEndFn() {
      this.updateHorizontal();
    }
  },
  render() {
    let { visible, position, offsetTop, offsetLeft, offsetBottom, offsetRight, list, dragMove } = this;
    if (!offsetBottom && !offsetTop) {
      offsetTop = '50%';
    }
    if (!offsetRight && !offsetLeft) {
      offsetRight = '40px';
    }

    return visible && (
      <div
        {...{
          directives: [
            {
              name: 'drag-dom',
              value: dragMove
            }
          ]
        }}
        element-drag-mouse-target="sp-affix-list__drag-handle"
        class={[
          'sp-affix-list',
          'sp-affix-list--fix',
          'sp-affix-list--' + position,
          {
            'sp-affix-list--horizontal-left': this.horizontalLeft
          }
        ]} style={`
          --offsetTop: ${offsetTop};
          --offsetBottom: ${offsetBottom};
          --offsetLeft: ${offsetLeft};
          --offsetRight: ${offsetRight};`
        }>
        {
          (
            <div
              ref="dragTargetRef"
              class={
                [
                  'sp-affix-list__drag-handle',
                  {
                    'sp-affix-list__drag-disabled': !this.dragMove
                  }
                ]
              }>
              <i class="sp-icon-draggable"></i>
            </div>
          )
        }

        <div class="sp-affix-list--wrap">
          {
            list.map(item => {
              return (
                <div class="sp-affix-list--item"
                  {...{
                    on: {
                      click: () => {
                        if (item.scrollToTop) {
                          this.scrollToTop();
                        }
                        this.$emit('click', item);
                      }
                    }
                  }}>
                  <div class="sp-affix-list--icon">
                    {typeof item.icon === 'string'
                      ? (<el-icons class={'sp-icon-' + item.icon}></el-icons>)
                      : item.icon
                    }
                  </div>
                  {item.label && (<div class="sp-affix-list__detail">
                    {item.label}
                  </div>)}
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
};
</script>


<template>
  <div class="sp-collapse-item"
    :class="{'is-active': isActive, 'is-disabled': disabled }">
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`sp-collapse-content-${id}`"
      :aria-describedby ="`sp-collapse-content-${id}`"
    >
      <div
        class="sp-collapse-item__header"
        @click="handleHeaderClick"
        role="button"
        :id="`sp-collapse-head-${id}`"
        :tabindex="disabled ? undefined : 0"
        @keyup.space.enter.stop="handleEnterClick"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <slot name="title">{{title}}</slot>
        <i
          class="sp-collapse-item__arrow sp-icon-right"
          :class="{'is-active': isActive}">
        </i>
      </div>
    </div>
    <el-collapse-transition>
      <div
        class="sp-collapse-item__wrap"
        v-show="isActive"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`sp-collapse-head-${id}`"
        :id="`sp-collapse-content-${id}`"
      >
        <div class="sp-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
  import ElCollapseTransition from '@fe/element-sp-ui/src/transitions/collapse-transition';
  import Emitter from '@fe/element-sp-ui/src/mixins/emitter';
  import { generateId } from '@fe/element-sp-ui/src/utils/util';

  export default {
    name: 'ElCollapseItem',

    componentName: 'ElCollapseItem',

    mixins: [Emitter],

    components: { ElCollapseTransition },

    data() {
      return {
        contentWrapStyle: {
          height: 'auto',
          display: 'block'
        },
        contentHeight: 0,
        focusing: false,
        isClick: false,
        id: generateId()
      };
    },

    inject: ['collapse'],

    props: {
      title: String,
      name: {
        type: [String, Number],
        default() {
          return this._uid;
        }
      },
      disabled: Boolean
    },

    computed: {
      isActive() {
        return this.collapse.activeNames.indexOf(this.name) > -1;
      }
    },

    methods: {
      handleFocus() {
        setTimeout(() => {
          if (!this.isClick) {
            this.focusing = true;
          } else {
            this.isClick = false;
          }
        }, 50);
      },
      handleHeaderClick() {
        if (this.disabled) return;
        this.dispatch('ElCollapse', 'item-click', this);
        this.focusing = false;
        this.isClick = true;
      },
      handleEnterClick() {
        this.dispatch('ElCollapse', 'item-click', this);
      }
    }
  };
</script>

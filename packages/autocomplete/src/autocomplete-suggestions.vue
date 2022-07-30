<template>
  <transition name="sp-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="sp-autocomplete-suggestion sp-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region">
      <el-scrollbar
        tag="ul"
        wrap-class="sp-autocomplete-suggestion__wrap"
        view-class="sp-autocomplete-suggestion__list">
        <li v-if="!parent.hideLoading && parent.loading"><i class="sp-icon-loading"></i></li>
        <slot v-else>
        </slot>
      </el-scrollbar>
    </div>
  </transition>
</template>
<script>
  import Popper from '@fe/element-sp-ui/src/utils/vue-popper';
  import Emitter from '@fe/element-sp-ui/src/mixins/emitter';
  import ElScrollbar from '@fe/element-sp-ui/packages/scrollbar';

  export default {
    components: { ElScrollbar },
    mixins: [Popper, Emitter],

    componentName: 'ElAutocompleteSuggestions',

    data() {
      return {
        parent: this.$parent,
        dropdownWidth: ''
      };
    },

    props: {
      options: {
        default() {
          return {
            gpuAcceleration: false
          };
        }
      },
      id: String,
      visibleArrow: {
        default: false
      }
    },

    methods: {
      select(item) {
        this.dispatch('ElAutocomplete', 'item-click', item);
      }
    },

    updated() {
      this.$nextTick(_ => {
        this.popperJS && this.updatePopper();
      });
    },

    mounted() {
      this.$parent.popperElm = this.popperElm = this.$el;
      this.referenceElm = this.$parent.$refs.input.$refs.input || this.$parent.$refs.input.$refs.textarea;
      this.referenceList = this.$el.querySelector('.sp-autocomplete-suggestion__list');
      this.referenceList.setAttribute('role', 'listbox');
      this.referenceList.setAttribute('id', this.id);
    },

    created() {
      this.$on('visible', (val, inputWidth) => {
        this.dropdownWidth = inputWidth + 'px';
        this.showPopper = val;
      });
    }
  };
</script>

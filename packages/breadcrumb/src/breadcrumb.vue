<template>
  <div class="sp-breadcrumb" aria-label="Breadcrumb" role="navigation">
    <span v-if="prefixText||'prefix' in $slots" class="sp-breadcrumb__prefix">
      <slot name="prefix">{{prefixText}}</slot>
    </span>
    <Tooltip class="sp-breadcrumb__content" :effect="tooltipEffect" :placement="tooltipPlacement" :content="tooltipContent" :disabled="!tooltipContent">
      <span>
        <slot></slot>
      </span>
    </Tooltip>
  </div>
</template>
<script>
  import Locale from '../../../src/mixins/locale';
  import Tooltip from '../../../packages/tooltip';
  
  export default {
    name: 'ElBreadcrumb',

    components: { Tooltip },

    props: {
      prefixText: {
        type: String,
        default: Locale.methods.t('el.breadcrumb.prefix')
      },
      separator: {
        type: String,
        default: '/'
      },
      separatorClass: {
        type: String,
        default: ''
      },
      tooltipEffect: {
        type: String,
        default: 'dark'
      },
      tooltipPlacement: {
        type: String,
        default: 'top'
      }
    },

    provide() {
      return {
        elBreadcrumb: this
      };
    },

    computed: {
      tooltipContent: {
        cache: false,
        get() {
          return this.$slots.default.map(slot => slot.elm && slot.elm.innerText).filter(t => t).join(` ${this.separator} `);
        }
      }
    },

    mounted() {
      const items = this.$el.querySelectorAll('.sp-breadcrumb__item');
      if (items.length) {
        items[items.length - 1].setAttribute('aria-current', 'page');
      }
      this.$forceUpdate();
    }
  };
</script>

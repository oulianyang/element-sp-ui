<template>
  <span class="sp-breadcrumb__item">
    <span
      :class="['sp-breadcrumb__inner', to ? 'is-link' : '']"
      ref="link"
      role="link">
      <slot></slot>
    </span>
    <i v-if="separatorClass" class="sp-breadcrumb__separator" :class="separatorClass"></i>
    <span v-else class="sp-breadcrumb__separator" role="presentation">{{separator}}</span>
  </span>
</template>
<script>
  export default {
    name: 'ElBreadcrumbItem',
    props: {
      to: {},
      replace: Boolean
    },
    data() {
      return {
        separator: '',
        separatorClass: ''
      };
    },

    inject: ['elBreadcrumb'],

    mounted() {
      this.separator = this.elBreadcrumb.separator;
      this.separatorClass = this.elBreadcrumb.separatorClass;
      const link = this.$refs.link;
      link.setAttribute('role', 'link');
      link.addEventListener('click', _ => {
        const { to, $router } = this;
        if (!to || !$router) return;
        this.replace ? $router.replace(to) : $router.push(to);
      });
    }
  };
</script>

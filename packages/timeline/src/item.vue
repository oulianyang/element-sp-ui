<template>
  <li 
    class="sp-timeline-item"
  >
    <div class="sp-timeline-item__tail"></div>

    <div v-if="!$slots.dot"
      class="sp-timeline-item__node"
      :class="[
        `sp-timeline-item__node--${size || ''}`,
        `sp-timeline-item__node--${type || ''}`
      ]"
      :style="{
        backgroundColor: color
      }"
    >
      <i v-if="icon"
        class="sp-timeline-item__icon"
        :class="icon"
      ></i>
    </div>
    <div v-if="$slots.dot" class="sp-timeline-item__dot">
      <slot name="dot"></slot>
    </div>

    <div class="sp-timeline-item__wrapper">
      <div v-if="!hideTimestamp && placement === 'top'"
        class="sp-timeline-item__timestamp is-top">
        {{timestamp}}
      </div>

      <div class="sp-timeline-item__content">
        <div v-if="title || 'title' in $slots" class="sp-timeline-item__title">
          <slot name="title">{{title}}</slot>
        </div>
        <div class="sp-timeline-item__description">
          <slot></slot>
        </div>
      </div>

      <div v-if="!hideTimestamp && placement === 'bottom'"
        class="sp-timeline-item__timestamp is-bottom">
        {{timestamp}}
      </div>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'ElTimelineItem',

    inject: ['timeline'],

    props: {
      timestamp: String,

      hideTimestamp: {
        type: Boolean,
        default: false
      },

      placement: {
        type: String,
        default: 'bottom'
      },

      type: String,

      color: String,

      size: {
        type: String,
        default: 'normal'
      },

      icon: String,

      /**
       * 标题（薯片UI扩展属性）
       */
      title: String
    }
  };
</script>

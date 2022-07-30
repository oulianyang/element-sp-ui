<template>
  <el-popover
    v-bind="$attrs"
    v-model="visible"
    :trigger="trigger"
  >
  <div class="sp-popconfirm">
    <div class="sp-popconfirm__main">
      <div class="sp-popconfirm__title">
        <i
          v-if="!hideIcon"
          :class="icon"
          class="sp-popconfirm__icon"
          :style="{color: iconColor}"
        ></i>
        {{title}}
      </div>
      <slot>
        <div v-if="content" class="sp-popconfirm__content">{{ content }}</div>
      </slot>
    </div>
    <slot name="action" :action="{cancel, confirm}">
      <div class="sp-popconfirm__action">
        <el-button
          size="mini" 
          :type="cancelButtonType" 
          @click="cancel"
        >
          {{ displayCancelButtonText }}
        </el-button>
        <el-button 
          size="mini" 
          :type="confirmButtonType" 
          @click="confirm"
        >
          {{ displayConfirmButtonText }}
        </el-button>
      </div>
    </slot>
  </div>
  <slot name="reference" slot="reference"></slot>
</el-popover>
</template>

<script>
import ElPopover from '@fe/element-sp-ui/packages/popover';
import ElButton from '@fe/element-sp-ui/packages/button';
import {t} from '@fe/element-sp-ui/src/locale';

export default {
  name: 'ElPopconfirm',
  props: {
    value: Boolean,
    title: {
      type: String
    },
    content: {
      type: String
    },
    confirmButtonText: {
      type: String
    },
    cancelButtonText: {
      type: String
    },
    confirmButtonType: {
      type: String,
      default: 'danger'
    },
    cancelButtonType: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: 'sp-icon-warning-circle-fill'
    },
    iconColor: {
      type: String,
      default: '#f04f4f'
    },
    hideIcon: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String,
      default: 'click'
    }
  },
  components: {
    ElPopover,
    ElButton
  },
  data() {
    return {
      visible: this.value === undefined ? false : this.value
    };
  },
  computed: {
    displayConfirmButtonText() {
      return this.confirmButtonText || t('el.popconfirm.confirmButtonText');
    },
    displayCancelButtonText() {
      return this.cancelButtonText || t('el.popconfirm.cancelButtonText');
    }
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    confirm() {
      this.visible = false;
      this.$emit('confirm');
    },
    cancel() {
      this.visible = false;
      this.$emit('cancel');
    }
  }
};
</script>

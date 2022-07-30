<template>
  <div :class="['sp-empty',
    type ? 'sp-empty--' + type : '']">
    <div :class="[
      'sp-empty__image'
    ]" :style="imageStyle">
      <img v-if="image" :src="image" ondragstart="return false">
      <slot v-else name="image">
        <img-empty :type="type" />
      </slot>
    </div>
    <div class="sp-empty__description">
      <slot v-if="$slots.description" name="description"></slot>
      <p v-else>{{ emptyDescription }}</p>
    </div>
    <div v-if="$slots.default" class="sp-empty__bottom">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { t } from '@fe/element-sp-ui/src/locale';
import ImgEmpty from './img-empty.vue';
export default {
  name: 'ElEmpty',
  components: {
    ImgEmpty
  },
  props: {
    image: {
      type: String,
      default: ''
    },
    imageSize: {
      type: String
    },
    description: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'area'
    }
  },
  computed: {
    emptyDescription() {
      return this.description || t('el.empty.description');
    },
    imageStyle() {
      return {
        width: this.imageSize ? `${this.imageSize}px` : ''
      };
    }
  }
};
</script>

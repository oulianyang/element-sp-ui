<template>
  <transition-group
    tag="ul"
    :class="[
      'sp-base-upload-list',
      'sp-base-upload-list--' + listType,
      { 'is-disabled': disabled },
    ]"
    name="sp-list"
  >
  <li
      v-if="exampleFile"
      :key="'exampleFile'"
      :class="[
        'sp-base-upload-list__item',
        focusing ? 'focusing' : '',
      ]"
    >
      <slot
        name="example"
        :file="exampleFile"
      >
        <div
          class="sp-base-upload-list__item-thumbnail sp-base-upload-list__certificates-item-example"
        >
          <img class="sp-base-upload-list__item-thumbnail" :src="exampleFile.url" />
          <span class="sp-base-upload-list__example-text">正确示例</span>
        </div>
      </slot>
    </li>
    <li
      v-for="(file, index) in files"
      :class="[
        'sp-base-upload-list__item',
        'is-' + file.status,
        focusing ? 'focusing' : '',
      ]"
      :key="file.uid"
      tabindex="0"
      @keydown.delete="!disabled && handleRemove(file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <slot
          :index="index"
          :file="file"
          :doRemove="() => handleRemove(file)"
        >
          <el-popconfirm
            class="sp-base-upload-list__item-tooltip"
            :title="
              file.deletePopTitle ||
                deletePopTitle ||
                '确定删除 ' + file.name ||
                '' + '?'
            "
            :content="
              file.deletePopContent ||
                deletePopContent ||
                '删除后将无法恢复，请谨慎操作。'
            "
            :confirm-button-text="deletePopConfirmButtonText || '删除'"
            :cancel-button-text="deletePopCancelButtonText || '取消'"
            trigger="manual"
            v-model="file.showDelete"
            @confirm="$emit('remove', file)"
          >
            <div slot="reference">
              <img
                class="sp-base-upload-list__item-thumbnail"
                v-if="
                  file.status !== 'uploading' &&
                    file.status !== 'error' &&
                    ['picture-card', 'picture'].indexOf(listType) > -1
                "
                :src="file.url"
                alt=""
              />
              <video
                ref="previewVideo"
                class="sp-base-upload-list__item-thumbnail"
                v-if="
                  videoPreviewPlay &&
                    file.status !== 'uploading' &&
                    file.status !== 'error' &&
                    listType === 'video-card'
                "
                :src="file.url"
              ></video>
              <div class="sp-base-upload-list__video-thumbnail">
                <i
                  v-if="
                    !videoPreviewPlay &&
                      file.status !== 'uploading' &&
                      file.status !== 'error' &&
                      listType === 'video-card'
                  "
                  class="sp-icon sp-icon-video"
                ></i>
              </div>
              <a class="sp-base-upload-list__item-name" @click="handleClick(file)">
                <i class="sp-icon-attachment"></i>{{ file.name }}
              </a>
              <label
                v-if="
                  ['picture-card', 'video-card', 'picture'].indexOf(listType) === -1
                "
                class="sp-base-upload-list__item-status-label"
              >
                <i
                  :class="{
                    'sp-icon-upload-success': true,
                    'sp-icon-circle-check': listType === 'text',
                    'sp-icon-check':
                      ['picture-card', 'video-card', 'picture'].indexOf(listType) >
                      -1,
                  }"
                ></i>
              </label>
              <el-tooltip effect="dark" content="删除" placement="top">
                <i
                  class="sp-base-upload--list-delete sp-icon-delete"
                  v-if="!disabled"
                  @click="handleRemove(file)"
                ></i>
              </el-tooltip>
              <i class="sp-icon-close-tip" v-if="!disabled">{{
                t("el.upload.deleteTip")
              }}</i>
              <!--因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上-->
              <el-progress
                v-if="file.status === 'uploading' || file.status === 'error'"
                :type="
                  listType === 'picture-card' || listType === 'video-card'
                    ? 'circle'
                    : 'line'
                "
                :stroke-width="2"
                :show-text="false"
                :width="48"
                :status="file.status === 'error' ? 'exception' : undefined"
                :percentage="parsePercentage(file)"
              >
              </el-progress>

              <span
                class="sp-base-upload-list__item-actions"
                v-if="listType === 'picture-card'"
              >
                <span
                  class="sp-base-upload-list__item-preview"
                  v-if="
                    (showPreviewPop || handlePreview) &&
                      listType === 'picture-card' &&
                      file.status === 'success'
                  "
                  @click="handleClick(file)"
                >
                  <i class="sp-icon-eye"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="sp-base-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="sp-icon-delete"></i>
                </span>
              </span>
              <span
                class="sp-base-upload-list__item-actions"
                v-if="listType === 'video-card'"
              >
                <span
                  class="sp-base-upload-list__item-preview"
                  v-if="videoPreviewPlay"
                  @click="videoPreview(file, index)"
                >
                  <i v-if="!file.previeFlg" class="sp-icon-play-circle"></i>
                  <i v-else class="sp-icon-close-circle"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="sp-base-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="sp-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-popconfirm>
        </slot>
    </li>
  </transition-group>
</template>
<script>
import Locale from '@fe/element-sp-ui/src/mixins/locale';
import ElProgress from '@fe/element-sp-ui/packages/progress';
import ElTooltip from '@fe/element-sp-ui/packages/tooltip';
import ElPopconfirm from '@fe/element-sp-ui/packages/popconfirm';

export default {
  name: 'ElUploadList',

  mixins: [Locale],

  inject: ['uploader'],

  data() {
    return {
      focusing: false
    };
  },
  components: { ElProgress, ElTooltip, ElPopconfirm },

  props: {
    files: {
      type: Array,
      default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    handlePreview: Function,
    videoPreviewPlay: Boolean,
    listType: String,
    showRemovePopover: {
      // 薯片 删除提示
      type: Boolean,
      default: false
    },
    deletePopTitle: {
      // 薯片 删除提示标题
      type: String
    },
    deletePopContent: {
      // 薯片 删除提示内容
      type: String
    },
    deletePopConfirmButtonText: {
      // 薯片 删除提示确认按钮文案
      type: String
    },
    deletePopCancelButtonText: {
      // 薯片 删除提示取消按钮文案
      type: String
    },
    showPreviewPop: {
      // 薯片 是否显示预览弹窗
      type: Boolean,
      default: false
    },
    exampleFile: Object // 薯片 示例图片
  },
  methods: {
    handleRemove(file) {
      if (this.showRemovePopover) {
        this.$set(file, 'showDelete', true);
      } else {
        this.$emit('remove', file);
      }
    },
    parsePercentage(file) {
      if (file.status === 'error') {
        return parseInt(file.percentage || 100, 10);
      } else {
        return parseInt(file.percentage || 80, 10);
      }
    },
    handleClick(file) {
      this.showPreviewPop && this.uploader.previewImage(file.url);
      this.handlePreview && this.handlePreview(file);
    },
    videoPreview(file, index) {
      let videoEl;

      // 获取播放元素
      if (this.$refs.previewVideo && this.$refs.previewVideo instanceof Array) {
        videoEl = this.$refs.previewVideo[index];
      } else {
        videoEl = this.$refs.previewVideo;
      }

      if (videoEl.paused) {
        this.$set(this.files, index, {
          ...file,
          previeFlg: true
        });
        videoEl.play();
      } else {
        this.$set(this.files, index, {
          ...file,
          previeFlg: false
        });
        videoEl.pause();
      }
      this.handlePreview && this.handlePreview(file);
    }
  }
};
</script>

<script>
import UploadList from './upload-list';
import Upload from './upload';
import ElProgress from '@fe/element-sp-ui/packages/progress';
import Migrating from '@fe/element-sp-ui/src/mixins/migrating';
import ElImage from '@fe/element-sp-ui/packages/image';

function noop() {}

export default {
  name: 'ElUpload',

  mixins: [Migrating],

  components: {
    ElProgress,
    UploadList,
    Upload,
    ElImage
  },

  provide() {
    return {
      uploader: this
    };
  },

  inject: {
    elForm: {
      default: ''
    }
  },

  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default() {
        return {};
      }
    },
    data: Object,
    multiple: Boolean,
    name: {
      type: String,
      default: 'file'
    },
    drag: Boolean,
    dragger: Boolean,
    withCredentials: Boolean,
    showFileList: {
      type: Boolean,
      default: true
    },
    accept: String,
    type: {
      type: String,
      default: 'select'
    },
    beforeUpload: Function,
    beforeRemove: Function,
    onRemove: {
      type: Function,
      default: noop
    },
    onChange: {
      type: Function,
      default: noop
    },
    onPreview: {
      type: Function
    },
    videoPreviewPlay: {
      type: Boolean,
      default: false
    },
    onSuccess: {
      type: Function,
      default: noop
    },
    onProgress: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    fileList: {
      type: Array,
      default() {
        return [];
      }
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      // 薯片添加 video-card
      type: String,
      default: 'text' // text,picture,picture-card, video-card
    },
    httpRequest: Function,
    disabled: Boolean,
    limit: Number,
    onExceed: {
      type: Function,
      default: noop
    },
    buttonIcon: {
      // 薯片
      type: String,
      default: 'sp-icon-upload'
    },
    fileButtonText: String, // 薯片
    spTip: String | Object | Function, // 薯片
    showRemovePopover: {
      // 薯片 是否显示提示
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
      // 薯片 删除提示确定按钮文案
      type: String
    },
    deletePopCancelButtonText: {
      // 薯片 删除提示取消按钮文案
      type: String
    },
    showPreviewPop: {
      // 薯片 是否显示图片预览弹窗
      type: Boolean,
      default: false
    },
    exampleFile: Object, // 薯片 示例图片
    sort: {
      type: String,
      default: 'desc'
    }
  },

  data() {
    return {
      uploadFiles: [],
      dragOver: false,
      draging: false,
      tempIndex: 1,
      previewImageUrl: ''
    };
  },

  computed: {
    uploadDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },

  watch: {
    listType(type) {
      if (
        type === 'picture-card' ||
        type === 'video-card' ||
        type === 'picture'
      ) {
        this.uploadFiles = this.uploadFiles.map((file) => {
          if (!file.url && file.raw) {
            try {
              file.url = URL.createObjectURL(file.raw);
            } catch (err) {
              console.error('[Element Error][Upload]', err);
            }
          }
          return file;
        });
      }
    },
    fileList: {
      immediate: true,
      handler(fileList) {
        this.uploadFiles = fileList.map((item) => {
          item.uid = item.uid || Date.now() + this.tempIndex++;
          item.status = item.status || 'success';
          return item;
        });
      }
    }
  },

  methods: {
    handleStart(rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++;
      let file = {
        status: 'ready',
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      };

      if (
        this.listType === 'picture-card' ||
        this.listType === 'video-card' ||
        this.listType === 'picture'
      ) {
        try {
          file.url = URL.createObjectURL(rawFile);
        } catch (err) {
          console.error('[Element Error][Upload]', err);
          return;
        }
      }

      if (this.sort === 'desc') {
        this.uploadFiles.push(file);
      } else {
        this.uploadFiles.unshift(file);
      }
      this.onChange(file, this.uploadFiles);
    },
    handleProgress(ev, rawFile) {
      const file = this.getFile(rawFile);
      this.onProgress(ev, file, this.uploadFiles);
      file.status = 'uploading';
      file.percentage = ev.percent || 0;
    },
    handleSuccess(res, rawFile) {
      const file = this.getFile(rawFile);

      if (file) {
        file.status = 'success';
        file.response = res;

        this.onSuccess(res, file, this.uploadFiles);
        this.onChange(file, this.uploadFiles);
      }
    },
    handleError(err, rawFile) {
      const file = this.getFile(rawFile);
      const fileList = this.uploadFiles;

      file.status = 'fail';

      fileList.splice(fileList.indexOf(file), 1);

      this.onError(err, file, this.uploadFiles);
      this.onChange(file, this.uploadFiles);
    },
    handleRemove(file, raw) {
      if (raw) {
        file = this.getFile(raw);
      }
      let doRemove = () => {
        this.abort(file);
        let fileList = this.uploadFiles;
        fileList.splice(fileList.indexOf(file), 1);
        this.onRemove(file, fileList);
      };

      if (!this.beforeRemove) {
        doRemove();
      } else if (typeof this.beforeRemove === 'function') {
        const before = this.beforeRemove(file, this.uploadFiles);
        if (before && before.then) {
          before.then(() => {
            doRemove();
          }, noop);
        } else if (before !== false) {
          doRemove();
        }
      }
    },
    getFile(rawFile) {
      let fileList = this.uploadFiles;
      let target;
      fileList.every((item) => {
        target = rawFile.uid === item.uid ? item : null;
        return !target;
      });
      return target;
    },
    abort(file) {
      this.$refs['upload-inner'].abort(file);
    },
    clearFiles() {
      this.uploadFiles = [];
    },
    submit() {
      this.uploadFiles
        .filter((file) => file.status === 'ready')
        .forEach((file) => {
          this.$refs['upload-inner'].upload(file.raw);
        });
    },
    getMigratingConfig() {
      return {
        props: {
          'default-file-list': 'default-file-list is renamed to file-list.',
          'show-upload-list': 'show-upload-list is renamed to show-file-list.',
          'thumbnail-mode':
            'thumbnail-mode has been deprecated, you can implement the same effect according to this case: http://element.eleme.io/#/zh-CN/component/upload#yong-hu-tou-xiang-shang-chuan'
        }
      };
    },
    previewImage(imgUrl) {
      this.previewImageUrl = imgUrl;
      this.$nextTick(() => {
        this.$refs.previewImage.clickHandler();
      });
    }
  },

  beforeDestroy() {
    this.uploadFiles.forEach((file) => {
      if (file.url && file.url.indexOf('blob:') === 0) {
        URL.revokeObjectURL(file.url);
      }
    });
  },

  render(h) {
    let uploadList;
    if (this.showFileList) {
      uploadList = (
        <UploadList
          disabled={this.uploadDisabled}
          listType={this.listType}
          files={this.uploadFiles}
          on-remove={this.handleRemove}
          videoPreviewPlay={this.videoPreviewPlay}
          showRemovePopover={this.showRemovePopover}
          deletePopTitle={this.deletePopTitle}
          deletePopContent={this.deletePopContent}
          deletePopConfirmButtonText={this.deletePopConfirmButtonText}
          deletePopCancelButtonText={this.deletePopCancelButtonText}
          showPreviewPop={this.showPreviewPop}
          exampleFile={this.exampleFile}
          handlePreview={this.onPreview}
        >
          {(props) => {
            if (this.$scopedSlots.file) {
              return this.$scopedSlots.file({
                file: props.file
              });
            }
          }}
        </UploadList>
      );
    }

    const uploadData = {
      props: {
        type: this.type,
        drag: this.drag,
        action: this.action,
        multiple: this.multiple,
        'before-upload': this.beforeUpload,
        'with-credentials': this.withCredentials,
        headers: this.headers,
        name: this.name,
        data: this.data,
        accept: this.accept,
        fileList: this.uploadFiles,
        autoUpload: this.autoUpload,
        listType: this.listType,
        fileButtonText: this.fileButtonText,
        buttonIcon: this.buttonIcon,
        spTip: this.$slots.spTip || this.spTip,
        disabled: this.uploadDisabled,
        limit: this.limit,
        'on-exceed': this.onExceed,
        'on-start': this.handleStart,
        'on-progress': this.handleProgress,
        'on-success': this.handleSuccess,
        'on-error': this.handleError,
        'on-preview': this.onPreview,
        'on-remove': this.handleRemove,
        'http-request': this.httpRequest
      },
      ref: 'upload-inner'
    };
    const trigger = this.$slots.trigger || this.$slots.default;
    const uploadComponent = <upload {...uploadData}>{trigger}</upload>;

    return (
      <div class={[{ 'sp-base-upload--wrap': true }, 'sp-base-upload--' + this.listType]}>
        {this.spTip &&
          ['picture-card', 'video-card'].indexOf(this.listType) !== -1 && (
            <div class="sp-base-upload--type-descriptions">{this.spTip}</div>
          )}
        {this.listType === 'picture-card' || this.listType === 'video-card'
          ? uploadList
          : ''}
        {this.$slots.trigger
          ? [uploadComponent, this.$slots.default]
          : uploadComponent}
        {this.$slots.tip}
        {this.listType !== 'picture-card' && this.listType !== 'video-card'
          ? uploadList
          : ''}

        {this.previewImageUrl && (
          <el-image
            ref="previewImage"
            class="sp-base-upload--preview-image"
            preview-src-list={[this.previewImageUrl]}
          />
        )}
      </div>
    );
  }
};
</script>

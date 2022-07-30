<script>
import { camelCase } from 'lodash';
import ajax from './ajax';
import UploadDragger from './upload-dragger.vue';
import Locale from '@fe/element-sp-ui/src/mixins/locale';
import ElButton from '@fe/element-sp-ui/packages/button';

export default {
  mixins: [Locale],
  inject: ['uploader'],
  components: {
    UploadDragger,
    ElButton
  },
  props: {
    type: String,
    action: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'file'
    },
    data: Object,
    headers: Object,
    withCredentials: Boolean,
    multiple: Boolean,
    accept: String,
    onStart: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    beforeUpload: Function,
    drag: Boolean,
    onPreview: {
      type: Function,
      default: function() {}
    },
    onRemove: {
      type: Function,
      default: function() {}
    },
    fileList: Array,
    autoUpload: Boolean,
    listType: String,
    httpRequest: {
      type: Function,
      default: ajax
    },
    disabled: Boolean,
    limit: Number,
    onExceed: Function,
    fileButtonText: String,
    buttonIcon: String,
    spTip: String | Object
  },

  data() {
    return {
      mouseover: false,
      reqs: {}
    };
  },

  methods: {
    isImage(str) {
      return str.indexOf('image') !== -1;
    },
    handleChange(ev) {
      const files = ev.target.files;

      if (!files) return;
      this.uploadFiles(files);
    },
    uploadFiles(files) {
      if (this.limit && this.fileList.length + files.length > this.limit) {
        this.onExceed && this.onExceed(files, this.fileList);
        return;
      }

      let postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) { postFiles = postFiles.slice(0, 1); }

      if (postFiles.length === 0) { return; }

      postFiles.forEach(rawFile => {
        this.onStart(rawFile);
        if (this.autoUpload) this.upload(rawFile);
      });
    },
    upload(rawFile) {
      this.$refs.input.value = null;

      if (!this.beforeUpload) {
        return this.post(rawFile);
      }

      const before = this.beforeUpload(rawFile);
      if (before && before.then) {
        before.then(processedFile => {
          const fileType = Object.prototype.toString.call(processedFile);

          if (fileType === '[object File]' || fileType === '[object Blob]') {
            if (fileType === '[object Blob]') {
              processedFile = new File([processedFile], rawFile.name, {
                type: rawFile.type
              });
            }
            for (const p in rawFile) {
              if (rawFile.hasOwnProperty(p)) {
                processedFile[p] = rawFile[p];
              }
            }
            this.post(processedFile);
          } else {
            this.post(rawFile);
          }
        }, () => {
          this.onRemove(null, rawFile);
        });
      } else if (before !== false) {
        this.post(rawFile);
      } else {
        this.onRemove(null, rawFile);
      }
    },
    abort(file) {
      const { reqs } = this;
      if (file) {
        let uid = file;
        if (file.uid) uid = file.uid;
        if (reqs[uid]) {
          reqs[uid].abort();
        }
      } else {
        Object.keys(reqs).forEach((uid) => {
          if (reqs[uid]) reqs[uid].abort();
          delete reqs[uid];
        });
      }
    },
    post(rawFile) {
      const { uid } = rawFile;
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.onProgress(e, rawFile);
        },
        onSuccess: res => {
          this.onSuccess(res, rawFile);
          delete this.reqs[uid];
        },
        onError: err => {
          this.onError(err, rawFile);
          delete this.reqs[uid];
        }
      };
      const req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    },
    handleClick() {
      if (!this.disabled) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },
    handleKeydown(e) {
      if (e.target !== e.currentTarget) return;
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.handleClick();
      }
    },
    renderTriggerPictureCard() {
      // icon-image
      const fileButtonText = this.fileButtonText || this.t('el.upload.pictureCardText');
      return (
        <div class="sp-base-upload--trigger-card">
          <i class="sp-icon sp-icon-image"></i>
          {
            <div class="sp-base-upload--trigger-card-txt">{ fileButtonText }</div>
          }
        </div>
      );
    },
    renderTriggerVideoCard() {
      const fileButtonText = this.fileButtonText || this.t('el.upload.videoCardText');
      return (
        <div class="sp-base-upload--trigger-card">
          <i class="sp-icon sp-icon-video"></i>
          {
            <div class="sp-base-upload--trigger-card-txt">{ fileButtonText }</div>
          }
        </div>
      );
    },
    renderTriggerFile() {
      const fileButtonText = this.fileButtonText || this.t('el.upload.fileText');
      let icon = this.buttonIcon ? { icon: this.buttonIcon } : {};
      return (
        <div class="sp-base-upload--trigger-file">
          <el-button { ...{
            props: {
              ...icon
            }
          } } size="small" type="dashed">{ fileButtonText }</el-button>
        </div>
      );
    },
    renderTrigger() {
      const listType = camelCase(this.listType);
      const renderFn = {
        pictureCard: this.renderTriggerPictureCard,
        videoCard: this.renderTriggerVideoCard,
        file: this.renderTriggerFile
      }[listType] || this.renderTriggerFile;
      return this.$slots.default ? this.$slots.default : (
        renderFn ? renderFn() : null
      );
    }
  },

  render(h) {
    let {
      handleClick,
      drag,
      name,
      handleChange,
      multiple,
      accept,
      listType,
      uploadFiles,
      disabled,
      handleKeydown
    } = this;
    const data = {
      class: {
        'sp-base-upload': true
      },
      on: {
      }
    };
    data.class[`sp-base-upload--${listType}`] = true;
    return (
      <div {...data} tabindex="0" >
        <div class="sp-base-upload--trigger-wrap" {...{
          on: {
            click: handleClick,
            keydown: handleKeydown
          }
        }}>
          {
            drag
              ? <upload-dragger {...{
                scopedSlots: {
                  ...this.$scopedSlots,
                  spTip: () => this.spTip
                }
              }}
              disabled={disabled}
              on-file={uploadFiles}
              >{this.renderTrigger()}</upload-dragger>
              : this.renderTrigger()
          }
          <input class="sp-base-upload__input" type="file" ref="input" name={name} on-change={handleChange} multiple={multiple} accept={accept}></input>
        </div>
        {
          this.spTip && (['text', 'picture'].indexOf(this.listType)) > -1 && !drag
            ? (<div class="sp-base-upload--type-descriptions">{ this.spTip }</div>)
            : ''
        }
      </div>
    );
  }
};
</script>

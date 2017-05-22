<template>
  <div>
    <div id="cropper" :style="{ width: cropperWidth + 'px', height: cropperHeight + 'px' }">
      <img :src="previewSrc" :style="{ left: posX + 'px',top: posY + 'px', width: width + 'px', height: height + 'px' }">
    </div>

    <div class="buttons">
      <wv-button type="default">选择图片
         <input type="file" name="file" id="file" @change="fileChange">
      </wv-button>
      <wv-flex :gutter="20" style="margin-top: 25px;">
        <wv-flex-item>
          <wv-button type="warn" @click="cancle">取消</wv-button>
        </wv-flex-item>
        <wv-flex-item>
          <wv-button type="primary" @click="save">保存</wv-button>
        </wv-flex-item>
      </wv-flex>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    mounted () {

    },

    data () {
      return {
        cropperWidth: 250,
        cropperHeight: 250,
        posX: 0,
        posY: 0,
        startX: 0, //一次拖动操作起始时的横坐标
        startY: 0, //一次拖动操作起始时的纵坐标
        width: 0,
        height: 0,
        startWidth: 0, //一次缩放操作起始时的宽度
        startHeight: 0, //一次缩放操作起始时的高度
        previewSrc: '',
        isLoading: false,
      }
    },

    computed: {
      cropData: function () {
        return {
          x: Math.abs(this.posX),
          y: Math.abs(this.posY),
          width: this.width,
          height: this.height,
          cropWidth: this.cropperWidth,
          cropHeight: this.cropperHeight
        }
      }
    },

    methods: {
      // 保存
      save () {
        let files = document.getElementById('file').files;

        if (files.length === 0) {
          return false;
        }

        let oMyForm = new FormData();

        oMyForm.append("cropX", this.cropData.x);
        oMyForm.append("cropY", this.cropData.y);
        oMyForm.append("width", this.cropData.width);
        oMyForm.append("height", this.cropData.height);
        oMyForm.append("cropWidth", this.cropData.cropWidth);
        oMyForm.append("cropHeight", this.cropData.cropHeight);

        // fileInputElement中已经包含了用户所选择的文件
        oMyForm.append("avatar", files[0]);

        this.isLoading = true;
        this.axios.post('user/avatar', oMyForm).then(function (response) {
          this.isLoading = false;

          let data = response.data;

          if (data.status) {
            this.$root.success('登录成功');

            setTimeout(() => {
              this.$router.push('/profile');
            }, 1000);
          } else {
            this.$root.error(data.info);
          }
        }, function (response) {
          this.isLoading = false;

          this.error('设置失败');
        });
      },

      // 取消
      cancle () {
        this.$router.push('/profile');
      },

      // 选择图片
      fileChange () {
        let imageFile = document.getElementById('file').files[0];

        window.URL = window.URL || window.webkitURL;

        this.previewSrc = window.URL.createObjectURL(imageFile);

        //取出选择的图片的原始尺寸
        let img = new Image();

        let _this = this;
        img.onload = function () {
          let originalWidth = this.width;
          let originalHeight = this.height;

          // 根据原始宽高设置预览图片的宽和高
          if (originalWidth >= originalHeight) {
            _this.height = _this.cropperHeight + 50;
            _this.width = parseInt(originalWidth * _this.height / originalHeight);
          } else {
            _this.width = _this.cropperWidth + 50;
            _this.height = parseInt(originalHeight * _this.width / originalWidth);
          }

          _this.startWidth = _this.width;
          _this.startHeight = _this.height;

          // 居中
          _this.posX = -parseInt((_this.width - _this.cropperWidth) / 2);
          _this.posY = -parseInt((_this.height - _this.cropperHeight) / 2);
          _this.startX = _this.posX;
          _this.startY = _this.posY;
        };
        img.src = this.previewSrc;
      }
    },

    beforeDestroy () {
      //
    }
  }
</script>

<style scoped lang="scss">
  #cropper {
    display: block;
    overflow: hidden;
    margin: 20px auto;
    position: relative;
    background-color: #fff;
    border: 1px dotted #bbb;

    img {
      position: absolute;
    }
  }

  .buttons {
    display: block;
    overflow: hidden;
    padding: 1rem;

    #file {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
    }
  }
</style>

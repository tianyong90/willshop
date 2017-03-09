<template>
    <div>
        <div id="cropper" :style="{ width: cropperWidth + 'px', height: cropperHeight + 'px' }">
            <img :src="previewSrc" v-touch:pan="onPan" v-touch:pinch="onPinch" :style="{ left: posX + 'px',top: posY + 'px', width: width + 'px', height: height + 'px' }">
        </div>

        <div class="buttons">
            <x-button type="default">选择图片
                <input type="file" name="file" id="file" @change="fileChange">
            </x-button>
            <x-button type="primary" @click="save">保存</x-button>
            <x-button type="warn" @click="cancle">取消</x-button>
        </div>

        <loading :show="isLoading"></loading>
    </div>
</template>

<script>
    import VueTouch from 'vue-touch';
    Vue.use(VueTouch);

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
                var files = document.getElementById('file').files;

                if (files.length === 0) {
                    return false;
                }

                var oMyForm = new FormData();

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

                    var data = response.data;

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
                var imageFile = document.getElementById('file').files[0];

                window.URL = window.URL || window.webkitURL;

                this.previewSrc = window.URL.createObjectURL(imageFile);

                //取出选择的图片的原始尺寸
                var img = new Image();

                var _this = this;
                img.onload = function () {
                    var originalWidth = this.width;
                    var originalHeight = this.height;

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
                    _this.posX = - parseInt((_this.width - _this.cropperWidth) / 2);
                    _this.posY = - parseInt((_this.height - _this.cropperHeight) / 2);
                    _this.startX = _this.posX;
                    _this.startY = _this.posY;
                };
                img.src = this.previewSrc;
            },

            // 图片拖动处理
            onPan (e) {
                if (e.eventType === 2) {
                    // 限制移动时裁剪区不出现空白
                    var targetX = this.startX + e.deltaX;
                    var targetY = this.startY + e.deltaY;

                    if (targetX <= 0 && this.cropperWidth - targetX <= this.width) {
                    this.posX = targetX;
                    }

                    if (targetY <= 0 && this.cropperHeight - targetY <= this.height) {
                    this.posY = targetY;
                    }
                } else if(e.eventType === 4) {
                    this.startX = this.posX;
                    this.startY = this.posY;
                }
            },

            // 图片缩放处理
            onPinch (e) {
                if (e.eventType === 2) {
                    var targetWidth = parseInt(this.startWidth * e.scale);
                    var targetHeight = parseInt(this.startHeight * e.scale);

                    if (this.cropperWidth - this.posX <= this.width) {
                    this.width = targetWidth;
                    }

                    if (this.cropperHeight - this.posY <= this.height) {
                    this.height = targetHeight;
                    }
                } else if(e.eventType === 4) {
                    this.startWidth = this.width;
                    this.startHeight = this.height;
                }
            },

            destroy () {

                console.log('avatar destroy');
            }
        },

        beforeDestroy () {
            this.destroy();
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
        border: 1px doted #ccc;

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

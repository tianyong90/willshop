<template>
  <div class="login">
    <div class="login-form">
      <h1 class="title">WILLSHOP</h1>
      <el-input type="text"
                placeholder="请输入用户名"
                v-model="loginForm.name"
                @keyup.native.enter="login"
      />
      <el-input type="password"
                placeholder="请输入登录密码"
                v-model="loginForm.password"
                @keyup.native.enter="login"
      />
      <el-button class="btn-submit"
                 type="primary"
                 @click.native="login"
                 :disabled="false"
      >登录</el-button>

      <div class="icon-wechat-login"
           @click="scanLogin"
      >
        <i class="iconfont icon-wechat-circle">
      </i></div>
    </div>

    <el-dialog title="微信扫码登录"
               size="tiny"
               :modal-append-to-body="false"
               v-model="dialogQrcodeVisible"
    >
      <img :src="loginQrcode" alt="" class="qrcode"/>
    </el-dialog>
  </div>
</template>

<script>
  import config from '../../config'
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        loginForm: {
          name: 'admin',
          password: '123456'
        },
        loginQrcode: null,
        dialogQrcodeVisible: false
      }
    },

    mounted () {
    },

    methods: {
      ...mapActions([
        'storeUserToLocal'
      ]),

      login () {
        this.axios.post('login', this.loginForm).then((response) => {
          console.log(response)

          localStorage.setItem(config.authTokenKey, response.data.access_token)

          this.$router.push('/')
        }).catch((error) => {
          this.$message({
            message: error.response.data,
            type: 'error'
          })
        })
      },

      scanLogin () {
        if (this.loginQrcode === null) {
          this.axios.get('login-qrcode').then((response) => {
            this.loginQrcode = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + response.data.ticket
            this.dialogQrcodeVisible = true
          }).catch((error) => {
            console.log(error)
          })
        } else {
          this.dialogQrcodeVisible = true
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .login {
    position: fixed;
    display: flex;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    background: #324057;
    background-size: cover;

    .login-form {
      display: block;
      width: 360px;
      background-color: rgba(0, 0, 0, .6);
      padding: 40px;
      border-radius: 10px;

      .title {
        color: #fff;
        font-size: 2rem;
        line-height: 2rem;
        text-align: center;
        font-family: 'Microsoft Yahei', sans-serif;
        font-weight: 400;
        margin-bottom: 1.5em;
      }

      .el-input {
        display: block;
        margin: 1rem 0;
      }

      .btn-submit {
        display: block;
        overflow: hidden;
        width: 100%;
        margin-top: 3rem;
      }
    }
  }

  .icon-wechat-login {
    display: block;
    overflow: hidden;
    text-align: center;
    margin-top: 20px;

    .iconfont {
      color: #fff;
      font-size: 40px;
      cursor: pointer;

      &:hover {
        color: darken(#fff, 30%);
      }
    }
  }

  .qrcode {
    display: block;
    margin: 0 auto;
    width: 300px;
    height: 300px;
  }
</style>

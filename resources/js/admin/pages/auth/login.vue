<template>
  <div class="login">
    <el-form :model="loginForm" class="login-form">
      <h1 class="title">ADMIN</h1>
      <el-input
        type="text"
        placeholder="请输入用户名"
        v-model="loginForm.name"
        @keyup.native.enter="login"
      />
      <el-input
        type="password"
        placeholder="请输入登录密码"
        v-model="loginForm.password"
        @keyup.native.enter="login"
      />
      <el-button
        class="btn-submit"
        type="primary"
        @click.native="login"
        :disabled="false"
      >登录
      </el-button>
    </el-form>
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
          password: '12345678'
        },
        loginQrcode: null,
        dialogQrcodeVisible: false
      }
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
    background: #efefef;
    background-size: cover;

    .login-form {
      display: block;
      width: 360px;
      background-color: rgba(0, 0, 0, .5);
      padding: 40px;
      border-radius: 10px;

      .title {
        color: #fff;
        font-size: 2rem;
        line-height: 2rem;
        text-align: center;
        font-family: 'Microsoft Yahei', sans-serif;
        font-weight: 400;
        margin: 0 0 1em 0;
      }

      .el-input {
        display: block;
        margin: 1rem 0;
      }

      .btn-submit {
        display: block;
        overflow: hidden;
        width: 100%;
        margin-top: 2rem;
      }
    }
  }
</style>

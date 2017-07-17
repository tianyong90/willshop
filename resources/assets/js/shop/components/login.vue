<template>
  <div class="full-bg">
    <input v-model.trim="user.name" placeholder="请输入用户名">
    <input type="password" v-model.trim="user.password" placeholder="请输入登录密码">
    <wv-button class="btn-login" type="primary" @click.native="login">登录</wv-button>

    <wv-button class="btn-to-register" type="primary" plain mini @click.native="$router.push('/register')">注册</wv-button>
  </div>
</template>

<script>
  import appConfig from '../config'

  export default {
    data () {
      return {
        user: {
          name: '',
          password: ''
        }
      }
    },

    methods: {
      login () {
        this.axios.post('login', this.user).then(response => {
          // 登录成功之后保存 JWT token
          localStorage.setItem(appConfig.jwtTokenName, response.data.token)

          // 登录状态设置为已经登录
          this.$store.commit('UPDATE_IS_LOGIN', true)

          this.$root.success('登录成功')

          setTimeout(() => {
            let redirectPath = this.$route.query.redirect ? this.$route.query.redirect : '/'

            // 登录成功后跳转至之前想要进入的页面
            this.$router.push(redirectPath)
          }, 1000)
        }).catch(error => {
          this.$root.error(error.response.data)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  $color: red;
  $borderRadius: 5px;

  .full-bg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-image: url('../../../img/login-bg.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;

    input {
      display: block;
      width: 75%;
      height: 40px;
      border-radius: $borderRadius;
      border: 1px solid #999;
      background-color: rgba(255, 255, 255, 0.5);
      margin: 5px 0;
      text-indent: 1em;

      &:active {
        outline: none;
      }
    }
  }

  .btn-login {
    display: block;
    width: 75%;
    margin-top: 20px;
  }

  .btn-to-register {
    display: block;
  }
</style>

<template>
  <div id="login">
    <img src="/img/avatar.jpg" alt="" id="avatar">
    <div class="login-form">
      <input v-model="user.name" placeholder="请输入用户名">
      <input type="password" v-model="user.password" placeholder="请输入登录密码">
    </div>
    <wv-button class="btn-login" type="primary" @click.native="login">登录</wv-button>

    <wv-button class="btn-to-register" type="primary" plain mini @click.native="$router.push('/register')">注册</wv-button>
  </div>
</template>

<script>
  import appConfig from '../config';

  export default {
    mounted () {
    },

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
          localStorage.setItem(appConfig.jwtTokenName, response.data.token);

          // 登录状态设置为已经登录
          this.$store.commit('UPDATE_IS_LOGIN', true);

          this.$root.success('登录成功');

          setTimeout(() => {
            let redirectPath = this.$route.query.redirect ? this.$route.query.redirect : '/';

            // 登录成功后跳转至之前想要进入的页面
            this.$router.push(redirectPath);
          }, 1000);
        }, response => {
          this.$root.error(response.data.message);
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  $color: red;
  $borderRadius: 5px;

  #avatar {
    display: block;
    width: 85px;
    height: 85px;
    border-radius: 25px;
    margin: 30px auto;
    border: 1px solid #ccc;
    padding: 5px;
  }

  .login-form {
    display: block;
    overflow: hidden;
    font-size: 18px;

    input {
      display: block;
      width: 75%;
      height: 40px;
      margin: 20px auto;
      padding: 0 10px;
      border-radius: $borderRadius;
      border: 1px solid #999;

      &:active {
        outline: none;
      }
    }
  }

  .btn-login {
    display: block;
    width: 90%;
    margin: 20px auto 50px;
  }

  .btn-to-register {
    display: block;
    margin: 20px auto;
  }
</style>

<template>
  <div id="register">
    <wv-group title="注册信息">
      <wv-input label="用户名" placeholder="请输入用户名" v-model="user.name"></wv-input>
      <wv-input label="手机号" placeholder="请输入手机号" v-model="user.mobile"></wv-input>
      <wv-input type="password" label="密码" placeholder="请输入登录密码" v-model="user.password"></wv-input>
      <wv-input type="password" label="确认密码" placeholder="请再次输入登录密码" v-model="user.password_confirmation"></wv-input>
    </wv-group>

    <wv-button class="btn-register" type="primary" @click.native="register" :disabled="!canSubmit">注册</wv-button>

    <wv-button class="btn-to-login" type="primary" plain mini @click.native="$router.push('/login')">使用已有账号登录</wv-button>
  </div>
</template>

<script>
  import config from '../config.js'
  export default {
    data () {
      return {
        user: {
          name: '',
          mobile: '',
          password: '',
          password_confirmation: ''
        }
      }
    },

    computed: {
      canSubmit: function () {
        return this.user.password === this.user.password_confirmation
      }
    },

    methods: {
      register () {
        this.axios.post('register', this.user).then(response => {
          // 注册成功之后保存 JWT token
          localStorage.setItem(config.jwtTokenName ,response.data.token)

          // 登录状态设置为已经登录
          this.$store.commit('UPDATE_IS_LOGIN', true)

          this.$root.success('登录成功')

          setTimeout(() => {
            // 注册成功后跳转至用户中心页面
            this.$router.push('/user')
          }, 1000)
        }, response => {
          this.$root.error(response.data.error)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .btn-register {
    display: block;
    width: 90%;
    margin: 20px auto 50px;
  }

  .btn-to-login {
    display: block;
    margin: 20px auto;
  }
</style>

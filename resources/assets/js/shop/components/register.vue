<template>
  <div>
    <div class="register-form">
      <input type="text" v-model="user.name" placeholder="请输入用户名">
      <input type="mobile" v-model="user.mobile" placeholder="请输入手机号">
      <input type="password" v-model="user.password" placeholder="请输入登录密码">
      <input type="password" v-model="user.password_confirmation" placeholder="请再次输入登录密码">
      <button id="register" @click="register" :disabled="!canSubmit">注册</button>
    </div>

    <router-link to="/login" id="btn-to-register">使用已有账号登录</router-link>
  </div>
</template>

<script>
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
        return this.user.password === this.user.password_confirmation;
      }
    },

    methods: {
      register () {
        this.axios.post('register', this.user).then(response => {
          // 注册成功之后保存 JWT token
          localStorage.token = response.data.token;

          // 登录状态设置为已经登录
          this.$store.commit('UPDATE_IS_LOGIN', true);

          this.$root.success('登录成功');

          setTimeout(() => {
            // 注册成功后跳转至用户中心页面
            this.$router.push('/user');
          }, 1000);
        }, response => {
          this.$root.error(response.data.error);
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  $color: red;
  $borderRadius: 5px;

  .register-form {
    display: block;
    overflow: hidden;
    input {
      display: block;
      width: 75%;
      height: 35px;
      margin: 10px auto;
      padding: 0 10px;
      border-radius: $borderRadius;
    }

    button {
      display: block;
      background-color: $color;
      width: 75%;
      height: 40px;
      line-height: 40px;
      color: #fff;
      border: none;
      border-radius: $borderRadius;
      margin: 20px auto;
      padding: 0 10px;

      &[disabled] {
        background-color: #BBB;
        color: #333;
      }
    }
  }

  #btn-to-register {
    display: block;
    height: 35px;
    margin: 50px auto 0;
    color: #444;
    font-size: 15px;
    text-align: center;
    line-height: 35px;
  }
</style>

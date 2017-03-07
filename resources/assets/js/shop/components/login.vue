<template>
  <div>
    <img src="/img/avatar.jpg" alt="" id="avatar">
    <div class="login-form">
        <input type="text" v-model="user.name" placeholder="请输入用户名">
        <input type="password" v-model="user.password" placeholder="请输入登录密码">
        <button id="login" @click="login" :disabled="false">登录</button>
    </div>

    <v-link to="/register" id="btn-register">注册</v-link>
  </div>
</template>

<script>
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
                    localStorage.setItem('token', response.data.token);

                    // 登录状态设置为已经登录
                    dispatch('UPDATE_IS_LOGIN', true);

                    this.$root.success('登录成功');

                    setTimeout(() => {
                        let redirectPath = this.$route.query.redirect ? this.$route.query.redirect : '/';

                        // 登录成功后跳转至之前想要进入的页面
                        this.$route.router.go(redirectPath);
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

    #btn-register {
        display: block;
        height: 40px;
        width: 70px;
        margin: 50px auto 0;
        background-color: #5d5de5;
        border-radius: $borderRadius;
        color: #fff;
        font-size: 15px;
        text-align: center;
        line-height: 40px;
    }
</style>

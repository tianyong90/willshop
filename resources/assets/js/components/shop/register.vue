<template>
    <div class="login-form">
        <input type="text" v-model="user.name" placeholder="请输入用户名">
        <input type="password" v-model="user.password" placeholder="请输入登录密码">
        <input type="password" v-model="user.password" placeholder="请输入登录密码">
        <input type="password" v-model="user.password" placeholder="请输入登录密码">
        <button id="login" @click="login" :disabled="!canLogin">注册</button>
    </div>

    <a v-link="{ path:'/login' }" id="btn-register">使用已有账号登录</a>
</template>

<script>
    export default {
        ready: function () {
            
        },

        data: function () {
            return {
                user: {}
            }
        },

        computed: {
            canLogin: function () {
                return this.user.name && this.user.password.length >= 6;
            }
        },

        methods: {
            login: function () {
                this.$http.post('login', this.user).then(response => {
                    console.log(response.body);

                    this.$route.router.go({ path: '/home' });
                });
            }
        }
    }
</script>

<style lang="sass">
    /*$grandientColor1: #1e5eb5;
    $grandientColor2: #8bcffe;
    $grandientColor3: #58b5fe;

    html {
        height: 100%;
    }

    body {
        background: -webkit-linear-gradient($grandientColor1, $grandientColor2, $grandientColor2);
        background: -o-linear-gradient($grandientColor1, $grandientColor2, $grandientColor2);
        background: -moz-linear-gradient($grandientColor1, $grandientColor2, $grandientColor2);
        background: linear-gradient($grandientColor1, $grandientColor2, $grandientColor2);
    }*/
</style>

<style scoped lang="sass">
    $color: red;
    
    .login-form {
        display: block;
        overflow: hidden;
        
        input {
            display: block;
            width: 75%;
            height: 35px;
            margin: 10px auto;
            padding: 0 10px;
            border-radius: 18px;
        }

        button {
            display: block;
            background-color: $color;
            width: 75%;
            height: 35px;
            line-height: 40px;
            color: #fff;
            border: none;
            border-radius: 18px;
            margin: 20px auto;

            &[disabled] {
                background-color: #ccc;
            }
        }
    }

    #btn-register {
        display: block;
        height: 35px;
        width: 70px;
        margin: 50px auto 0;
        background-color: #00c;
        border-radius: 18px;
        color: #fff;
        font-size: 15px;
        text-align: center;
        line-height: 35px;
    }
</style>

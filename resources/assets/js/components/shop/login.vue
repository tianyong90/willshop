<template>
    <div class="login-form">
        <input type="text" v-model="user.name" placeholder="请输入用户名">
        <input type="password" v-model="user.password" placeholder="请输入登录密码">
        <button @click="login" :disabled="!canLogin">登录</button>
    </div>
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
                    console.log(response.json());

                    this.$route.router.go({ path: '/home' });
                });
            }
        }
    }
</script>

<style scoped lang="sass">
    $color: red;
    $color-hover: grayscale($color);

    body {
        background-color: #fff;
    }

    .login-form {
        display: block;
        width: 80%;
        margin: 20px auto;
        
        input {
            display: block;
            width: 100%;
            height: 40px;
            margin-bottom: 15px;
            padding: 0 10px;
            border-radius: 5px;
        }

        button {
            display: block;
            background-color: $color;
            width: 100%;
            height: 40px;
            line-height: 40px;
            color: #fff;
            border: none;
            margin: 0;

            &[disabled] {
                background-color: #ccc;
            }
        }
    }
</style>

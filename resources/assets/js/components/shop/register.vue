<template>
    <validator name="myValidation">
        <div class="register-form">
            <input type="text" v-model="user.name" placeholder="请输入用户名" v-validate:name="{required: true, minlength: 3, maxlength: 20}">
            <input type="mobile" v-model="user.mobile" placeholder="请输入手机号" v-validate:mobile="{required: true, pattern: {rule: '/^0?(13|14|15|18)[0-9]{9}$/'}}">
            <input type="password" v-model="user.password" placeholder="请输入登录密码" v-validate:password="{required: true, confirmed: true, minlength: 6, maxlength: 20}">
            <input type="password" v-model="user.password_confirmation" placeholder="请再次输入登录密码" v-validate:password_confirmation="{required: true, minlength: 6, maxlength: 20}">
            <button id="register" @click="register" :disabled="!canSubmit">注册</button>
        </div>
    </validator>

    <a v-link="{ path:'/login' }" id="btn-to-register">使用已有账号登录</a>
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
                return this.$myValidation.valid && (this.user.password === this.user.password_confirmation);
            }
        },

        methods: {
            register () {
                this.$http.post('register', this.user).then(response => {
                    // 注册成功之后保存 JWT token
                    localStorage.token = response.body.token;

                    // 登录状态设置为已经登录
                    dispatch('UPDATE_IS_LOGIN', true);

                    this.$root.success('登录成功');

                    setTimeout(() => {
                        // 注册成功后跳转至用户中心页面
                        this.$route.router.go({ path: '/user' });
                    }, 1000);
                }, response => {
                    this.$root.error(response.body.error);
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
    .register-form {
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
<template>
    <img src="/img/avatar.jpg" alt="" id="avatar">
    <validator name="myValidation">
        <div class="login-form">
            <input type="text" v-model="user.name" placeholder="请输入用户名" v-validate:name="{required: true, minlength: 3, maxlength: 20}">
            <input type="password" v-model="user.password" placeholder="请输入登录密码" v-validate:password="{required: true, minlength: 6, maxlength: 20}">
            <button id="login" @click="login" :disabled="!$myValidation.valid">登录</button>
        </div>
    </validator>

    <a v-link="{ path:'/register' }" id="btn-register">注册</a>
</template>

<script>
    import VueValidator from 'vue-validator';
    Vue.use(VueValidator);    

    export default {
        ready () {
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
                this.$http.post('login', this.user).then(response => {
                    // 登录成功之后保存 JWT token
                    localStorage.setItem('token', response.body.token);

                    // 登录状态设置为已经登录
                    dispatch('UPDATE_IS_LOGIN', true);

                    this.$root.success('登录成功');

                    setTimeout(() => {
                        let redirectPath = this.$route.query.redirect ? this.$route.query.redirect : '/home';

                        // 登录成功后跳转至之前想要进入的页面
                        this.$route.router.go(redirectPath);
                    }, 1000);
                }, response => {
                    this.$root.error(response.body.message);
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

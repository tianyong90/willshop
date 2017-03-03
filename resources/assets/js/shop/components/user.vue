<template>
    <div class="user-profile" v-link="{ path:'profile' }">
        <img class="avatar" :src="user.avatar || '/img/avatar.jpg'">
        <div class="username">{{ user.name }}</div>
        <div class="mobile">{{ user.mobile }}</div>
    </div>

    <div id="card">
        <card>
            <div slot="content" class="card-demo-flex card-demo-content01">
                <div class="vux-1px-l vux-1px-r" v-link="">
                    <span>1130</span>
                    <span class="text">我的余额</span>
                </div>
                <div class="vux-1px-r" v-link="">
                    <span>15</span>
                    <span class="text">我的积分</span>
                </div>
                <div class="vux-1px-r" v-link="">
                    <span>0</span>
                    <span class="text">我的红包</span>
                </div>
            </div>
        </card>
    </div>

    <group>
        <cell title="我的订单" is-link v-link="{ path:'/order-list' }">
            <i class="icon iconfont" slot="icon">&#xe616;</i>
        </cell>
        <cell title="收货地址" is-link v-link="{ path:'/address' }">
            <i class="icon iconfont" slot="icon">&#xe602;</i>
        </cell>
        <cell title="我的收藏" is-link v-link="{ path:'/favourite' }">
            <i class="icon iconfont" slot="icon">&#xe607;</i>
        </cell>
    </group>

    <group>
        <cell title="使用帮助" is-link v-link="{ path:'/help' }">
            <i class="icon iconfont" slot="icon">&#xe60e;</i>
        </cell>
        <cell title="关于我们" is-link v-link="{ path:'/about-us' }">
            <i class="icon iconfont" slot="icon">&#xe617;</i>
        </cell>
    </group>

    <x-button id="btn-logout" type="warn" @click="logout">退出登录</x-button>
</template>

<script>
    import { Cell,Group,Card,XButton } from 'vux';

    export default {
        components: {
            Cell,
            Group,
            Card,
            XButton,
        },

        mounted () {
            this.getUser();
        },

        data () {
            return {
                user: {}
            }
        },

        methods: {
            getUser () {
                this.axios.get('current-user').then(response => {
                    this.$set('user', response.data.user);
                });
            },

            logout () {
                // 登录成功之后保存 JWT token
                localStorage.setItem('token', '');

                // 登录状态设置为已经登录
                dispatch('UPDATE_IS_LOGIN', false);

                this.$root.success('退出登录');

                setTimeout(() => {
                    // 退出登录后跳转至首页
                    this.$route.router.go({ path: '/' });
                }, 1000);
            }
        }
    }
</script>

<style scoped lang="sass">
    .user-profile {
        display: block;
        overflow: hidden;
        background-color: #2696cb;
        padding: 20px;
        .avatar {
            display: block;
            float: left;
            width: 70px;
            height: 70px;
            border-radius: 70px;
            margin-right: 20px;
        }
        .username {
            display: block;
            color: #fff;
            font-size: 18px;
        }
        .mobile {
            display: block;
            color: #fff;
            font-size: 15px;
        }
    }
    
    #card {
        .text {
            display: block;
            color: #777;
            font-size: 14px;
            font-weight: 400;
        }
    }
    
    .icon {
        display: inline-block;
        float: left;
        margin-right: 5px;
        color: #777;
    }
    
    .card-demo-flex {
        display: flex;
    }
    
    .card-demo-content01 {
        padding: 10px 0;
    }
    
    .card-padding {
        padding: 15px;
    }
    
    .card-demo-flex > div {
        flex: 1;
        text-align: center;
        font-size: 12px;
    }
    
    .card-demo-flex span {
        color: #f74c31;
    }
    
    #btn-logout {
        display: block;
        margin-top: 40px;
        width: 80%;
    }
</style>
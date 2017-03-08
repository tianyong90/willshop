<template>
    <div>
        <router-link class="user-profile" tag="div" to="{ path:'profile' }">
            <img class="avatar" :src="user.avatar || '/img/avatar.jpg'">
            <div class="username">{{ user.name }}</div>
            <div class="mobile">{{ user.mobile }}</div>
        </router-link>

        <div id="card">
            <router-link class="" tag="div" to="">
                <span>1130</span>
                <span class="text">我的余额</span>
            </router-link>
            <router-link class="" tag="div" to="">
                <span>15</span>
                <span class="text">我的积分</span>
            </router-link>
            <router-link class="" tag="div" to="">
                <span>0</span>
                <span class="text">我的红包</span>
            </router-link>
        </div>

        <wv-group>
            <wv-cell title="我的订单" is-link to="order-list">
                <i class="icon iconfont icon-home" slot="icon"></i>
            </wv-cell>
            <wv-cell title="收货地址" is-link to="address">
                <i class="icon iconfont icon-home" slot="icon"></i>
            </wv-cell>
            <wv-cell title="我的收藏" is-link to="favourite">
                <i class="icon iconfont icon-home" slot="icon"></i>
            </wv-cell>
        </wv-group>

        <wv-group>
            <wv-cell title="使用帮助" is-link to="help">
                <i class="icon iconfont icon-home" slot="icon"></i>
            </wv-cell>
            <wv-cell title="关于我们" is-link to="about-us">
                <i class="icon iconfont icon-home" slot="icon"></i>
            </wv-cell>
        </wv-group>

        <wv-button class="btn-logout" type="warn" @click.native="logout">退出登录</wv-button>
    </div>
</template>

<script>
    export default {
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
                    // this.$set('user', response.data.user);
                });
            },

            logout () {
                // 清除 jwt-token
                localStorage.removeItem('willshop_token');

                // 登录状态设置为已经登录
                this.$store.commit('UPDATE_IS_LOGIN', false);

                this.$router.replace('/');
            }
        }
    }
</script>

<style scoped lang="scss">
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

    .btn-logout {
        display: block;
        margin-top: 40px;
        width: 80%;
    }
</style>

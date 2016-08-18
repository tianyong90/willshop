<template>
    <div class="user-profile" v-link="{ path:'profile' }">
        <img class="avatar" >
        <div class="username">bontian</div>
        <div class="mobile">13227281234</div>
    </div>

    <div>
        <card>
            <div slot="content" class="card-demo-flex card-demo-content01">
                <div class="vux-1px-l vux-1px-r" v-link="{ path:'/' }">
                    <span>1130</span>
                    <br/>
                    我的余额
                </div>
                <div class="vux-1px-r" v-link="{ path:'/' }">
                    <span>15</span>
                    <br/>
                    我的积分
                </div>
                <div class="vux-1px-r" v-link="{ path:'/' }">
                    <span>0</span>
                    <br/>
                    我的红包
                </div>
            </div>
        </card>
    </div>

    <group>
        <cell title="收货地址" is-link v-link="{ path:'/address' }">
            <i class="icon iconfont" slot="icon">&#xe608;</i>
        </cell>
        <cell title="我的收藏" is-link v-link="{ path:'/address' }">
            <i class="icon iconfont" slot="icon">&#xe608;</i>
        </cell>
    </group>

    <group>
        <cell title="积分商城" is-link v-link="{ path:'/address' }">
            <i class="icon iconfont" slot="icon">&#xe608;</i>
        </cell>
        <cell title="抢红包" is-link v-link="{ path:'/address' }">
            <i class="icon iconfont" slot="icon">&#xe608;</i>
        </cell>
    </group>

    <group>
        <cell title="使用帮助" is-link v-link="{ path:'/address' }">
            <i class="icon iconfont" slot="icon">&#xe608;</i>
        </cell>
        <cell title="关于我们" is-link v-link="{ path:'/address' }">
            <i class="icon iconfont" slot="icon">&#xe608;</i>
        </cell>
    </group>
</template>

<script>
    import { Cell,Group,Card } from 'vux';

    export default {
        components: {
            Cell,
            Group,
            Card
        },
        ready: function () {
            this.fetchProducts();
        },

        data: function () {
            return {
                products: []
            }
        },

        methods: {
            fetchProducts: function () {
                this.$http.get('/api/product').then(response => {
                    this.$set('products', response.json());
                });
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
        background-color: #0c0;
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

.icon {
    display: inline-block;
    float: left;
    margin-right: 5px;
    color: #f00;
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
</style>

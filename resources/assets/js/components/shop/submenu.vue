<template>
    <div id="tabbar">
        <tabbar>
            <tabbar-item v-link="{ path:'/' }">
                <span class="icon icon-home" slot="icon"></span>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item v-link="{ path:'/cart' }">
                <span class="icon icon-shopping-cart" slot="icon"></span>
                <span slot="label">购物车</span>
            </tabbar-item>
            <tabbar-item v-link="{ path:'/order' }">
                <span class="icon icon-info" slot="icon"></span>
                <span slot="label">订单</span>
            </tabbar-item>
            <tabbar-item v-link="{ path:'/user' }">
                <span class="icon icon-user" slot="icon"></span>
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import { Tabbar,TabbarItem } from 'vux';

    export default {
        components: {
            Tabbar,
            TabbarItem
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

<style lang="sass">
    #tabbar .weui_tabbar {
        position: fixed;
        bottom: 0;

        .weui_tabbar_item.weui_bar_item_on {
            .icon {
                color: #09bb07;
            }
        }
    }
</style>

<template>
    <div id="tabbar">
        <tabbar>
            <tabbar-item v-link="{ path:'/' }">
                <i class="icon iconfont" slot="icon">&#xe608;</i>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item v-link="{ path:'/cart' }">
                <i class="icon iconfont" slot="icon">&#xe602;</i>
                <span slot="label">购物车</span>
            </tabbar-item>
            <tabbar-item v-link="{ path:'/order' }">
                <i class="icon iconfont" slot="icon">&#xe60d;</i>
                <span slot="label">订单</span>
            </tabbar-item>
            <tabbar-item v-link="{ path:'/user' }">
                <i class="icon iconfont" slot="icon">&#xe611;</i>
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
        },

        data: function () {
            return {
            }
        },

        methods: {
        }
    }
</script>

<style lang="sass">
    #tabbar .weui_tabbar {
        position: fixed;
        bottom: 0;

        .weui_tabbar_item {
            .icon {
                font-size: 20px;
                color: #666;
            }
        }

        .weui_tabbar_item.weui_bar_item_on {
            .icon {
                color: #09bb07;
            }
        }
    }
</style>

<template>
    
    addrss
    <footer>
        <x-button type="primary">添加地址</x-button>
    </footer>
</template>

<script>
    import { Cell,Group,Card,XButton } from 'vux';

    export default {
        components: {
            Cell,
            Group,
            Card,
            XButton
        },

        ready: function () {
            this.fetchProducts();

            // 商品详情页隐藏询问主菜单
            this.$root.hideMainmenu();
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
            },

            destroy: function () {
                // 切换至其他页面时将隐藏的主菜单显示
                this.$root.showMainmenu();

                console.log('product destroy');
            }
        },

        beforeDestroy: function () {
            this.destroy();
        }
    }
</script>

<style scoped lang="sass">
    footer {
        display: block;
        overflow: hidden;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 1000;
        background-color: #fff;
        padding: 15px 0;

        button {
            display: block;
            width: 80%;
            margin: 0 auto;
        }
    }
</style>

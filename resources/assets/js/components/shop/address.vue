<template>
    
    
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
    footer {
        display: block;
        overflow: hidden;
        position: fixed;
        bottom: 200px;
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

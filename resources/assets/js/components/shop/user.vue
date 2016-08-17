<template>
    <group>
        <cell title="收货地址" value="value"></cell>
        <cell title="title" value="value"></cell>
        <cell title="title" value="value"></cell>
        <cell title="title" value="value"></cell>
    </group>

    <group>
        <cell title="收货地址" value="value"></cell>
        <cell title="title" value="value"></cell>
        <cell title="title" value="value"></cell>
        <cell title="关于我们" value="value"></cell>
    </group>
</template>

<script>
    import { Cell,Group } from 'vux';

    export default {
        components: {
            Cell,
            Group
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

</style>

<template>
    <group>
        <cell title="头像"></cell>
        <cell title="用户名"></cell>
    </group>

    <group title="账号安全">
        <cell title="登录密码"></cell>
        <cell title="支付密码"></cell>
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

</style>

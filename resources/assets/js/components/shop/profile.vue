<template>
    <group>
        <cell title="头像">
            <img class="avatar" src="/img/avatar.jpg" alt="">
        </cell>
        <cell title="用户名" value="admin"></cell>
    </group>

    <group title="账号安全">
        <cell title="登录密码" is-link v-link="{path:'/password'}"></cell>
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
        ready () {
            this.fetchProducts();
        },

        data () {
            return {
                products: []
            }
        },

        methods: {
            fetchProducts () {
                this.$http.get('/api/product').then(response => {
                    this.$set('products', response.body);
                });
            }
        }
    }
</script>

<style scoped lang="sass">
    .avatar {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 20px;

    }
</style>

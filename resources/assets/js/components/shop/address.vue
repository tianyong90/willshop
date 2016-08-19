<template>
    
    addres
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

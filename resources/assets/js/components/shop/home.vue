<template>

</template>

<script>
    export default {
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

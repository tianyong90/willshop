<template>
    <ul class="my-product-list">
        <li v-for="product in products">
            <span>{{ product.name }}</span>
        </li>
    </ul>
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

<style>
    .my-product-list {
        color: red;
        font-size: 20px;
        list-style: none;
    }
</style>


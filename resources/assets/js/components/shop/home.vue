<template>
    <ul class="my-product-list">
        <li v-for="product in products">
            <a v-link="{ path: '/' }">
                <span>{{ product.name }}</span>
                <span class="time">{{ product.created_at }}</span>
            </a>
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

<style lang="sass">
    $color: red;
    $color-hover: grayscale($color);

    .my-product-list {
        color: $color;
        font-size: 20px;
        list-style: none;
        padding: 20px;

        li {
            display: block;
            padding: 5px;
            border-bottom: 1px dashed grey;

            a {
                color: $color;
                text-decoration: none;
                display: block;

                &:hover {
                    color: $color-hover;
                }
            }

            .time {
                display: inline-block;
                float: right;
                color: grey;
            }
        }
    }
</style>

<template>
    <div>order list</div>
</template>

<script>
    export default {
        mounted () {
            this.getOrders();
        },

        data () {
            return {
                orders: []
            }
        },

        methods: {
            getOrders () {
                this.axios.get('order').then(response => {
                    this.orders = response.data;
                }, response => {
                    console.log(response);
                });
            }
        }
    }
</script>

<style lang="scss">
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

<template>
    <button @click="login">test</button>
</template>

<script>
    export default {
        ready: function () {
            
        },

        data: function () {
            return {
                products: []
            }
        },

        methods: {
            login: function () {
                this.$http.post('/api/login', {name: "abc", password: "password"}).then(response => {
                    // this.$set('products', response.json());
                    console.log(response.json());
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

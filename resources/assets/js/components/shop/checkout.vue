<template>
    <ul id="cart-list">
        <li class="list-item" v-for="cart in carts">
            <input class="checker" type="checkbox" name="">
            <img :src="cart.product.thumbnail" alt="" class="thumbnail">
            <div class="right-part">
                <h3 class="name">{{ cart.product.name }}</h3>
                <span class="price">{{ cart.product.price }}</span>

            </div>
        </li>
    </ul>

    checkout

    <footer>
        <input type="checkbox" id="check-all">
        <div class="total-price">合计：{{ totalPrice }}</div>
        <a v-link="{ path: '/order' }" class="btn" id="btn-checkout">立即下单</a>
    </footer>
</template>

<script>
    export default {
        ready: function () {
            // this.getCarts();
        },

        data: function () {
            return {
                carts: []
            }
        },

        methods: {
            getCarts: function () {
                this.$http.get('cart/lists').then(response => {

                    console.log(response.json());

                    this.$set('carts', response.json());
                });
            }
        }
    }
</script>

<style scoped lang="sass">
    #cart-liat {
        display: block;
        margin: 0;
        padding: 0;

        .list-item {
            display: block;
            padding: 5px;
            border-bottom: 1px solid #555;



            .thumbnail {
                display: block;
                float: left;
                width: 100px;
                height: 60px;
            }

            .right-part {
                display: block;
                float: right;

            }
        }
    }

    footer {
        display: block;
        position: fixed;
        bottom: 55px;
        width: 100%;
        background-color: #fff;
        height: 50px;

        #check-all {
            float: left;

        }

        .total-price {
            float: left;
        }

        #btn-checkout {
            display: block;
            float: right;
            color: #fff;
            line-height: 50px;
            padding: 0 20px;
            background-color: #f00;
        }
    }

</style>

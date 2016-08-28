<template>
    <ul id="cart-list">
        <li class="list-item" v-for="cart in carts">
            <input class="checker" type="checkbox" name="">
            <img :src="cart.product.thumbnail" alt="" class="thumbnail" v-link="{ path: '/product/' + cart.product.id }">
            <div class="right-part">
                <div class="name" v-link="{ path: '/product/' + cart.product.id }">{{ cart.product.name }}</div>
                <span class="price">{{ cart.product.price | currency '&yen; ' }}</span>
            </div>
        </li>
    </ul>

    <footer>
        <input type="checkbox" id="check-all">
        <div class="summary">
            <div class="total-price">合计：{{ totalPrice | currency '&yen; ' }}</div>
            <div class="product-count">已选 {{ productCount }} 件商品</div>
        </div>
        <a v-link="{ path: '/checkout' }" class="btn" id="btn-checkout">去结算</a>
    </footer>
</template>

<script>
    export default {
        ready: function () {
            this.getCarts();
        },

        data: function () {
            return {
                carts: [],
                totalPrice: 0,
                productCount: 0
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
    #cart-list {
        display: block;
        margin: 0;
        padding: 0;
        background-color: #fff;

        .list-item {
            display: block;
            overflow: hidden;
            padding: 10px;
            border-bottom: 1px solid #eee;

            .checker {
                display: inline-block;
                float: left;
                margin-top: 20px;
                margin-right: 10px;
            }

            .thumbnail {
                display: block;
                float: left;
                width: 80px;
                height: 80px;
                border: 1px solid #eee;
            }

            .right-part {
                position: relative;
                display: block;
                overflow: hidden;
                height: 80px;
                float: left;
                padding: 0 10px;

                .name {
                    font-size: 15px;
                }

                .price {
                    position: absolute;
                    bottom: 0;
                    color: #f00;
                }
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

        .summary {
            float: left;
            padding-left: 10px;
        }

        .total-price {
            color: #f00;
            font-size: 15px;
        }

        .product-count {
            font-size: 13px;
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

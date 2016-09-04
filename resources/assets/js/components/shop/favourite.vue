<template>
    <ul id="favourite-list">
        <li class="list-item" v-for="favourite in favourites">
            <input class="checker" type="checkbox" :value="favourite" v-model="selectedfavourites">
            <img :src="favourite.product.thumbnail" alt="" class="thumbnail" v-link="{ path: '/product/' + favourite.product.id }">
            <div class="right-part">
                <div class="name" v-link="{ path: '/product/' + favourite.product.id }">{{ favourite.product.name }}</div>
                <span class="price">{{ favourite.product.price | currency '&yen; ' }}</span>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        ready: function () {
            this.getfavourites();
        },

        data: function () {
            return {
                favourites: [],
                selectedfavourites: []
            }
        },

        computed: {
            selectAll: function () {
                return this.selectedfavourites.length === this.favourites.length;
            },

            productAmount: function () {
                if (this.selectedfavourites.length === 0) {
                    return 0;
                }

                // 选中的订单中商品数累加
                var count = 0;
                for(var index in this.selectedfavourites) {
                    count += this.selectedfavourites[index].amount;
                }

                return count;
            }
        },

        methods: {
            // 获取购物车列表数据
            getfavourites: function () {
                this.$http.get('favourite/lists').then(response => {
                    this.$set('favourites', response.json());
                });
            },

            // 去结算
            checkout: function () {
                if (this.selectedfavourites.length > 0) {
                    this.$http.post('checkout', {selectedfavourites: this.selectedfavourites}).then(response => {
                        console.log(response.json());

                        // this.$route.router.go('/checkout');
                    })
                }
            },

            // 全选和取消全选
            checkAllClick: function () {
                if (this.selectAll) {
                    this.selectedfavourites = [];
                } else {
                    this.selectedfavourites = this.favourites;
                }
            }
        }
    }
</script>

<style scoped lang="sass">
    #favourite-list {
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
                margin: 30px 15px 0 10px;
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
            margin: 11px 10px;
            font-size: 13px;
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
            border: none;

            &.disabled {
                background-color: #ccc;
            }
        }
    }
</style>

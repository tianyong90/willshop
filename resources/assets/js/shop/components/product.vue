<template v-cloak>
    <div>
        <div id="banner">
            <wv-swipe :height="180" :auto="4000">
                <wv-swipe-item class="banner-swipe-item" v-for="banner in banners">
                    <img :src="banner.img" alt="">
                </wv-swipe-item>
            </wv-swipe>
        </div>
        <div id="details">
            <div class="name">{{ product.name }}</div>
            <div class="price">{{ product.price }}</div>
        </div>

        <div id="description">
            {{ product.description }}
        </div>

        <footer>
            <div class="btn-add-cart" @click="addToCart(product.id)">加入购物车</div>
            <router-link class="btn btn-cart" to="/cart"><span class="amount">{{ productAmountInCart }}</span><i class="icon iconfont">&#xe611;</i><span class="text">购物车</span></router-link>
            <div class="btn btn-favourite" @click="toggleFavourite(product.id)"><i class="icon iconfont" :class="{'is-favourite': isFavourite}">{{ isFavourite ? '&#xe606;' : '&#xe607;' }}</i>
                <span class="text">{{ isFavourite ? '已收藏' : '收藏' }}</span>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        mounted () {
            this.getProduct();
            this.checkIsFavourite();
            this.getProductAmountInCart();
        },

        data () {
            return {
                product: {},
                amount: 1,
                isFavourite: false,
                productAmountInCart: 0,
            }
        },

        computed: {
            banners () {
                let temp = [];
                if (this.product.pictures) {
                    this.product.pictures.forEach(picture => {
                        temp.push({ img: picture });
                    });
                }
                return temp;
            }
        },

        methods: {
            getProduct () {
                this.axios.get(`product/${this.$route.params.id}`).then(response => {
                    this.product = response.data.product;
                });
            },

            // 商品是否已被收藏
            checkIsFavourite () {
                this.axios.get(`favourite/${this.$route.params.id}/is-favourite`).then(response => {
                    this.isFavourite = response.data.isFavourite;
                });
            },

            // 购物车中商品总数
            getProductAmountInCart () {
                this.axios.get('cart/product-amount').then(response => {
                    this.productAmountInCart = response.data.amount;
                });
            },

            // 加入购物车
            addToCart (productId) {
                let postData = {
                    productId: productId,
                    amount: this.amount
                };

                this.axios.post('cart/add', postData).then(response => {
                    let data = response.data;

                    this.productAmountInCart = parseInt(this.productAmountInCart) + this.amount;
                });
            },

            // 加入购物车
            toggleFavourite (productId) {
                this.axios.get(`favourite/${productId}/toggle`).then(response => {
                    this.isFavourite = !this.isFavourite;
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .banner-swipe-item {
        display: block;
        overflow: hidden;
    }

    #details {
        display: block;
        background-color: #fff;
        overflow: hidden;
        margin: 5px 0;
        .name {
            display: block;
            padding: 0 10px;
            font-size: 17px;
            color: #666;
        }
        .price {
            display: block;
            padding: 0 10px;
            font-size: 17px;
            color: red;
        }
    }

    #description {
        display: block;
        overflow: hidden;
        background-color: #fff;
        padding: 1rem 0.5rem 60px 0.5rem;
        text-align: justify;
        font-size: 1.1rem;
        color: #666;
    }

    footer {
        display: block;
        position: fixed;
        overflow: hidden;
        bottom: 0;
        width: 100%;
        height: 60px;
        background-color: #fff;
        border-top: 1px solid #ccc;
        padding: 0;
        .btn {
            display: inline-block;
            float: right;
            color: #555;
            text-align: center;
            padding: 5px 20px;
            font-size: 12px;
            position: relative;
            .icon {
                display: block;
                &.is-favourite {
                    color: #f00;
                }
            }
            .amount {
                position: absolute;
                background-color: #f00;
                top: 3px;
                right: 20px;
                color: #fff;
                font-size: 10px;
                padding: 0 4px;
                border-radius: 50%;
            }
            .text {
                font-size: 12px;
            }
        }

        .btn-add-cart {
            display: inline-block;
            height: 60px;
            font-size: 15px;
            line-height: 60px;
            color: #fff;
            padding: 0 25px;
            background-color: #c00;
            float: right;
        }
    }
</style>

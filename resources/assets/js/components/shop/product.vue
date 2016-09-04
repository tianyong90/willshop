<template v-cloak>
    <div id="banner">
        <swiper :list="banners" :aspect-ratio="360/640" dots-position="center" :show-desc-mask="false" auto loop :interval="5000"></swiper>
    </div>

    <div id="details">
        <div class="name">{{ product.name }}</div>
        <div class="price">{{ product.price }}</div>

        <x-number title="已选" :value.sync="amount" :min="1" :fillable="false"></x-number>
        
        <cell title="送至" value="" is-link @click="addressPopup"></cell>
    </div>

    <div id="description">
        {{ product.description }}
    </div>

    <footer>
        <div id="btn-add-cart" @click="addToCart(product.id)">加入购物车</div>
        <div class="btn" id="btn-cart" v-link="{path: '/cart'}"><span class="amount">{{ productAmountInCart }}</span><i class="icon iconfont">&#xe611;</i><span class="text">购物车</span></div>
        <div class="btn" id="btn-favourite" @click="toggleFavourite(product.id)"><i class="icon iconfont" :class="{'is-favourite': isFavourite}">{{ isFavourite ? '&#xe606;' : '&#xe607;' }}</i><span class="text">{{ isFavourite ? '已收藏' : '收藏' }}</span></div>
    </footer>
</template>


<script>
    import { Swiper,Group,Cell,Panel,XNumber } from 'vux';

    export default {
        components: {
            Swiper,
            Group,
            Cell,
            Panel,
            XNumber
        },

        ready: function () {
            this.fetchProduct();
            this.checkIsFavourite();
            this.getProductAmountInCart();
        },

        data: function () {
            return {
                product: {},
                banners: [],
                amount: 1,
                isFavourite: false,
                productAmountInCart: 0
            }
        },

        methods: {
            fetchProduct: function () {
                this.$http.get('product/' + this.$route.params.id).then(response => {
                    var product = response.json();

                    this.$set('product', product);

                    for(var item in product.pictures) {
                        this.banners.push({img: product.pictures[item]});
                    }
                });
            },

            // 商品是否已被收藏
            checkIsFavourite: function () {
                this.$http.get('favourite/' + this.$route.params.id + '/is-favourite').then(response => {
                    var data = response.json();

                    this.$set('isFavourite', data.isFavourite);
                });
            },

            // 购物车中商品总数
            getProductAmountInCart: function () {
                this.$http.get('cart/product-amount').then(response => {

                    this.$set('productAmountInCart', response.data);
                });
            },

            addressPopup: function () {

            },

            // 加入购物车
            addToCart: function (productId) {
                this.$http.get('cart/' + productId + '/add').then(response => {
                    var data = response.json();

                    this.productAmountInCart = parseInt(this.productAmountInCart) + this.amount;
                });
            },

            // 加入购物车
            toggleFavourite: function (productId) {
                this.$http.get('favourite/' + productId + '/toggle').then(response => {
                    this.isFavourite = !this.isFavourite;
                });
            },

            destroy: function () {
                console.log('product destroy');
            }
        },

        beforeDestroy: function () {
            this.destroy();
        }
    }
</script>

<style scoped lang="sass">
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

        #btn-add-cart {
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

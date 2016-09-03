<template v-cloak>
    <div id="banner">
        <swiper :list="banners" :aspect-ratio="360/640" dots-position="center" :show-desc-mask="false" auto loop :interval="5000"></swiper>
    </div>

    <div id="details">
        <div class="name">{{ product.name }}</div>
        <div class="price">{{ product.price }}</div>

        <x-number title="已选" :value="1" :min="1" :fillable="false"></x-number>
        
        <cell title="送至" value="" is-link @click="addressPopup"></cell>
    </div>

    <div id="description">
        {{ product.description }}
    </div>

    <footer>
        <div id="btn-add-cart" @click="addToCart()">加入购物车</div>
        <div class="btn" id="btn-cart" v-link="{path: '/cart'}"><i class="icon iconfont">&#xe611;</i><span class="text">购物车</span></div>
        <div class="btn" id="btn-favourite" @click="addToFavourite()"><i class="icon iconfont">&#xe607;</i><span class="text">收藏</span></div>
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
        },

        data: function () {
            return {
                product: {},
                banners: []
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

            addressPopup: function () {

            },

            // 加入购物车
            addToCart: function () {
                this.$http.get('cart/' + this.$route.params.id + '/add').then(response => {
                    var data = response.json();

                    console.log(data);
                });
            },

            // 加入购物车
            addToFavourite: function () {
                this.$http.get('favourite/' + this.$route.params.id + '/add').then(response => {
                    var data = response.json();

                    console.log(data);
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

            .icon {
                display: block;
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

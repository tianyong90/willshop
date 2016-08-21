<template>
    <div id="banner">
        <swiper :list="banners" :aspect-ratio="360/640" dots-position="center" :show-desc-mask="false" auto loop :interval="5000"></swiper>
    </div>

    <div id="details">
        <div class="name">{{ product.name }}</div>
        <div class="price">1000</div>

        <x-number title="已选" :value="1" :min="1" :fillable="false"></x-number>
        
        <cell title="送至" value="" is-link @click=""></cell>
    </div>

    <div id="description">
        {{ product.description }}
    </div>
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
                product: [],
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

            destroy: function () {

            }
        },

        destroy: function () {
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
</style>

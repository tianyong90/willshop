<template>
    <div id="banner">
        <swiper :list="banners" :aspect-ratio="300/800" dots-position="center" :show-desc-mask="false" auto loop :interval="5000"></swiper>
    </div>

    <div id="products">
        <ul>
            <li v-for="product in products">
                <a v-link="{ path: '/product/' + product.id }">
                    <img class="thumbnail" :src="product.thumbnail" alt="">
                    <span class="name">{{ product.name }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Swiper } from 'vux';

    const banners = [{
            url: 'javascript:',
            img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/1.jpg',
        },
        {
            url: 'javascript:',
            img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/2.jpg',
        },
        {
            url: 'javascript',
            img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/3.jpg',
    }];

    export default {
        components: {
            Swiper
        },

        ready () {
            this.getProducts();
        },

        data () {
            return {
                products: [],
                banners: banners
            }
        },

        methods: {
            getProducts () {
                this.$http.get('product').then(response => {

                    this.$set('products', response.body);
                });
            },

            destroy () {
                console.log('home destroyed');
            }
        },

        beforeDestroy () {
            this.destroy();
        }
    }
</script>

<style scoped lang="sass">
    .vux-slider {
        
    }

    #products {
        display: block;
        overflow: hidden;
        margin: 20px 0 80px 0;

        ul {
            display: block;
            overflow: hidden;
            padding: 0;

            li {
                display: block;
                float: left;
                width: 40%;
                margin: 5%;
                
                .thumbnail {
                    display: block;
                    width: 100%;
                }

                .name {
                    display: block;
                    text-align: center;
                }
            }
        }
    }
</style>
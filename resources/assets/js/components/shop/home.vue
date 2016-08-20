<template>
    <div id="banner">
        <swiper :list="banners" :aspect-ratio="300/800" dots-position="center" :show-desc-mask="false" auto loop :interval="5000"></swiper>
    </div>
    
</template>

<script>
    import { Swiper } from 'vux';

    var banners = [{
        url: 'javascript:',
        img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/1.jpg',
        title: '如何手制一份秋意的茶？'
        }, {
        url: 'javascript:',
        img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/2.jpg',
        title: '茶包VS原叶茶'
        }, {
        url: 'javascript',
        img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/3.jpg',
        title: '播下茶籽，明春可发芽？'
        }];

    export default {
        components: {
            Swiper
        },

        ready: function () {

        },

        data: function () {
            return {
                products: [],
                banners: banners
            }
        },

        methods: {
            fetchProducts: function () {
                this.$http.get('/api/product').then(response => {
                    this.$set('products', response.json());
                });
            },

            destroy: function () {
                console.log('home destroyed');
            }
        },

        beforeDestroy: function () {
            this.destroy();
        }
    }
</script>

<style scoped lang="sass">
    .vux-slider {}
</style>
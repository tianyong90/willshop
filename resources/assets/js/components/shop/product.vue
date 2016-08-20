<template>
    <div id="banner">
        <swiper :list="banners" :aspect-ratio="360/640" dots-position="center" :show-desc-mask="false" auto loop :interval="5000"></swiper>
    </div>

    <div id="description">
        {{ product.description }}
    </div>
    
    <!--<panel header="评论">
        <cell title="test"></cell>
    </panel>-->
</template>


<script>
    import { Swiper,Group,Cell,Panel } from 'vux';

    export default {
        components: {
            Swiper,
            Group,
            Cell,
            Panel
        },

        ready: function () {
            console.log();

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

<style lang="sass">
    
</style>

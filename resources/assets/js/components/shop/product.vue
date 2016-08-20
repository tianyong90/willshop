<template>
    <div id="banner">
        <swiper :list="banners" :aspect-ratio="360/640" dots-position="center" :show-desc-mask="false" auto loop :interval="5000"></swiper>
    </div>

    <div id="description">
        {{product.description}}
    </div>
    
    <panel header="what the fuck">
        <cell title="test"></cell>
    </panel>
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
                    console.log(response.json());

                    var product = response.json();

                    this.$set('product', product);

                    for(var i =0;i < product.pictures.length;i++) {
                        this.banners.push({img: product.pictures[i]});
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

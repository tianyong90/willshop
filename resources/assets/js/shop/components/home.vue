<template>
    <div class="main">
        <wv-group>
            <wv-cell title="title" value="value"></wv-cell>
            <wv-cell title="title" value="value"></wv-cell>
        </wv-group>
    </div>
</template>

<script>
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
        data () {
            return {
                products: [],
                banners: banners
            }
        },

        methods: {
            // getProducts () {
            //     this.$http.get('product').then(response => {

            //         this.$set('products', response.body.products);
            //     });
            // },

            // destroy () {
            //     console.log('home destroyed');
            // }
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
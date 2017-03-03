<template>
  <div class="main">
    <wv-swipe class="demo-swipe" :height="180" :auto="4000">
      <wv-swipe-item class="demo-swipe-item" v-for="banner in banners">
        <img :src="banner.img" alt="">
      </wv-swipe-item>
    </wv-swipe>
  </div>
</template>

<script>
  const banners = [{
    url: 'javascript:',
    img: 'https://cdn.pixabay.com/photo/2015/03/18/09/31/prairie-679014__340.jpg'
  },
  {
    url: 'javascript:',
    img: 'https://cdn.pixabay.com/photo/2015/03/18/09/29/the-scenery-679011__340.jpg'
  },
  {
    url: 'javascript',
    img: 'https://cdn.pixabay.com/photo/2015/03/28/16/40/lake-696098__340.jpg'
  }];

  export default {
    data () {
      return {
        products: [],
        banners
      }
    },

    mounted () {
      this.getProducts();
    },

    methods: {
      getProducts () {
        this.axios.get('product').then(response => {
          this.products = response.data.products;
        });
      }
    }
  }

</script>

<style scoped lang="scss">
  .demo-swipe-item {
    display: block;
    overflow: hidden;
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

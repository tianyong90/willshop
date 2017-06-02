<template>
  <div class="main">
    <wv-swipe :height="180" :auto="4000">
      <wv-swipe-item class="banner-swipe-item" v-for="banner in banners" :key="banner">
        <img :src="banner.img" alt="">
      </wv-swipe-item>
    </wv-swipe>

    <div class="products">
      <div class="product-item" v-for="product in products" :key="product">
        <router-link :to="'/product/' + product.id">
          <img class="thumbnail" :src="product.thumbnail" alt="">
          <span class="name" v-text="product.name"></span>
          <div class="price" v-html="product.price"></div>
        </router-link>
      </div>
    </div>
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
    data() {
      return {
        products: [],
        banners
      }
    },

    mounted() {
      this.getProducts();
    },

    methods: {
      getProducts() {
        this.axios.get('product').then(response => {
          this.products = response.data.products;
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

  .products {
    display: flex;
    background-color: red;
    margin-top: 10px;
    margin-bottom: 80px;

    .product-item {
      display: block;

      .thumbnail {
        display: block;
        width: 100%;
      }

      .name {
        display: block;
        text-align: center;
      }

      .price {
        display: block;
        color: yellow;
      }
    }
  }
</style>

<template>
  <div class="main">
    <wv-swipe :height="180" :auto="4000">
      <wv-swipe-item class="banner-swipe-item" v-for="banner in banners">
        <img :src="banner.img" alt="">
      </wv-swipe-item>
    </wv-swipe>

    <div class="products">
      <div class="product-item" v-for="product in products">
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
  }]

  export default {
    data() {
      return {
        products: [],
        banners
      }
    },

    mounted() {
      this.getProducts()
    },

    methods: {
      getProducts() {
        this.axios.get('product').then(response => {
          this.products = response.data.products
        })
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
    flex-flow: row wrap;
    justify-content: space-between;
    width: 95%;
    margin: 10px auto 65px;

    .product-item {
      width: 48%;
      display: block;
      overflow: hidden;
      background-color: #fff;
      margin-bottom: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;

      .thumbnail {
        display: block;
        width: 100%;
      }

      .name {
        display: -webkit-box;
        color: #444;
        line-height: 1.2;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        -webkit-box-lines: 1;
      }

      .price {
        display: block;
        padding: .2em;
        font-size: 15px;
        font-weight: bold;
        color: red;
        text-align: right;
      }
    }
  }
</style>

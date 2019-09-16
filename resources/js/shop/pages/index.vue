<template>
  <div class="main">
    <w-swipe :height="180" :auto="4000">
      <w-swipe-item
        class="banner-swipe-item"
        v-for="banner in banners"
        :key="banner.index"
      >
        <img :src="banner.img" alt="">
      </w-swipe-item>
    </w-swipe>

    <div class="product-list">
      <div class="product-item" v-for="product in products.data">
        <router-link :to="'/product/' + product.id">
          <img class="thumbnail" :src="product.thumbnail" alt="">
          <span class="name" v-text="product.name" />
          <div class="price" v-html="product.price" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const banners = [
  {
    url: 'javascript:',
    img: 'https://picsum.photos/640/480/?1',
  },
  {
    url: 'javascript:',
    img: 'https://picsum.photos/640/480/?2',
  },
  {
    url: 'javascript',
    img: 'https://picsum.photos/640/480/?3',
  },
]

export default Vue.extend({
  data () {
    return {
      products: [],
      banners,
    }
  },

  mounted () {
    this.getProducts()
  },

  methods: {
    getProducts () {
      this.axios.get('products').then(response => {
        this.products = response.data.products
      })
    },
  },
})
</script>

<style scoped lang="scss">
.banner-swipe-item {
  display: block;
  overflow: hidden;
}

.ad {
  display: block;
  width: 100%;
  height: 60px;
  overflow: hidden;
  position: relative;
  margin-top: 10px;

  img {
    position: absolute;
    display: block;
    overflow: hidden;
    width: 100%;
  }

  .link {
    z-index: 10;
    position: absolute;
    right: 10px;
    top: 10px;
    color: #fff;
  }
}

.product-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  margin: 10px auto 65px;

  .product-item {
    width: calc(50vw - 4px);
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
      box-orient: vertical;
      line-clamp: 2;
      word-break: break-all;
    }

    .price {
      display: block;
      padding: 0.2em;
      font-size: 15px;
      font-weight: bold;
      color: red;
      text-align: right;
    }
  }
}
</style>

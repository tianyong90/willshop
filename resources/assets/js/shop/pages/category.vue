<template>
  <div>
    <div class="left-sidebar">
      <div class="sidebar-item" :class="{ 'active': category.id === activeCategoryId }"
           v-for="category in categories" :key="category.id" @click="sidebarItemClick(category.id)">
        {{ category.name }}
      </div>
    </div>

    <div class="right-panel">
      <img class="banner" src="http://lorempixel.com/640/150/?28423" alt=""/>

      <div class="product-list">
        <router-link class="product-item" to="/product/1" v-for="product in products.data" :key="product.id">
          <img :src="product.thumbnail" alt="" class="thumbnail"/>
          <div class="name">{{ product.name }}</div>
          <div class="price">{{ product.price | priceFilter }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'we-vue'
  import priceMixin from '../mixins/price_filter'

  export default {
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem
    },

    mixins: [
      priceMixin
    ],

    data () {
      return {
        categories: [],
        activeCategoryId: null,
        products: []
      }
    },

    mounted () {
      this.getCategories()
    },

    methods: {
      getCategories () {
        this.axios.get('product-categories').then((response) => {
          this.categories = response.data.categories

          this.activeCategoryId = this.categories[0].id
        })
      },

      getProducts (categoryId) {
        this.axios.get('product', {
          params: {
            categoryId: categoryId
          }
        }).then((response) => {
          this.products = response.data.products
        }).catch((error) => {
          console.log(error)
        })
      },

      sidebarItemClick (categoryId) {
        if (this.activeCategoryId !== categoryId) this.activeCategoryId = categoryId
      }
    },

    watch: {
      activeCategoryId (val) {
        this.getProducts(val)
      }
    }
  }
</script>

<style lang="scss">
  $sidebar-width: 5em;

  .left-sidebar {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 50px;
    width: $sidebar-width;
    background-color: #fff;
    z-index: 200;
    overflow-y: scroll;

    .sidebar-item {
      display: block;
      overflow: hidden;
      text-align: center;
      padding: 1em 0;
      font-size: 13px;
      border-bottom: 1px solid #f6f6f6;

      &.active {
        background-color: #f2f2f2;
        color: red;
      }
    }
  }

  .right-panel {
    display: block;
    position: fixed;
    left: $sidebar-width;
    right: 0;
    top: 0;
    bottom: 50px;
    padding: .5em;
    background-color: #f5f5f5;
    overflow-x: hidden;
    overflow-y: scroll;

    .banner {
      display: block;
      width: 100%;
      background-color: #fff;
      margin-bottom: 1rem;
    }

    .product-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      width: 100%;
      column-count: 2;

      .product-item {
        width: 49.5%;
        background-color: #fff;
        margin-bottom: 5px;

        .thumbnail {
          display: block;
          overflow: hidden;
          width: 100%;
        }

        .name {
          font-size: 14px;
          color: #444;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .price {
          display: block;
          color: #f00;
          font-size: 13px;
        }
      }
    }
  }
</style>

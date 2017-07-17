<template>
  <div>
    <div class="left-sidebar">
      <div class="sidebar-item" :class="{ 'active': category.id === activeCategoryId }" v-for="category in categories" @click="sidebarItemClick(category.id)">
        {{ category.name }}
      </div>
    </div>
    
    <div class="right-panel">
      <img class="banner" src="http://lorempixel.com/640/150/?28423" alt=""/>

      <wv-grid>
        <wv-grid-item class="category-item" to="/product/1">
          <img src="http://lorempixel.com/50/50/?28423" alt="" class="logo"/>
        </wv-grid-item>
        <wv-grid-item class="category-item" to="/product/1">
          <img src="http://lorempixel.com/50/50/?28423" alt="" class="logo"/>
        </wv-grid-item>
        <wv-grid-item class="category-item" to="/product/1">
          <img src="http://lorempixel.com/50/50/?28423" alt="" class="logo"/>
        </wv-grid-item>
        <wv-grid-item class="category-item" to="/product/1">
          <img src="http://lorempixel.com/50/50/?28423" alt="" class="logo"/>
        </wv-grid-item>
        <wv-grid-item class="category-item" to="/product/1">
          <img src="http://lorempixel.com/50/50/?28423" alt="" class="logo"/>
        </wv-grid-item>
        <wv-grid-item class="category-item" to="/product/1">
          <img src="http://lorempixel.com/50/50/?28423" alt="" class="logo"/>
        </wv-grid-item>
      </wv-grid>
    </div>
  </div>
</template>

<script>
  export default {
    created () {
      this.fetchCategories()
    },

    data () {
      return {
        categories: [],
        activeCategoryId: null
      }
    },

    methods: {
      fetchCategories () {
        this.axios.get('product-categories').then(response => {
          this.categories = response.data.categories

          this.activeCategoryId = this.categories[0].id
        })
      },

      sidebarItemClick (categoryId) {
        if (this.activeCategoryId !== categoryId) this.activeCategoryId = categoryId
      }
    }
  }
</script>

<style lang="scss">
  .left-sidebar {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 50px;
    width: 5em;
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
    left: 5em;
    right: 0;
    top: 0;
    bottom: 50px;
    padding: .5em;
    background-color: #f5f5f5;
    
    .banner {
      display: block;
      width: 100%;
      background-color: #fff;
      margin-bottom: 1rem;
    }
    
    .category-item {
      background-color: #fff;
    }
  }
</style>

<template>
  <div class="weui-panel weui-panel_access">
    <div class="weui-panel__bd">
      <router-link :to="'/product/' + favourite.product.id" tag="div" class="weui-media-box weui-media-box_appmsg" v-for="favourite in favourites" :key="favourite">
        <div class="weui-media-box__hd">
          <img class="weui-media-box__thumb" :src="favourite.product.thumbnail">
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title" v-text="favourite.product.name"></h4>
          <p class="weui-media-box__desc price" v-text="favourite.product.price"></p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        favourites: [],
        selectedfavourites: []
      }
    },

    mounted () {
      this.getfavourites();
    },

    methods: {
      // 获取收藏列表数据
      getfavourites () {
        this.axios.get('favourite').then(response => {
          this.favourites = response.data.favourites;
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .price {
    color: #f44336;
  }
</style>

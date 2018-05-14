<template>
  <div class="weui-panel weui-panel_access" v-if="favourites.length>0">
    <div class="weui-panel__bd">
      <router-link :to="'/product/' + favourite.product.id" tag="div" class="weui-media-box weui-media-box_appmsg"
                   v-for="favourite in favourites" :key="favourite.id">
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

  <div class="empty-msg" v-else-if="favourites.length === 0 && !isLoading">
    <i class="iconfont icon-favor"></i>
    <div class="msg">还没有收藏任何宝贝</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        favourites: [],
        selectedfavourites: []
      }
    },

    computed: {
      ...mapState({
        isLoading: state => state.isLoading
      })
    },

    mounted () {
      this.getFavourites()
    },

    methods: {
      // 获取收藏列表数据
      getFavourites () {
        this.axios.get('favourite').then((response) => {
          this.favourites = response.data.favourites
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .price {
    color: #f44336;
  }

  .empty-msg {
    display: flex;
    width: 100%;
    height: 80vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #777;

    .iconfont {
      font-size: 80px;
    }

    .msg {
      font-size: 14px;
    }
  }
</style>

<template>
  <div id="tabbar" v-if="menuVisible">
    <wv-tabbar>
      <wv-tabbar-item to="/">
        <i class="icon iconfont" slot="icon">&#xe613;</i>
        <span>首页</span>
      </wv-tabbar-item>
      <wv-tabbar-item to="/category">
        <i class="icon iconfont" slot="icon">&#xe60b;</i>
        <span>分类</span>
      </wv-tabbar-item>
      <wv-tabbar-item to="/cart">
        <i class="icon iconfont" slot="icon">&#xe611;</i>
        <span>购物车</span>
      </wv-tabbar-item>
      <wv-tabbar-item to="/user">
        <i class="icon iconfont" slot="icon">&#xe61c;</i>
        <span>我的</span>
      </wv-tabbar-item>
    </wv-tabbar>
  </div>
</template>

<script>
  export default {
    mounted () {
    },

    data () {
      return {
      }
    },

    computed: {
      menuVisible () {
        return this.$store.state.isMainMenuVisible;
      }
    },

    methods: {
    }
  }

</script>

<style lang="scss">
  #tabbar .weui_tabbar {
    position: fixed;
    bottom: 0;

    .weui_tabbar_item {
      .icon {
        font-size: 20px;
        color: #666;
      }
    }

    .weui_tabbar_item.weui_bar_item_on {
      .icon {
        color: #09bb07;
      }
    }
  }
</style>

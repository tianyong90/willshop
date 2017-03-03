<template>
  <div id="tabbar" v-if="menuVisible">
    <tabbar>
      <tabbar-item v-link="{ path:'/' }">
        <i class="icon iconfont" slot="icon">&#xe613;</i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item v-link="{ path:'/category' }">
        <i class="icon iconfont" slot="icon">&#xe60b;</i>
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item v-link="{ path:'/cart' }">
        <i class="icon iconfont" slot="icon">&#xe611;</i>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item v-link="{ path:'/user' }">
        <i class="icon iconfont" slot="icon">&#xe61c;</i>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux';

  export default {
    components: {
      Tabbar,
      TabbarItem
    },

    ready () {
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

<style lang="sass">
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

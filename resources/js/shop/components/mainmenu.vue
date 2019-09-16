<template>
  <w-tabbar v-if="menuVisible" fixed>
    <w-tabbar-item to="/">
      <i class="icon iconfont" slot="icon">&#xe613;</i>
      <span>首页</span>
    </w-tabbar-item>
    <w-tabbar-item to="/category">
      <i class="icon iconfont" slot="icon">&#xe60b;</i>
      <span>分类</span>
    </w-tabbar-item>
    <w-tabbar-item to="/cart">
      <i class="icon iconfont" slot="icon">&#xe611;</i>
      <span>购物车</span>
    </w-tabbar-item>
    <w-tabbar-item to="/user">
      <i class="icon iconfont" slot="icon">&#xe61c;</i>
      <span>我的</span>
    </w-tabbar-item>
  </w-tabbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      menuVisible: state => state.isMainMenuVisible,
    }),
  },
}
</script>

<style scoped lang="scss">
</style>

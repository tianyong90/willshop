<template>
  <el-menu :default-active="$route.path"
           :router="true"
           :unique-opened="true"
           class="sidebar"
           background-color="#f2f2f2"
  >
    <template v-for="(item, index) in MenuConfig">
      <el-menu-item :index="item.route" v-if="!item.subItems" :key="index">
        <i :class="item.icon"/>{{ item.title }}
      </el-menu-item>
      <el-submenu :index="index.toString()" v-else :key="index">
        <template slot="title">
          <i :class="item.icon"/>{{ item.title }}
        </template>
        <el-menu-item
          :index="subItem.route"
          v-for="subItem in item.subItems"
          v-text="subItem.title"
          :key="subItem.index"
        />
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {}
    },

    computed: {
      ...mapState({
        MenuConfig: state => state.sidebar.MenuConfig
      })
    },

    methods: {
      selected (index, indexPath) {
        console.log(index)
        console.log(indexPath)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../sass/admin_variables";

  .sidebar {
    width: 100%;
    height: 100%;

    .iconfont {
      font-size: 1.4em;
      font-weight: bold;
      margin-right: .5em;
    }
  }
</style>

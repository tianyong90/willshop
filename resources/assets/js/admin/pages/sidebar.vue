<template>
  <div class="sidebar-wrapper">
    <el-menu :default-active="$route.path" theme="dark" :router="true" :unique-opened="true" class="sidebar-container">
      <template v-for="(item, index) in MenuConfig">
        <el-menu-item :index="item.route" v-if="!item.subItems"><i :class="item.icon"></i>{{ item.title }}</el-menu-item>
        <el-submenu :index="index.toString()" v-else>
          <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
          <el-menu-item :index="subItem.route" v-for="subItem in item.subItems" v-text="subItem.title" :key="subItem.index"></el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
  const MenuConfig = [
    {
      title: '控制面板',
      icon: 'iconfont icon-home',
      route: '/'
    },
    {
      title: '商品管理',
      icon: 'iconfont icon-goods',
      subItems: [
        {
          title: '商品列表',
          route: '/product/list'
        }
      ]
    },
    {
      title: '订单管理',
      icon: 'iconfont icon-list',
      subItems: [
        {
          title: '订单列表',
          route: '/order/list'
        }
      ]
    },
    {
      title: '用户管理',
      icon: 'iconfont icon-people',
      subItems: [
        {
          title: '用户列表',
          route: '/user/list'
        }
      ]
    }
  ];

  export default {
    data () {
      return {
        MenuConfig
      };
    },

    methods: {
      selected (index, indexPath) {
        console.log(index);
        console.log(indexPath);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../sass/admin_variables";

  .sidebar-wrapper {
    display: block;
    position: fixed;
    top: $topmenu-height;
    bottom: 0;
    left: 0;
    background-color: #324057;
    width: 220px;
    overflow: hidden;
    z-index: $zindex-sidebar;

    .sidebar-container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: -17px;
      overflow-y: scroll;
      
      .iconfont {
        font-size: 1.3em;
        margin-right: .5em;
      }
    }
  }
</style>

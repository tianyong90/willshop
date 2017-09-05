<template>
  <div id="sidebar">
    <el-menu default-active="1" theme="dark" :router="true" :unique-opened="true" class="el-menu-vertical-demo">
      <el-submenu :index="index.toString()" v-for="(item, index) in MenuConfig" :key="item.index">
        <template slot="title"><i :class="'el-icon-' + item.icon"></i>{{ item.title }}</template>
        <el-menu-item :index="subItem.route" v-for="subItem in item.subItems" v-text="subItem.title" :key="subItem.index"></el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  const MenuConfig = [
    {
      title: '基本设置',
      icon: 'setting',
      subItems: [
        {
          title: '自定义菜单',
          route: '/menu/index'
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
</style>

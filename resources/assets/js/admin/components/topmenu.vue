<template>
  <el-menu class="topmenu"
           default-active="/"
           mode="horizontal"
           :router="true"
           background-color="#f8f8f8"
           text-color="#000"
  >
    <span class="logo">WILLSHOP</span>

    <div class="right-part">
      <router-link to="/profile">
        <img :src="user.avatar" alt="" class="avatar"/>
      </router-link>
      <el-dropdown id="dropdown-menu">
        <span class="el-dropdown-link nickname" v-text="user.name"/>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$router.push('/profile')">用户信息</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
  import userConfig from '../config'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'user'
      ])
    },

    methods: {
      logout () {
        window.localStorage.removeItem(userConfig.authTokenKey)

        this.$router.replace('/login')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../sass/admin_variables";

  .topmenu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: $zindex-topmenu;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }

  .logo {
    display: block;
    overflow: hidden;
    float: left;
    width: 115px;
    color: #000;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 20px;
  }

  .right-part {
    .avatar {
      display: block;
      float: right;
      width: 40px;
      height: 40px;
      background: #ccc;
      border-radius: 50%;
      margin: 10px 10px 0 20px;
      outline: none;
    }

    #dropdown-menu {
      float: right;
      color: #333;
      font-size: 1.1rem;
      margin-top: 20px;
    }
  }
</style>

<template>
  <div>
    <ul class="address-list" v-if="addresses.length > 0">
      <li v-for="address in addresses" :key="address.id">
        <div class="header">
          <span class="name">{{ address.name }}</span>
          <span class="mobile">{{ address.mobile }}</span>
        </div>
        <div class="body">
          <div class="address">{{ address.province + address.city + address.area + address.address }}</div>
        </div>
        <div class="footer">
          <span class="delete icon iconfont" @click="deleteAddress(address)">&#xe612;</span>
          <router-link class="edit icon iconfont" :to="'/address/' + address.id">&#xe61f;</router-link>
        </div>
      </li>
    </ul>

    <div class="empty-msg" v-else-if="addresses.length === 0 && !isLoading">
      <i class="iconfont icon-map-marker"></i>
      <div class="msg">您还没有设置地址</div>
    </div>

    <footer v-show="!$store.state.isLoading">
      <router-link class="weui-btn weui-btn_primary" tag="button" to="/address/add">添加地址</router-link>
    </footer>
  </div>
</template>

<script>
  import store from '../store/index'
  import { mapState } from 'vuex'

  export default {
    store,

    mounted () {
      this.getAddresses()
    },

    data () {
      return {
        addresses: [],
        activeAddress: null
      }
    },

    computed: {
      ...mapState({
        isLoading: state => state.isLoading
      })
    },

    methods: {
      getAddresses () {
        this.axios.get('address').then((response) => {
          this.addresses = response.data.addresses
        }).catch((error) => {
          console.log(error)
        })
      },

      // 地址项中删除按钮点击
      deleteAddress (address) {
        // TODO
      }
    }
  }
</script>

<style scoped lang="scss">
  .address-list {
    display: block;
    overflow: hidden;
    margin: 0 0 60px 0;
    padding: 0;

    li {
      display: block;
      overflow: hidden;
      background-color: #fff;
      margin-bottom: 10px;
      padding: 10px 15px;

      .header {
        display: block;
        font-size: 15px;
        color: #444;

        .name {
          width: 100px;
          float: left;
        }

        .mobile {
          float: left;
        }
      }

      .body {
        clear: both;
        display: block;
        font-size: 14px;
        color: #777;
        padding: 5px 0;
      }

      .footer {
        display: block;
        overflow: hidden;
        border-top: 1px solid #ececec;
        font-size: 14px;
        color: #666;
        padding-top: 3px;

        .icon {
          margin: 0 .5rem;
        }

        .edit {
          display: inline-block;
          float: right;
          color: #555;
        }

        .delete {
          display: inline-block;
          float: right;
          color: #555;
        }
      }
    }
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

  footer {
    display: block;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    background-color: #fff;
    padding: .5rem 1rem;
    width: calc(100vw - 2rem);
    border-top: 1px solid #ccc;

    button {
      display: block;
      margin: 0 auto;
    }
  }
</style>

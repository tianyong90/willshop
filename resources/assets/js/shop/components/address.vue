<template>
  <div>
    <ul class="address-list" v-if="addresses.length > 0">
      <li v-for="address in addresses">
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

    <div class="empty" v-if="!$store.state.isLoading && addresses.length === 0">
      <i class="icon iconfont">&#xe617;</i>
      <div class="tips">您还没有设置地址</div>
    </div>

    <footer v-show="!$store.state.isLoading">
      <router-link class="weui-btn weui-btn_primary" tag="button" to="address/add">添加地址</router-link>
    </footer>
  </div>
</template>

<script>
  import store from '../store/index'
  import WeVue from 'we-vue'

  export default {
    store,

    mounted () {
      this.getAddresses()
    },

    data () {
      return {
        addresses: [],
        activeAddress: null,
      }
    },

    methods: {
      getAddresses () {
        this.axios.get('address').then(response => {
          this.addresses = response.data.addresses
        })
      },

      // 地址项中删除按钮点击
      deleteAddress (address) {
        WeVue.Dialog({
            title: '操作提示',
            message: '确定要删除吗？',
            skin: 'ios'
          },
          () => {
            this.axios.delete(`address/${address.id}/delete`).then(response => {
              this.$root.success('删除成功')

              const indexOfAddress = this.addresses.indexOf(address)
              this.addresses.splice(indexOfAddress, 1)
            })
          })
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

  .empty {
    display: block;
    text-align: center;
    margin: 30px auto;

    .icon {
      font-size: 5rem;
      color: #3695e9;
    }

    .tips {
      font-size: .8rem;
      color: #666;
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

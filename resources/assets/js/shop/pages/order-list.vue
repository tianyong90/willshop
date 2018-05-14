<template>
  <div>
    <wv-navbar v-model="status" @change="tabChange" active-color="red" fixed class="tab">
      <wv-navbar-item id="all">全部</wv-navbar-item>
      <wv-navbar-item id="need_to_pay">待付款</wv-navbar-item>
      <wv-navbar-item id="delivered">待收货</wv-navbar-item>
      <wv-navbar-item id="finished">已完成</wv-navbar-item>
      <wv-navbar-item id="canceled">已取消</wv-navbar-item>
    </wv-navbar>

    <div class="order-list" v-if="orders.data && orders.data.length>0">
      <router-link :to="'/order/' + order.number" class="order-item" v-for="order in orders.data" :key="order.id">
        <div class="hd">
          <span class="order-number">{{ order.number }}</span>
          <div class="btn-delete" v-if="order.status === 'canceled' || order.status === 'canceled'"
               @click.prevent.stop="destroyOrder(order.id)"><i class="iconfont icon-delete"></i></div>
        </div>
        <div class="bd">
          <div class="product" v-for="orderItem in order.order_items" :key="orderItem.product.id">
            <img class="thumbnail" :src="orderItem.product.thumbnail" alt=""/>
            <h4 class="name" v-html="orderItem.product.name"></h4>
          </div>
        </div>
        <div class="ft">
          <wv-button type="primary" mini plain v-if="order.status === 'need_to_pay'"
                     @click.prevent.stop="$router.push('/payment/' + order.number)">支付
          </wv-button>
          <wv-button type="primary" mini plain @click.prevent.stop="$router.push('payment/' + order.number)">
            再次购买
          </wv-button>
          <wv-button type="default" mini plain v-if="order.status === 'need_to_pay'"
                     @click.prevent.stop="cancelOrder(order.id)">取消
          </wv-button>
        </div>
      </router-link>
    </div>

    <div class="empty-msg" v-else-if="!isLoading && orders.data && orders.data.length === 0">
      <i class="iconfont icon-order"></i>
      <div class="msg">没有相关订单记录</div>
    </div>
  </div>
</template>

<script>
  import { Navbar, NavbarItem, Button } from 'we-vue'
  import { mapState } from 'vuex'

  export default {
    components: {
      [Navbar.name]: Navbar,
      [NavbarItem.name]: NavbarItem,
      [Button.name]: Button
    },

    data () {
      return {
        status: 'all',
        orders: []
      }
    },

    computed: {
      ...mapState({
        isLoading: state => state.isLoading
      })
    },

    mounted () {
      this.getOrders()
    },

    methods: {
      getOrders () {
        this.axios.get('order', {
          params: {status: this.status}
        }).then((response) => {
          this.orders = response.data.orders
        }).catch((error) => {
          console.log(error)
        })
      },

      tabChange () {
        this.getOrders()
      },

      cancelOrder (orderId) {
        this.$root.confirm('操作确认', '确定要取消订单？').then(() => {
          this.axios.post(`order/${orderId}/cancel`).then((response) => {
            this.$root.success('取消成功')
          }).catch((error) => {
            console.log(error)
          })
        })
      },

      destroyOrder (orderId) {
        this.$root.confirm('操作确认', '确定要删除订单？').then(() => {
          this.axios.delete(`order/${orderId}/destroy`).then((response) => {
            this.$root.success('删除成功')
          }).catch((error) => {
            console.log(error)
          })
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .tab {
  }

  .order-list {
    padding-top: 65px;

    .order-item {
      display: block;
      overflow: hidden;
      width: 100%;
      padding: .2em;
      background-color: #fff;
      margin-bottom: 1em;

      .hd {
        display: block;
        overflow: hidden;

        .order-number {
          float: left;
          font-size: 13px;
          color: #666;
        }

        .btn-delete {
          float: right;
          font-size: 14px;
          color: #777;
          margin-right: 10px;
        }
      }

      .bd {
        display: block;
        overflow: hidden;
        background-color: #f5f5f5;

        .product {
          display: flex;
          padding: .2em;

          .thumbnail {
            width: 60px;
            height: 60px;
          }

          .name {
            margin-left: 10px;
            color: #555;
          }
        }
      }

      .ft {
        padding: 10px;
        text-align: right;
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
</style>

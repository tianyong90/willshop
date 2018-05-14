<template>
  <div>
    <div class="status-bar">
      <span class="status-text">{{ order.status | statusFilter }}</span>
    </div>

    <div class="address-info">
      <span class="name" v-text="order.consumer_name"></span>
      <span class="mobile" v-text="order.consumer_mobile"></span>
      <p class="address" v-text="order.address"></p>
    </div>

    <div class="product-list">
      <router-link :to="'/product/' + orderItem.product.id" class="product-item"
                   v-for="orderItem in order.order_items" :key="orderItem.product.id">
        <img :src="orderItem.product.thumbnail" alt="" class="thumbnail"/>

        <div class="item-right">
          <h4 class="name" v-html="orderItem.product.name"></h4>
          <div class="amount">数量：{{ orderItem.amount }}</div>
          <div class="price">{{ orderItem.product.price | priceFilter }}</div>

          <button class="add-to-cart" @click.prevent.stop="addToCart(orderItem.product.id)">加入购物车</button>
        </div>
      </router-link>
    </div>

    <wv-group class="order-info">
      <wv-cell title="订单号" :value="order.number"></wv-cell>
      <wv-cell title="下单时间" :value="order.created_at"></wv-cell>
      <wv-cell title="支付时间" :value="order.created_at"></wv-cell>
      <wv-cell title="支付方式" :value="order.created_at"></wv-cell>
    </wv-group>

    <wv-group class="fee-info">
      <wv-cell title="订单总额" :value="order.total_fee"></wv-cell>
      <wv-cell title="运费" :value="order.total_fee"></wv-cell>
    </wv-group>

    <footer>
      <wv-flex :gutter="20">
        <wv-flex-item v-if="order.status === 'need_to_pay'">
          <wv-button type="warn" mini @click.native="cancelOrder">取消订单</wv-button>
        </wv-flex-item>
        <wv-flex-item v-if="order.status === 'canceled' || order.status === 'finished'">
          <wv-button type="warn" mini @click.native="deleteOrder">删除订单</wv-button>
        </wv-flex-item>
        <wv-flex-item v-if="order.status === 'need_to_pay'">
          <wv-button type="primary" mini @click="$router.push('/payment/' + order.number)">去付款</wv-button>
        </wv-flex-item>
      </wv-flex>
    </footer>
  </div>
</template>

<script>
  import { Group, Cell, Flex, FlexItem, Button } from 'we-vue'

  import priceFilter from '../mixins/price_filter'
  import statusFilter from '../mixins/status_filter'

  export default {
    components: {
      [Group.name]: Group,
      [Cell.name]: Cell,
      [Button.name]: Button,
      [Flex.name]: Flex,
      [FlexItem.name]: FlexItem
    },

    mixins: [
      priceFilter,
      statusFilter
    ],

    data () {
      return {
        orderId: null,
        order: {}
      }
    },

    mounted () {
      this.orderNumber = this.$route.params.orderNumber

      this.getOrder()
    },

    methods: {
      getOrder () {
        this.axios.get(`order/${this.orderNumber}`).then((response) => {
          this.order = response.data.order
        }).catch((error) => {
          console.log(error)
        })
      },

      addToCart (productId) {
        console.log(productId)

        const postData = {
          productId: productId,
          amount: 1
        }

        this.axios.post('cart/add', postData).then((response) => {
          this.$root.success('添加成功')
        })
      },

      cancelOrder () {
        this.axios.post('order/cancel').then((response) => {
          this.$root.success('取消成功')
        })
      },

      deleteOrder () {
        this.axios.post('order/cancel').then((response) => {
          this.$root.success('删除成功')
        })
      }
    }
  }
</script>

<style lang="scss">
  $weui-red: #e64340;

  .status-bar {
    display: flex;
    width: 100%;
    height: 30px;
    background: linear-gradient(180deg, $weui-red 0%, lighten($weui-red, 10%) 100%);
    padding: 1em 0;
    margin-bottom: 10px;

    .status-text {
      color: #fff;
      font-size: 14px;
      margin-left: 2em;
    }
  }

  .address-info {
    display: block;
    overflow: hidden;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
  }

  .product-list {
    display: block;
    overflow: hidden;
    background-color: #fff;

    .product-item {
      display: flex;
      padding: 8px;
      border-bottom: 1px solid #ececec;
      position: relative;

      .thumbnail {
        width: 70px;
        height: 70px;
      }

      .item-right {
        display: flex;
        flex-direction: column;
        padding: 0 14px;
        justify-content: space-between;

        .name {
          color: #555;
          display: block;
          font-size: 15px;
          font-weight: 500;
        }

        .amount {
          display: block;
          font-size: 12px;
          color: #888;
        }

        .price {
          color: #444;
          display: block;
          font-size: 14px;
        }

        .add-to-cart {
          font-size: 12px;
          position: absolute;
          right: 10px;
          bottom: 10px;
          border: 1px solid #ddd;
          background: none;
          outline: none;
          padding: .2em .3em;
        }
      }
    }
  }

  .fee-info {
    margin-bottom: 70px;
  }

  footer {
    display: block;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    z-index: 20;
    background-color: #fff;
    padding: .5rem 1rem;
    width: calc(100vw - 2rem);

    .weui-flex__item {
      display: flex;
      justify-content: center;
    }
  }
</style>

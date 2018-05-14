<template>
  <div>
    <div class="top-tips">
      请在下单后 48 小时内完成支付，超过 24 小时后订单将自动取消。
    </div>

    <wv-group>
      <wv-cell title="订单号" :value="orderNumber"></wv-cell>
      <wv-cell title="商品金额" :value="order.total_fee | priceFilter"></wv-cell>
    </wv-group>

    <div class="buttons">
      <wv-button type="primary" @click="pay"><i class="iconfont icon-wechat-pay"></i>微信支付</wv-button>
    </div>
  </div>
</template>

<script>
  import { Group, Cell, Button } from 'we-vue'
  import priceFilter from '../mixins/price_filter'

  export default {
    components: {
      [Group.name]: Group,
      [Cell.name]: Cell,
      [Button.name]: Button
    },

    mixins: [
      priceFilter
    ],

    data () {
      return {
        order: {},
        orderNumber: null
      }
    },

    mounted () {
      this.orderNumber = this.$route.params.order_no

      this.axios.get('order/' + this.orderNumber).then((response) => {
        this.order = response.data.order
      }).catch((error) => {
        console.log(error)
      })
    },

    methods: {
      pay () {
        console.log('pay')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../sass/shop_variables";

  .top-tips {
    display: block;
    background-color: $weui-color-warn;
    color: #f2f2f2;
    font-size: 12px;
    padding: .3em .5em;
  }

  .buttons {
    display: block;
    overflow: hidden;
    width: 95%;
    margin: 20px auto;

    .iconfont {
      margin-right: .5em;
    }
  }
</style>

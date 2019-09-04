<template>
  <div>
    <div class="top-tips">
      请在下单后 48 小时内完成支付，超过 24 小时后订单将自动取消。
    </div>

    <w-group>
      <w-cell title="订单号" :value="orderNumber" />
      <w-cell title="商品金额" :value="order.total_fee | priceFilter" />
    </w-group>

    <div class="buttons">
      <w-button
        type="primary"
        @click="pay"
      >
        <i class="iconfont icon-wechat-pay" />微信支付
      </w-button>
    </div>
  </div>
</template>

<script>
import { WGroup, WCell, WButton } from 'we-vue/lib'
import priceFilter from '../mixins/price_filter'

export default {
  components: {
    [WGroup.name]: WGroup,
    [WCell.name]: WCell,
    [WButton.name]: WButton,
  },

  mixins: [priceFilter],

  data () {
    return {
      order: {},
      orderNumber: null,
    }
  },

  mounted () {
    this.orderNumber = this.$route.params.order_no

    this.axios
      .get('order/' + this.orderNumber)
      .then(response => {
        this.order = response.data.order
      })
      .catch(error => {
        console.log(error)
      })
  },

  methods: {
    pay () {
      console.log('pay')
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../../sass/shop_variables';

.top-tips {
  display: block;
  background-color: $weui-color-warn;
  color: #f2f2f2;
  font-size: 12px;
  padding: 0.3em 0.5em;
}

.buttons {
  display: block;
  overflow: hidden;
  width: 95%;
  margin: 20px auto;

  .iconfont {
    margin-right: 0.5em;
  }
}
</style>

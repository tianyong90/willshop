<template>
  <div>
    <div class="top-tips">
      请在下单后 48 小时内完成支付，超过 24 小时后订单将自动取消。
    </div>
    <router-link to="/address" class="address-panel">
      <div class="content">
        <div class="consumer-name">田勇</div>
        <div class="consumer-mobile">13222225555</div>
        <div class="address">广东省深圳市南山区软件产业基地</div>
      </div>
      <div class="bottom-border"></div>
    </router-link>

    <div class="weui-panel weui-panel_access product-list">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg" v-for="cart in carts" :key="cart.id">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="cart.product.thumbnail">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title" v-text="cart.product.name"></h4>
            <p class="weui-media-box__desc">
              <span class="price">{{ cart.product.price | priceFilter }}</span> &times;
              <span v-html="cart.amount" class="amount"></span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <wv-group class="other-info">
      <wv-cell title="商品件数" :value="productAmount"></wv-cell>
      <wv-cell title="商品金额" :value="totalPrice | priceFilter"></wv-cell>
      <wv-cell title="优惠" value="0"></wv-cell>
    </wv-group>

    <footer>
      <div class="total-price">实付款：{{ totalPrice | priceFilter }}</div>
      <button class="btn btn-checkout" @click="checkout">立即下单</button>
    </footer>
  </div>
</template>

<script>
  import { Group, Cell } from 'we-vue'
  import priceFilter from '../mixins/price_filter'

  export default {
    components: {
      [Group.name]: Group,
      [Cell.name]: Cell
    },

    mixins: [
      priceFilter
    ],

    data () {
      return {
        addressId: null,
        carts: []
      }
    },

    computed: {
      // 总价
      totalPrice () {
        if (this.carts.length === 0) return 0

        // 选中的樟商品总价累加
        let price = 0
        this.carts.forEach((val) => {
          price += (val.product.price * val.amount)
        })
        return price
      },

      // 商品总数
      productAmount () {
        if (this.carts.length === 0) return 0

        // 商品数累加
        let amount = 0
        this.carts.forEach((val) => {
          amount += val.amount
        })
        return amount
      }
    },

    mounted () {
      this.carts = JSON.parse(localStorage.getItem('selectedCarts'))
    },

    methods: {
      checkout () {
        let cartIds = []
        for (let cart of this.carts.values()) {
          cartIds.push(cart.id)
        }

        let postData = {
          cartIds: cartIds,
          addressId: 1,
          remark: 'hello'
        }

        this.axios.post('checkout', postData).then((response) => {
          this.$router.push('/payment/' + response.data.order_no)
        }).catch((error) => {
          console.log(error)
        })
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

  .address-panel {
    display: block;
    overflow: hidden;
    background-color: #fff;

    .content {
      display: block;
      color: $weui-text-color-gray;
      overflow: hidden;
      padding: .5em 1em;

      .consumer-name,
      .consumer-mobile {
        display: block;
        float: left;
        color: $weui-text-color-title;
        font-size: 14px;
        margin-right: 2em;
      }

      .address {
        clear: both;
        display: block;
        color: $weui-text-color-gray;
        font-size: 13px;
      }
    }

    .bottom-border {
      display: block;
      width: 100%;
      height: 3px;
      background-size: 100px 100px;
      background-image: linear-gradient(45deg, #f25953 12.5%, #fbfaf5 12.5%, #fbfaf5 25%, #5590d6 25%, #5590d6 37.5%, #fbfaf5 37.5%, #fbfaf5 50%, #f25953 50%, #f25953 62.5%, #fbfaf5 62.5%, #fbfaf5 75%, #5590d6 75%, #5590d6 87.5%, #fbfaf5 87.5%, #fbfaf5 100%);
    }
  }

  .product-list {
    .price {
      color: red;
    }

    .amount {
      color: $weui-text-color-gray;
    }
  }

  .other-info {
    margin-bottom: 70px;
  }

  footer {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    height: 50px;
    justify-content: flex-end;
    z-index: 100;

    .total-price {
      margin-right: .5em;
      line-height: 50px;
      color: red;
    }

    .btn-checkout {
      border: none;
      color: #fff;
      padding: 0 20px;
      vertical-align: middle;
      background-color: $weui-color-warn;
    }
  }
</style>

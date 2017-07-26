<template>
  <div>
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg" v-for="cart in carts">
          <input class="checker" type="checkbox" :value="cart" v-model="selectedCarts">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="cart.product.thumbnail">
          </div>
          <div class="weui-media-box__bd">
            <router-link tag="h4" :to="'/product/' + cart.product.id" class="weui-media-box__title" v-text="cart.product.name"></router-link>
            <p class="weui-media-box__desc price" v-text="cart.product.price"></p>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <label id="check-all" for="check-all">
        <input type="checkbox" v-model="allSelected" @click="checkAllClick"> 全选
            </label>
      <div class="summary">
        <div class="total-price">合计：{{ totalPrice }}</div>
      </div>
      <button class="btn btn-checkout" :class="{ 'disabled': selectedCarts.length === 0 }" @click="toCheckout">去结算 <span class="product-amount">{{ `(${productAmount})` }}</span>
      </button>
    </footer>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        carts: [],
        selectedCarts: []
      }
    },

    mounted () {
      this.getCarts()
    },

    computed: {
      // 是否是全选
      allSelected () {
        return this.selectedCarts.length === this.carts.length
      },

      // 总价
      totalPrice () {
        if (this.selectedCarts.length === 0) return 0

        // 选中的樟商品总价累加
        let price = 0
        this.selectedCarts.forEach((val) => {
          price += (val.product.price * val.amount)
        })
        return price
      },

      // 选中的购物车项包含的商品总数
      productAmount () {
        if (this.selectedCarts.length === 0) return 0

        // 选中的订单中商品数累加
        let count = 0
        this.selectedCarts.forEach((val) => {
          count += val.amount
        })
        return count
      }
    },

    methods: {
      // 获取购物车列表数据
      getCarts () {
        this.axios.get('cart').then(response => {
          this.carts = response.data.carts
        })
      },

      // 去结算
      toCheckout () {
        if (this.selectedCarts.length > 0) {
          // TODO: 跳转至结算页
        }
      },

      // 全选和取消全选
      checkAllClick () {
        if (this.allSelected) {
          this.selectedCarts = []
        } else {
          this.selectedCarts = this.carts
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .checker {
    margin-right: 10px;
  }

  .price {
    color: #f44336;
  }

  footer {
    display: block;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    height: 50px;

    #check-all {
      float: left;
      margin: 11px 10px;
      font-size: 13px;
    }

    .summary {
      float: left;
      padding-left: 10px;
    }

    .total-price {
      color: #f00;
      font-size: 15px;
      line-height: 50px;
    }

    .btn-checkout {
      display: block;
      float: right;
      color: #fff;
      line-height: 50px;
      padding: 0 20px;
      background-color: #f44336;
      border: none;

      &.disabled {
        background-color: #ccc;
        color: #464242;
      }

      .product-amount {
        font-size: 12px;
      }
    }
  }
</style>

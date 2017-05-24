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
        <input type="checkbox" v-model="selectAll" @click="checkAllClick"> 全选
            </label>
      <div class="summary">
        <div class="total-price">合计：{{ totalPrice }}</div>
        <div class="product-count">已选 {{ productAmount }} 件商品</div>
      </div>
      <button class="btn btn-checkout" :class="{ 'disabled': selectedCarts.length === 0 }" @click="checkout">去结算
      </button>
    </footer>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.getCarts();
    },

    data () {
      return {
        carts: [],
        selectedCarts: []
      }
    },

    computed: {
      selectAll () {
        return this.selectedCarts.length === this.carts.length;
      },

      totalPrice () {
        if (this.selectedCarts.length === 0) {
          return 0;
        }

        // 选中的樟商品总价累加
        let price = 0;
        for (let index in this.selectedCarts) {
          price += (this.selectedCarts[index].product.price * this.selectedCarts[index].amount);
        }

        return price;
      },

      productAmount () {
        if (this.selectedCarts.length === 0) {
          return 0;
        }

        // 选中的订单中商品数累加
        let count = 0;
        for (let index in this.selectedCarts) {
          count += this.selectedCarts[index].amount;
        }

        return count;
      }
    },

    methods: {
      // 获取购物车列表数据
      getCarts () {
        this.axios.get('cart').then(response => {
          this.carts = response.data.carts;
        });
      },

      // 去结算
      checkout () {
        if (this.selectedCarts.length > 0) {
          this.axios.post('checkout', { selectedCarts: this.selectedCarts }).then(response => {
            this.$router.push('/checkout');
          }).catch(error => {
            console.log(error);
          });
        }
      },

      // 全选和取消全选
      checkAllClick () {
        if (this.selectAll) {
          this.selectedCarts = [];
        } else {
          this.selectedCarts = this.carts;
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
    }

    .product-count {
      font-size: 13px;
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
    }
  }
</style>

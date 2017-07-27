<template>
  <div>
    <div class="address">

    </div>

    <ul class="cart-list">
      <li class="list-item" v-for="cart in carts">
        <input class="checker" type="checkbox" name="">
        <img :src="cart.product.thumbnail" alt="" class="thumbnail">
        <div class="right-part">
          <h3 class="name">{{ cart.product.name }}</h3>
          <span class="price">{{ cart.product.price }}</span>
        </div>
      </li>
    </ul>

    <footer>
      <div class="total-price">实付款：{{ totalPrice }}</div>
      <button class="btn btn-checkout">立即下单</button>
    </footer>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        carts: []
      }
    },

    mounted () {
      this.carts = JSON.parse(localStorage.getItem('selectedCarts'))
    },

    methods: {
      getCarts () {
        this.axios.get('order/create').then(response => {
          this.carts = response.data
        })
      },

      checkout () {
        this.axios.post('checkout', { selectedCarts: this.selectedCarts }).then(response => {
          this.$router.push('/checkout')
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #cart-liat {
    display: block;
    margin: 0;
    padding: 0;

    .list-item {
      display: block;
      padding: 5px;
      border-bottom: 1px solid #555;

      .thumbnail {
        display: block;
        float: left;
        width: 100px;
        height: 60px;
      }

      .right-part {
        display: block;
        float: right;

      }
    }
  }

  footer {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    height: 50px;

    .total-price {
      float: right;
      line-height: 50px;
      color: red;
    }

    .btn-checkout {
      display: block;
      float: right;
      color: #fff;
      line-height: 50px;
      padding: 0 20px;
      background-color: #f00;
    }
  }

</style>

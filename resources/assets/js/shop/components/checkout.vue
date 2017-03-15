<template>
  <div>
    <ul id="cart-list">
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
      <input type="checkbox" id="check-all">
      <div class="total-price">合计：{{ totalPrice }}</div>
      <router-link to="/order" class="btn" id="btn-checkout">立即下单</router-link>
    </footer>
  </div>
</template>

<script>
  export default {
    mounted () {
      // this.getCarts();
    },

    data () {
      return {
        carts: []
      }
    },

    methods: {
      getCarts () {
        this.axios.get('cart/lists').then(response => {
          this.carts = response.data;
        });
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
    display: block;
    position: fixed;
    bottom: 55px;
    width: 100%;
    background-color: #fff;
    height: 50px;

    #check-all {
      float: left;

    }

    .total-price {
      float: left;
    }

    #btn-checkout {
      display: block;
      float: right;
      color: #fff;
      line-height: 50px;
      padding: 0 20px;
      background-color: #f00;
    }
  }

</style>

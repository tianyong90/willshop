<template>
  <div>
    <router-link class="user-profile" tag="div" to="profile">
      <img class="avatar" :src="user.avatar || '/img/avatar.jpg'">
      <div class="username">{{ user.name }}</div>
      <div class="mobile">{{ user.mobile }}</div>
    </router-link>

    <wv-flex class="card">
      <wv-flex-item class="card-item br-1px">
        <span class="amount">1130</span>
        <span class="label">我的余额</span>
      </wv-flex-item>
      <wv-flex-item class="card-item br-1px">
        <span class="amount">15</span>
        <span class="label">我的积分</span>
      </wv-flex-item>
      <wv-flex-item class="card-item">
        <span class="amount">0</span>
        <span class="label">我的红包</span>
      </wv-flex-item>
    </wv-flex>

    <wv-group>
      <wv-cell title="我的订单" is-link to="order-list">
        <i class="icon iconfont icon-goods" slot="icon"></i>
      </wv-cell>
      <wv-cell title="收货地址" is-link to="address">
        <i class="icon iconfont icon-location" slot="icon"></i>
      </wv-cell>
      <wv-cell title="我的收藏" is-link to="favourite">
        <i class="icon iconfont icon-like" slot="icon"></i>
      </wv-cell>
    </wv-group>

    <wv-group>
      <wv-cell title="使用帮助" is-link to="help">
        <i class="icon iconfont icon-question" slot="icon"></i>
      </wv-cell>
      <wv-cell title="关于我们" is-link to="about-us">
        <i class="icon iconfont icon-info" slot="icon"></i>
      </wv-cell>
    </wv-group>

    <wv-button class="btn-logout" type="warn" @click.native="logout">退出登录</wv-button>
  </div>
</template>

<script>
  import appConfig from '../config';

  export default {
    mounted () {
      this.getUser();
    },

    data () {
      return {
        user: {}
      }
    },

    methods: {
      getUser () {
        this.axios.get('current-user').then(response => {
          this.user = response.data.user;
        });
      },

      logout () {
        // 清除 jwt-token
        localStorage.removeItem(appConfig.jwtTokenName);

        // 登录状态设置为已经登录
        this.$store.commit('UPDATE_IS_LOGIN', false);

        this.$router.replace('/');
      }
    }
  }
</script>

<style scoped lang="scss">
  .user-profile {
    display: block;
    overflow: hidden;
    background-color: #2696cb;
    padding: 20px;
    .avatar {
      display: block;
      float: left;
      width: 70px;
      height: 70px;
      border-radius: 70px;
      margin-right: 20px;
    }
    .username {
      display: block;
      color: #fff;
      font-size: 18px;
    }
    .mobile {
      display: block;
      color: #fff;
      font-size: 15px;
    }
  }

  .card {
    .br-1px {
      border-right: 1px solid #ececec;
    }

    .card-item {
      display: block;
      padding: .3rem;
      overflow: hidden;
      background-color: #fff;
      text-align: center;

      .amount {
        display: block;
        color: #f74c31;
        font-size: 16px;
        font-weight: 500;
      }

      .label {
        display: block;
        color: #666;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }

  .icon {
    display: inline-block;
    float: left;
    margin-right: 5px;
    color: #777;
  }

  .card-demo-flex {
    display: flex;
  }

  .card-demo-content01 {
    padding: 10px 0;
  }

  .card-padding {
    padding: 15px;
  }

  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }

  .card-demo-flex span {
    color: #f74c31;
  }

  .btn-logout {
    display: block;
    margin: 30px auto 80px;
    width: 80%;
  }
</style>

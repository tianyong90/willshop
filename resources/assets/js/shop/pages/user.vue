<template>
  <div class="main">
    <div class="user-profile">
      <img class="avatar" :src="user.avatar || defaultAvatar">
      <div class="nickname">{{ user.nickname }}</div>
      <div class="mobile">{{ user.mobile }}</div>
    </div>

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
  </div>
</template>

<script>
  import defaultAvatar from '../../../img/default-avatar.jpg'
  import { Group, Cell, Flex, FlexItem } from 'we-vue'

  export default {
    components: {
      [Group.name]: Group,
      [Cell.name]: Cell,
      [Flex.name]: Flex,
      [FlexItem.name]: FlexItem
    },

    data () {
      return {
        user: {},
        defaultAvatar
      }
    },

    mounted () {
      this.getUser()
    },

    methods: {
      getUser () {
        this.axios.get('current-user').then((response) => {
          this.user = response.data.user
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  $avatar-size: 80px;

  .main {
    margin-bottom: 70px;
  }

  .user-profile {
    display: flex;
    flex-direction: column;
    background-color: #2696cb;
    padding: 20px;
    justify-content: center;
    align-items: center;

    .avatar {
      display: block;
      float: left;
      width: $avatar-size;
      height: $avatar-size;
      border-radius: 70px;
    }

    .nickname {
      display: block;
      color: #fff;
      font-size: 1.1rem;
      margin-top: .5rem;
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
</style>

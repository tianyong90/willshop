<template>
  <div class="main-container main-with-padding">
    <el-row
      :gutter="20"
      type="flex"
      justify="center">
      <el-col :span="6">
        <el-card
          shadow="hover"
          class="card">
          <div class="card-title">会员数</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card
          shadow="hover"
          class="card">
          <div class="card-title">商品数</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card
          shadow="hover"
          class="card">
          <div class="card-title">订单数</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card
          shadow="hover"
          class="card">
          <div class="card-title">订单数</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import userConfig from '../config'

export default {
  data () {
    return {}
  },

  mounted () {
    this.axios
      .get('user')
      .then(response => {
        // this.accounts = response.data.accounts;
        // window.localStorage.setItem(userConfig.accountsKey, JSON.stringify(response.data.accounts));
      })
      .catch(error => {
        console.log(error)
      })
  },

  methods: {}
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  background-color: #909090;
  height: 120px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);

  .card-title {
    font-size: 1.5rem;
    font-weight: 400;
    color: #fff;
  }
}
</style>

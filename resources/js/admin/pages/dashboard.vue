<template>
  <div class="main-container main-with-padding">
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="6">
        <el-card shadow="hover" class="card">
          <div class="card-title">会员数 {{ userCount }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="card">
          <div class="card-title">商品数 {{ productCount }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="card">
          <div class="card-title">订单数 {{ orderCount }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="card">
          <div class="card-title">订单数 {{ orderCount }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userConfig from '../config'

export default {
  data () {
    return {
      userCount: 0,
      productCount: 0,
      orderCount: 0
    }
  },

  computed: {},

  mounted () {
    this.axios
      .get('stats')
      .then(response => {
        Object.assign(this.$data, response.data)
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

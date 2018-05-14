<template>
  <div class="main-container main-with-padding">
    <el-form ref="form" :model="product" label-width="150px">
      <el-form-item label="公众号名称">
        <el-input v-model="product.name"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="product.type" placeholder="">
          <el-option label="订阅号" value="1"></el-option>
          <el-option label="认证订阅号" value="2"></el-option>
          <el-option label="服务号" value="3"></el-option>
          <el-option label="认证服务号" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="AppId">
        <el-input v-model="product.app_id"></el-input>
      </el-form-item>
      <el-form-item label="AppSecret">
        <el-input v-model="product.app_secret"></el-input>
      </el-form-item>
      <el-form-item label="AesKey">
        <el-input v-model="product.aes_key"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="product.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="store">保存</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        product: {
          id: '',
          name: '',
          type: '订阅号',
          app_id: '',
          app_secret: '',
          aes_key: '',
          merchant_id: '',
          merchant_key: '',
          cert_path: '',
          key_path: '',
          remark: ''
        }
      }
    },

    mounted () {
      const productId = this.$route.params.id

      if (productId) {
        this.axios.get(`product/show/${productId}`).then((response) => {
          this.product = response.data.product
        })
      }
    },

    computed: {},

    methods: {
      store () {
        this.axios.post('product/store', this.product).then((response) => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })

          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        })
      }
    },

    watch: {}
  }
</script>

<style scoped lang="scss">
</style>

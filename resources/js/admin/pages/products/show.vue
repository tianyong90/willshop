<template>
  <div class="main-container main-with-padding">
    <el-form ref="form" :model="product" label-width="150px">
      <el-form-item label="产品名称">
        <el-input v-model="product.name"/>
      </el-form-item>
      <el-form-item label="产品分类">
        <el-select v-model="product.type">
          <el-option label="订阅号" value="1"/>
          <el-option label="认证订阅号" value="2"/>
          <el-option label="服务号" value="3"/>
          <el-option label="认证服务号" value="4"/>
        </el-select>
      </el-form-item>
      <el-form-item label="AppId">
        <el-input v-model="product.app_id"/>
      </el-form-item>
      <el-form-item label="AppSecret">
        <el-input v-model="product.app_secret"/>
      </el-form-item>
      <el-form-item label="AesKey">
        <el-input v-model="product.aes_key"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="product.remark"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="store">保存</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    data () {
      return {
      }
    },

    computed: {
      ...mapState({
        product: state => state.product.product
      })
    },

    mounted () {
      const { productId } = this.$route.params

      this.loadData(productId)
    },

    methods: {
      ...mapActions({
        loadData: 'getRole'
      }),

      store () {
        this.axios.post(`product/${this.product.id}`, this.product)
          .then((response) => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })

            // setTimeout(() => {
            //   this.$router.push('/')
            // }, 1000)
          })
      }
    },

    watch: {}
  }
</script>

<style scoped lang="scss">

</style>

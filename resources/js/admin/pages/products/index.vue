<template>
  <div class="main-container main-with-padding">
    <div class="table-tools">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
      >
        <el-form-item>
          <el-input
            v-model="searchForm.keyword"
            placeholder="名称搜索"
            @keyup.enter.native="loadData"
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchForm.sex"
            placeholder="状态筛选"
            @change="loadData"
          >
            <el-option
              label="全部状态"
              value="all"/>
            <el-option
              label="abc"
              value="1"/>
            <el-option
              label="其它"
              value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="search"
          />
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :data="products.data"
      border>
      <el-table-column
        label="预览图"
        width="90">
        <template slot-scope="scope">
          <img
            :src="scope.row.thumbnail"
            class="thumbnail">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"/>
      <el-table-column
        prop="price"
        label="价格（元）"/>
      <el-table-column
        prop="stock"
        label="库存"/>
      <el-table-column
        prop="status"
        label="状态"/>
      <el-table-column
        prop="updated_at"
        label="更新时间"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link
            :to="'/product/' + scope.row.id"
            class="el-button el-button--primary el-button--small"
          >
            <i class="el-icon-edit"/>
          </router-link>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="deleteProduct(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>

    <div class="paginator">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="products.current_page"
        :page-size="products.per_page"
        layout="total, prev, pager, next, jumper"
        :total="products.tatal"
      />
    </div>
  </div>
</template>

<script>
import TableMixin from '../../mixins/table_mixin'
import { mapActions, mapState } from 'vuex'

export default {
  mixins: [TableMixin],

  data () {
    return {
      searchForm: {
        name: '',
        status: ''
      }
    }
  },

  computed: {
    ...mapState({
      products: state => state.product.products
    })
  },

  mounted () {
    this.loadData()
  },

  methods: {
    ...mapActions({
      loadData: 'getProducts'
    }),

    // // 以分页格式加载商品列表数据
    // loadData (page = 1) {
    //   this.axios.get('product', {
    //     params: {
    //       keyword: this.searchForm.keyword,
    //       sex: this.searchForm.sex,
    //       page: page
    //     }
    //   }).then((response) => {
    //     this.products = response.data.products
    //   }).catch((error) => {
    //     console.log(error)
    //   })
    // },

    /**
     * 删除商品
     * @param id
     */
    deleteProduct (id) {
      this.$confirm('确认要删除吗？', '操作确认').then(() => {
        this.axios
          .delete(`product/${id}`)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
  }
}
</script>

<style scoped lang="scss">
$thumbnail-size: 65px;

.thumbnail {
  display: block;
  overflow: hidden;
  width: $thumbnail-size;
  height: $thumbnail-size;
}
</style>

<template>
  <div class="main-container main-with-padding">
    <div class="table-tools">
      <el-form :inline="true"
               :model="searchForm"
               class="demo-form-inline"
      >
        <el-form-item>
          <el-input v-model="searchForm.keyword"
                    placeholder="按昵称搜索"
                    @keyup.enter.native="loadData"
          />
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.sex"
                     placeholder="性别筛选"
                     @change="loadData"
          >
            <el-option label="全部" value="all"/>
            <el-option label="男" value="0"/>
            <el-option label="女" value="1"/>
            <el-option label="其它" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     icon="el-icon-search"
                     @click="search"
          >搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="products.data" border>
      <el-table-column label="预览图" inline-template>
        <img :src="row.thumbnail" class="thumbnail">
      </el-table-column>
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="price" label="价格（元）"/>
      <el-table-column prop="stock" label="库存"/>
      <el-table-column prop="status" label="状态"/>
      <el-table-column prop="updated_at" label="更新时间"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="'/product/edit/' + scope.row.id"
                       class="el-button el-button--primary el-button--small"
          >
            <i class="el-icon-edit"/>
          </router-link>
          <el-button size="small"
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
        :total="products.tatal"/>
    </div>
  </div>
</template>

<script>
  import TableMixin from '../../mixins/table_mixin'

  export default {
    mixins: [TableMixin],

    data () {
      return {
        products: {},
        searchForm: {
          name: '',
          sex: 'all'
        }
      }
    },

    mounted () {
      this.loadData()
    },

    methods: {
      loadData (page = 1) {
        this.axios.get('product/list', {
          params: {
            keyword: this.searchForm.keyword,
            sex: this.searchForm.sex,
            page: page
          }
        }).then((response) => {
          this.products = response.data.products
        })
      },

      deleteProduct (id) {
        console.log('fuck')
      }
    }
  }
</script>

<style scoped lang="scss">
  .thumbnail {
    display: block;
    overflow: hidden;
    margin: 10px 0;
    width: 65px;
    height: 65px;
  }
</style>

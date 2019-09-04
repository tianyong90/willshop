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
            placeholder="按昵称搜索"
            @keyup.enter.native="loadTableData"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="search"
          >
            搜索
          </el-button>
        </el-form-item>

        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="search"
        >
          新建分类
        </el-button>
      </el-form>
    </div>

    <el-table
      :data="categories.data"
      border
    >
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img
            :src="scope.row.thumbnail"
            class="thumbnail"
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名"
      />
      <el-table-column
        prop="description"
        label="描述"
      />
      <el-table-column
        prop="product_count"
        label="商品数"
      />
      <el-table-column
        prop="created_at"
        label="创建时间"
      />
      <el-table-column
        prop="updated_at"
        label="更新时间"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click.native="$router.push('/user/' + scope.row.id)"
          >
            修改
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click.native="charge(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="paginator">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="categories.current_page"
        :page-size="categories.per_page"
        layout="total, prev, pager, next, jumper"
        :total="categories.tatal"
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
        sex: 'all',
      },
    }
  },

  computed: {
    ...mapState({
      categories: state => state.category.categories,
    }),
  },

  mounted () {
    this.loadTableData()
  },

  methods: {
    ...mapActions({
      loadTableData: 'getCategories',
    }),
  },
}
</script>

<style scoped lang="scss">
.thumbnail {
  height: 90px;
}
</style>

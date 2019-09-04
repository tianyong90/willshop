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
        <!--<el-form-item>-->
        <!--<el-select v-model="searchForm.sex" placeholder="性别筛选" @change="loadTableData">-->
        <!--<el-option label="全部" value="all"></el-option>-->
        <!--<el-option label="男" value="0"></el-option>-->
        <!--<el-option label="女" value="1"></el-option>-->
        <!--<el-option label="其它" value="2"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
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
          icon="el-icon-search"
          @click="search"
        >
          新建角色
        </el-button>
      </el-form>
    </div>

    <el-table
      :data="roles.data"
      border
    >
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column
        prop="name"
        label="角色名"
      />
      <el-table-column
        prop="guard_name"
        label="GUARD"
      />
      <el-table-column
        prop="created_at"
        label="创建时间"
      />
      <el-table-column
        prop="updated_at"
        label="更新时间"
      />
      <el-table-column
        prop="remark"
        label="用户数"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click.native="$router.push('/role/' + scope.row.id)"
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
        :current-page="roles.current_page"
        :page-size="roles.per_page"
        layout="total, prev, pager, next, jumper"
        :total="roles.tatal"
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
      roles: state => state.role.roles,
    }),
  },

  mounted () {
    this.loadTableData()
  },

  methods: {
    ...mapActions({
      loadTableData: 'getRoles',
    }),
  },
}
</script>

<style scoped lang="scss">
</style>

<template>
  <div class="main-container main-with-padding">
    <div class="table-tools">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchForm.keyword" placeholder="按昵称搜索"
                    @keyup.enter.native="loadData"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.sex" placeholder="性别筛选" @change="loadData">
            <el-option label="全部" value="all"></el-option>
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
            <el-option label="其它" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="orders.data" border>
      <el-table-column prop="nickname" label="昵称">
      </el-table-column>
      <el-table-column prop="sex" label="性别">
      </el-table-column>
      <el-table-column prop="location" label="地区">
      </el-table-column>
      <el-table-column prop="tagid_list" label="标签">
      </el-table-column>
      <el-table-column prop="subscribe_time" label="关注时间">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column label="操作" inline-template>
        <div>
          <el-button size="small" type="primary" @click.native="charge(row.id)">test</el-button>
          <el-button size="small" type="primary" @click.native="charge(row.id)">test</el-button>
        </div>
      </el-table-column>
    </el-table>

    <div class="paginator">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="orders.current_page"
          :page-size="orders.per_page"
          layout="total, prev, pager, next, jumper"
          :total="orders.tatal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import TableMixin from '../../mixins/table_mixin'

  export default {
    mixins: [TableMixin],

    data () {
      return {
        orders: [],
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
        this.axios.get('order/list', {
          params: {
            keyword: this.searchForm.keyword,
            sex: this.searchForm.sex,
            page: page
          }
        }).then((response) => {
          this.orders = response.data.orders
        })
      },

      syncWechatFans () {
        // 同步粉丝数据
        this.axios.post('order/lsit').then((response) => {
          this.loadData(1)
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
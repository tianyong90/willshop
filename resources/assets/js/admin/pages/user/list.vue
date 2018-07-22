<template>
  <div class="main-container main-with-padding">
    <div class="table-tools">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item>
          <el-input
            v-model="searchForm.keyword"
            placeholder="按昵称搜索"
            @keyup.enter.native="loadData"
          />
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.sex" placeholder="性别筛选" @change="loadData">
            <el-option label="全部" value="all"/>
            <el-option label="男" value="0"/>
            <el-option label="女" value="1"/>
            <el-option label="其它" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="search"
          >搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="users.data" border>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" class="avatar"/>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称"/>
      <el-table-column prop="name" label="用户名"/>
      <el-table-column prop="sex" label="性别"/>
      <el-table-column prop="location" label="地区"/>
      <el-table-column prop="subscribe_time" label="关注时间"/>
      <el-table-column prop="remark" label="备注"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click.native="$router.push('/user/' + scope.row.id)"
          >详情</el-button>
          <el-button
            size="small"
            type="primary"
            @click.native="charge(scope.row.id)"
          >角色及权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="paginator">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="users.current_page"
          :page-size="users.per_page"
          layout="total, prev, pager, next, jumper"
          :total="users.tatal">
      </el-pagination>
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
          sex: 'all'
        }
      }
    },

    computed: {
      ...mapState({
        users: state => state.user.users
      })
    },

    mounted () {
      this.loadData()
    },

    methods: {
      ...mapActions({
        loadData: 'getUsers'
      }),

      syncWechatFans () {
        // 同步粉丝数据
        this.axios.post('user/lsit').then((response) => {
          this.loadData(1)
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  $avatar-size: 50px;

  .avatar {
    display: block;
    overflow: hidden;
    margin: 10px 0;
    width: $avatar-size;
    height: $avatar-size;
  }
</style>

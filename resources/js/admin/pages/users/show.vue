<template>
  <div class="main-container main-with-padding">
    <el-form
      ref="form"
      :model="role"
      label-width="120px">
      <el-form-item label="角色名">
        <el-input v-model="role.name"/>
      </el-form-item>
      <el-form-item label="GUARD NAME">
        <el-select
          v-model="role.guardname"
          placeholder="请选择">
          <el-option
            v-for="(guard, index) in guardNames"
            :key="index"
            :label="guard"
            :value="guard"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input
          v-model="role.created_at"
          readonly/>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input
          v-model="role.updated_at"
          readonly/>
      </el-form-item>
      <el-form-item size="large">
        <el-button
          type="primary"
          @click="onSubmit">保存</el-button>
        <el-button @click="$router.go(-1);">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import TableMixin from '../../mixins/table_mixin'

export default {
  mixins: [TableMixin],

  data () {
    return {
      users: {}
    }
  },

  mounted () {
    this.loadTableData()
  },

  methods: {
    loadTableData (page = 1) {
      this.axios
        .get('user/list', {
          params: {
            keyword: this.searchForm.keyword,
            sex: this.searchForm.sex,
            page: page
          }
        })
        .then(response => {
          this.users = response.data.users
        })
    }
  }
}
</script>

<style scoped lang="scss">
$avatar-size: 50px;
</style>

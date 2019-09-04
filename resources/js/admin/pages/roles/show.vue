<template>
  <div class="main-container main-with-padding">
    <el-form
      ref="form"
      :model="role"
      label-width="120px"
    >
      <el-form-item label="角色名">
        <el-input v-model="role.name" />
      </el-form-item>
      <el-form-item label="GUARD NAME">
        <el-select
          v-model="role.guardname"
          placeholder="请选择"
        >
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
          readonly
        />
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input
          v-model="role.updated_at"
          readonly
        />
      </el-form-item>
      <el-form-item size="large">
        <el-button
          type="primary"
          @click="onSubmit"
        >
          保存
        </el-button>
        <el-button @click="$router.go(-1);">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {}
  },

  computed: {
    ...mapState({
      role: state => state.role.role,
      guardNames: state => state.role.guardNames,
    }),
  },

  mounted () {
    this.getGuardNames()

    const { roleId } = this.$route.params

    this.loadTableData(roleId)
  },

  methods: {
    ...mapActions({
      loadTableData: 'getRole',
      getGuardNames: 'getGuardNames',
    }),

    onSubmit () {
      this.axios
        .post('role', this.role)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped lang="scss">
</style>

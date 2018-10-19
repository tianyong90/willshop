<template>
  <div class="main-container main-with-padding">
    {{ user }}
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

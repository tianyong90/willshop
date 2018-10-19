import Paginator from '../components/paginator'

export default {
  components: {
    Paginator
  },

  methods: {
    // 搜索
    search () {
      this.loadTableData(1)
    },

    handleCurrentChange (page) {
      this.loadTableData(page)
    }
  }
}

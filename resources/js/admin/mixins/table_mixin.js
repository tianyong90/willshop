import Paginator from '../components/paginator'

export default {
  components: {
    Paginator,
  },

  mounted () {
    if (typeof this.loadTableData === 'function') {
      this.loadTableData()
    } else {
      throw new Error('Must have a loadTableData method!')
    }
  },

  methods: {
    // 搜索
    search () {
      this.loadTableData(1)
    },

    handleCurrentChange (page) {
      this.loadTableData(page)
    },
  },
}

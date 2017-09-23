export default {
  methods: {
    // 搜索
    search () {
      this.loadData(1)
    },

    handleCurrentChange (page) {
      this.loadData(page)
    }
  }
}

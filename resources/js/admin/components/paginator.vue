<template>
  <div class="paginator">
    <el-pagination
      @current-change="currentChange"
      :current-page="data.current_page"
      :page-sizes="[20, 30, 40, 50]"
      :page-size="data.per_page"
      layout="total, prev, pager, next, jumper"
      :total="data.total"/>
  </div>
</template>

<script>
export default {
  name: 'paginator',

  props: {
    data: Object,
    currentChange: {
      type: Function,
      required: true
    }
  }
}
</script>

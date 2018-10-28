<template>
  <div/>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },

  computed: {
    ...mapState({
      MenuConfig: state => state.sidebar.MenuConfig
    })
  },

  methods: {
    selected (index, indexPath) {
      console.log(index)
      console.log(indexPath)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../sass/admin_variables';

.sidebar {
  width: 100%;
  height: 100%;

  .iconfont {
    font-size: 1.4em;
    font-weight: bold;
    margin-right: 0.5em;
  }
}
</style>

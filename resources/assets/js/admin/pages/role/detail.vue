<template>
  <div class="main-container main-with-padding">
    {{ role }}
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    data () {
      return {
      }
    },

    computed: {
      ...mapState({
        role: state => state.role.role
      })
    },

    mounted () {
      const { roleId } = this.$route.params

      this.loadData(roleId)
    },

    methods: {
      ...mapActions({
        loadData: 'getRole'
      })
    }
  }
</script>

<style scoped lang="scss">
</style>

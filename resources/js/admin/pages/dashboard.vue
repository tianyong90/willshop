<template>
  <v-app>
    <v-btn
      color="success"
    >
      haha
    </v-btn>

    <v-btn class="color">fuck</v-btn>

    <v-avatar
      size="50"
    >
      <img src="https://s9.rr.itc.cn/r/wapChange/20174_24_0/a7a01098906440390405.jpg" alt="">
    </v-avatar>
  </v-app>
</template>

<script>
import userConfig from '../config'

export default {
  data () {
    return {
      userCount: 0,
      productCount: 0,
      orderCount: 0
    }
  },

  computed: {},

  mounted () {
    this.axios
      .get('stats')
      .then(response => {
        Object.assign(this.$data, response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },

  methods: {}
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  background-color: #909090;
  height: 120px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);

  .card-title {
    font-size: 1.5rem;
    font-weight: 400;
    color: #fff;
  }
}
</style>

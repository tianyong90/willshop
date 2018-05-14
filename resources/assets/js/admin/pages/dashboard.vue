<template>
  <div class="main-container main-with-padding">
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="6">
        <h1>dashboard</h1>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // import userConfig from '../config'

  export default {
    data () {
      return {}
    },

    mounted () {
      this.axios.get('user').then((response) => {
        // this.accounts = response.data.accounts;
        // window.localStorage.setItem(userConfig.accountsKey, JSON.stringify(response.data.accounts));
      }).catch((error) => {
        console.log(error)
      })
    },

    methods: {}
  }
</script>

<style scoped lang="scss">
  .setting-icon {
    color: #777;
    cursor: pointer;
  }

  .account-info {
    padding: 0;
    margin: 0;

    li {
      margin: .5em 0;
      color: #444;
    }

    .label {
      color: #000;
      display: block;
      float: left;
      width: 4em;
      text-align-last: justify;
      margin-right: 1em;
    }
  }

  .plus-card {
    display: block;
    overflow: hidden;
    background-color: #fff;
    height: 100%;
    position: relative;

    i {
      position: absolute;
      font-size: 3rem;
      color: lightgray;
      top: 50%;
      left: 50%;
      margin-top: -1.5rem;
      margin-left: -1.5rem;
    }
  }
</style>

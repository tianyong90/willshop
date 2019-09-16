<template>
  <div class="flex w-full h-screen justify-center items-center">
    <div class="flex flex-col w-1/2 justify-center items-center form">
      <input class="flex" type="text" v-model="user.name">
      <input class="flex" type="password" v-model="user.password">
      <button class="bg-red-500 p-2" @click="login">
        登录
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        name: 'admin', // TODO
        password: '12345678', // TODO
      },
    }
  },

  mounted () {
  },

  methods: {
    login () {
      // todo
    },

    getUser () {
      this.axios.get('current-user').then(response => {
        this.user = response.data.user
      })
    },
  },
}
</script>

<style scoped lang="scss">
</style>

<template>
  <div>
    <wv-group>
      <wv-cell title="头像" to="/avatar" is-link>
        <img class="avatar" slot="ft" :src="user.avatar ? user.avatar : '/img/avatar.jpg'" alt="">
      </wv-cell>
      <wv-cell title="用户名" value="admin"></wv-cell>
    </wv-group>

    <wv-group title="账号安全">
      <wv-cell title="登录密码" is-link to="password"></wv-cell>
    </wv-group>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.getUser();
    },

    data () {
      return {
        user: {}
      }
    },

    methods: {
      getUser () {
        this.axios.get('current-user').then(response => {
          this.user = response.data.user;
        }).catch(error => {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .avatar {
    display: inline-block;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    padding: 2px;
    border: 1px solid #ccc;
  }
</style>

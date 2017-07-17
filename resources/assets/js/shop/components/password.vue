<template>
  <div>
    <wv-group title="修改密码">
      <wv-input type="password" v-model.trim="oldPassword" placeholder="原密码"></wv-input>
      <wv-input type="password" v-model.trim="password" placeholder="新密码"></wv-input>
      <wv-input type="password" v-model.trim="password_confirmation" placeholder="确认新密码"></wv-input>
    </wv-group>
    <wv-button class="btn-submit" type="primary" @click.native="submit" :disabled="!canSubmit">确定</wv-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        oldPassword: '',
        password: '',
        password_confirmation: ''
      }
    },

    computed: {
      canSubmit: function () {
        let reg = /.{6,20}/

        if (!this.oldPassword.match(reg)) {
          return false
        }

        if (!this.password.match(reg)) {
          return false
        }

        if (!this.password_confirmation.match(reg)) {
          return false
        }

        if (this.password_confirmation !== this.password) {
          return false
        }

        return true
      }
    },

    methods: {
      submit () {
        this.axios.post('update-password', this.$data).then(response => {
          this.$root.success(response.data.info)

          setTimeout(() => {
            this.$router.push('/user')
          }, 1000)
        }, response => {
          this.$root.error(response.data[0])
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .btn-submit {
    width: 90%;
    margin: 20px auto;
  }
</style>

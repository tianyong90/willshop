<template>
  <div>
    <wv-group title="收货地址信息">
      <wv-input label="收货人" v-model="address.name"></wv-input>
      <wv-input label="手机号码" v-model="address.mobile"></wv-input>
      <wv-input label="详细地址" v-model="address.address"></wv-input>
      <wv-input label="邮政编码" v-model="address.postcode"></wv-input>
    </wv-group>

    <footer>
      <wv-flex :gutter="20">
        <wv-flex-item v-if="$route.params.id">
          <wv-button type="warn" @click.native="deleteAddress">删除</wv-button>
        </wv-flex-item>
        <wv-flex-item>
          <wv-button type="primary" @click.native="store">保存</wv-button>
        </wv-flex-item>
      </wv-flex>
    </footer>
  </div>
</template>

<script>
  import WeVue from 'we-vue';

  export default {
    mounted () {
      this.getAddress();
    },

    data () {
      return {
        address: {},
        pca: [],
      }
    },

    methods: {
      getName (value) {
        // TODO: 地址值转地址名
        // return value2name(value, AddressChinaData);
      },

      getAddress () {
        let addressId = this.$route.params.id;

        console.log(addressId)

        if (addressId) {
          this.axios.get(`address/${addressId}`).then(response => {
            this.address = response.data.address;
          }, response => {
            console.log(response.data);
          });
        }
      },

      // 保存
      store () {
        let postData = JSON.parse(JSON.stringify(this.$data));

        let addressId = this.$route.params.id;

        if (addressId) {
          postData.id = addressId;
        }

        this.axios.post('address/store', postData).then(response => {
          this.$root.success('保存成功');

          setTimeout(() => {
            this.$router.push('/address');
          }, 1000);
        }, response => {
          console.log(response.data);
        });
      },

      // 删除
      deleteAddress () {
        WeVue.Dialog({
            title: '操作提示',
            message: '确定要删除吗？',
            skin: 'ios'
          },
          () => {
            this.axios.delete(`address/${this.address.id}/delete`).then(() => {
              this.$root.success('删除成功');

              setTimeout(() => {
                this.$router.push('/address');
              }, 1000);
            });
          });
      }
    }
  }
</script>

<style scoped lang="scss">
  footer {
    display: block;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 20;
    background-color: #fff;
    padding: .5rem 1rem;
  }
</style>

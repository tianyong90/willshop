<template>
    <group title="收货地址信息">
        <x-input title="收货人" :value.sync="address.name"></x-input>
        <x-input title="手机号码" :value.sync="address.mobile"></x-input>
        <address title="所在地区" :value.sync="value2" raw-value :list="addressData"></address>
        <x-input title="详细地址" :value.sync="address.address"></x-input>
    </group>

    <footer>
        <x-button type="warn" @click="delete">删除</x-button>
        <x-button type="primary" @click="save">保存</x-button>
    </footer>
</template>

<script>
    import { Cell,Group,XInput,XButton,Address,AddressChinaData } from 'vux';
    import value2name from 'vux/src/filters/value2name';

    export default {
        components: {
            Cell,
            Group,
            XInput,
            XButton,
            Address
        },

        ready: function () {
            this.getAddresses();
        },

        data: function () {
            return {
                address: {},
                addressData: AddressChinaData
            }
        },

        methods: {
            getAddresses: function () {
                var addressId = this.$route.params.id;

                if (addressId) {
                    this.$http.get('address/' + addressId + '/get').then(response => {
                        this.$set('address', response.json());
                    });
                }
            },

            save: function () {
                var postData = JSON.parse(JSON.stringify(this.$data));

                console.log(postData);

                this.$http.post('address/add', postData).then(response => {
                    console.log(response.json());
                });
            },

            delete: function () {
                var addressId = this.$route.params.id;

                this.$http.get('address/' + addressId + '/delete').then(response => {
                    console.log(response.json());
                });
            },

            destroy: function () {

                console.log('product destroy');
            }
        },

        beforeDestroy: function () {
            this.destroy();
        }
    }
</script>

<style scoped lang="sass">
    footer {
        display: block;
        overflow: hidden;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 1000;
        background-color: #fff;
        padding: 15px 0;

        button {
            display: block;
            float: left;
            width: 40%;
            margin: 0;
        }
    }
</style>

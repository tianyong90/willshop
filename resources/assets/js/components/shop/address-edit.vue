<template>
    <group title="收货地址信息">
        <x-input title="收货人" :value.sync="address.name"></x-input>
        <x-input title="手机号码" :value.sync="address.mobile"></x-input>
        <address title="所在地区" :value.sync="pca" :list="addressData"></address>
        <x-input title="详细地址" :value.sync="address.address"></x-input>
    </group>

    <footer>
        <x-button type="warn" @click="deleteAddress">删除</x-button>
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
            this.getAddress();

            console.log(value2name);
        },

        data: function () {
            return {
                address: {},
                addressData: AddressChinaData,
                address: {},
                pca: []
            }
        },

        methods: {
            getName: function (value) {
                // TODO: 地址值转地址名
                // return value2name(value, AddressChinaData);
            },

            getAddress: function () {
                var addressId = this.$route.params.id;

                if (addressId) {
                    this.$http.get('address/' + addressId).then(response => {

                        console.log(response.body);

                        this.$set('address', response.body);
                    });
                }
            },

            // 保存
            save: function () {
                console.log(value2name(this.pca));

                return false;

                var postData = JSON.parse(JSON.stringify(this.$data));

                this.$http.post('address/save', postData).then(response => {
                    console.log(response.body);
                });
            },

            // 删除
            deleteAddress: function () {
                var addressId = this.$route.params.id;

                console.log(addressId);

                this.$http.get('address/' + addressId + '/delete').then(response => {
                    console.log(response.body);
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
        z-index: 20;
        background-color: #fff;
        padding: 15px 0;
        button {
            display: block;
            float: left;
            width: 40%;
            margin: 0 5% !important;
        }
    }
</style>
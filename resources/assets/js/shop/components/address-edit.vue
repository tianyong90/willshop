<template>
    <group title="收货地址信息">
        <x-input title="收货人" :value.sync="address.name"></x-input>
        <x-input title="手机号码" :value.sync="address.mobile"></x-input>
        <address title="所在地区" :value.sync="pca" :list="addressData"></address>
        <x-input title="详细地址" :value.sync="address.address"></x-input>
        <x-input title="邮政编码" :value.sync="address.postcode"></x-input>
    </group>

    <footer>
        <flexbox>
            <flexbox-item v-if="$route.params.id">
                <x-button type="warn" @click="confirmShow = true">删除</x-button>
            </flexbox-item>
            <flexbox-item>
                <x-button type="primary" @click="save">保存</x-button>
            </flexbox-item>
        </flexbox>
    </footer>

    <actionsheet :show.sync="confirmShow" :menus="menuConfirmDelete" @on-click-menu-delete="deleteAddress()" show-cancel cancel-text="取消"></actionsheet>
</template>

<script>
    import { Cell,Group,Flexbox,FlexboxItem,XInput,XButton,Address,AddressChinaData,Actionsheet } from 'vux';
    import value2name from 'vux/src/filters/value2name';
    
    export default {
        components: {
            Cell,
            Group,
            XInput,
            XButton,
            Address,
            Flexbox,
            FlexboxItem,
            Actionsheet,
        },

        ready () {
            this.getAddress();
        },

        data () {
            return {
                address: {},
                addressData: AddressChinaData,
                address: {},
                pca: [],
                confirmShow: false,
                menuConfirmDelete: {
                    'title.noop': '确定要删除么?<br/><span style="color:#666;font-size:12px;">删除后将不可恢复</span>',
                    delete: '<span style="color:red">删除</span>'
                },
            }
        },

        methods: {
            getName (value) {
                // TODO: 地址值转地址名
                // return value2name(value, AddressChinaData);
            },

            getAddress () {
                let addressId = this.$route.params.id;

                if (addressId) {
                    this.$http.get(`address/${addressId}`).then(response => {
                        this.$set('address', response.body.address);
                    }, response => {
                        console.log(response.body);
                    });
                }
            },

            // 保存
            save () {
                // console.log(value2name(this.pca, AddressChinaData));

                let postData = JSON.parse(JSON.stringify(this.$data));

                let addressId = this.$route.params.id;
                
                if (addressId) {
                    postData.id = addressId;
                }

                this.$http.post('address/store', postData).then(response => {
                    this.$root.success('保存成功');

                    setTimeout(() => {
                        this.$route.router.go('/address');
                    }, 1000);
                }, response => {
                    console.log(response.body);
                });
            },

            // 删除
            deleteAddress () {
                let addressId = this.$route.params.id;

                this.$http.delete(`address/${addressId}/delete`).then(response => {
                    this.$root.success('删除成功');

                    setTimeout(() => {
                        this.$route.router.go('/address');
                    }, 1000);
                }, response => {
                    console.log(response.body);
                });
            },

            destroy () {
                console.log('product destroy');
            }
        },

        beforeDestroy () {
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
        padding: .5rem 0;

        .vux-flexbox {
            width: 90%;
            margin: 0 auto;
        }
    }
</style>
<template>
    <ul id="address-list" v-if="addresses.length">
        <li v-for="address in addresses">
            <div class="header">
                <span class="name">{{ address.name }}</span>
                <span class="mobile">{{ address.mobile }}</span>
            </div>
            <div class="body">
                <div class="address">{{ address.province + address.city + address.area + address.address }}</div>
            </div>
            <div class="footer">
                <span class="delete icon iconfont" @click="deleteClick(address)">&#xe612;</span>
                <a class="edit icon iconfont" v-link="{path: '/address/' + address.id}">&#xe61f;</a>
            </div>
        </li>
    </ul>

    <div class="empty" v-show="!$store.state.isLoading && addresses.length === 0">
        <i class="icon iconfont">&#xe617;</i>
        <div class="tips">您还没有设置地址</div>
    </div>

    <footer>
        <x-button type="primary" v-link="{ path: '/address/add' }">添加地址</x-button>
    </footer>

    <actionsheet :show.sync="confirmShow" :menus="menuConfirmDelete" @on-click-menu-delete="deleteAddress(activeAddress)" show-cancel cancel-text="取消"></actionsheet>
</template>

<script>
    import { XButton,Actionsheet } from 'vux';

    export default {
        components: {
            XButton,
            Actionsheet,
        },

        mounted () {
            this.getAddresses();
        },

        data () {
            return {
                addresses: [],
                activeAddress: null,
                confirmShow: false,
                menuConfirmDelete: {
                    'title.noop': '确定要删除么?<br/><span style="color:#666;font-size:12px;">删除后将不可恢复</span>',
                    delete: '<span style="color:red">删除</span>'
                },
            }
        },

        methods: {
            getAddresses () {
                this.axios.get('address').then(response => {
                    this.$set('addresses', response.data.addresses);
                }, response => {
                    console.log(response.data);
                });
            },

            // 地址项中删除按钮点击
            deleteClick (address) {
                this.activeAddress = address;

                this.confirmShow = true;
            },

            deleteAddress(address) {
                this.axios.delete(`address/${address.id}/delete`).then(response => {
                    this.$root.success('删除成功');

                    this.addresses.$remove(address);
                }, response => {
                    console.log(response.data);
                });
            },

            destroy () {
                console.log('adress destroy');
            }
        },

        beforeDestroy () {
            this.destroy();
        }
    }
</script>

<style scoped lang="scss">
    #address-list {
        display: block;
        overflow: hidden;
        margin: 0 0 60px 0;
        padding: 0;

        li {
            display: block;
            overflow: hidden;
            background-color: #fff;
            margin-bottom: 10px;
            padding: 10px 15px;

            .header {
                display: block;
                font-size: 15px;
                color: #444;

                .name {
                    width: 100px;
                    float: left;
                }

                .mobile {
                    float: left;
                }
            }

            .body {
                clear: both;
                display: block;
                font-size: 14px;
                color: #777;
                padding: 5px 0;
            }

            .footer {
                display: block;
                overflow: hidden;
                border-top: 1px solid #ececec;
                font-size: 14px;
                color: #666;
                padding-top: 3px;

                .icon {
                    margin: 0 .5rem;
                }

                .edit {
                    display: inline-block;
                    float: right;
                    color: #555;
                }

                .delete {
                    display: inline-block;
                    float: right;
                    color: #555;
                }
            }
        }
    }

    .empty {
        display: block;
        text-align: center;
        margin: 30px auto;

        .icon {
            font-size: 5rem;
            color: #3695e9;
        }

        .tips {
            font-size: .8rem;
            color: #666;
        }
    }

    footer {
        display: block;
        overflow: hidden;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 1000;
        background-color: #fff;
        padding: 10px 0;
        border-top: 1px solid #ccc;

        button {
            display: block;
            width: 80%;
            margin: 0 auto;
        }
    }
</style>

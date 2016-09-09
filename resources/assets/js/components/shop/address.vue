<template>
    <ul id="address-list">
        <li v-for="address in addresses">
            <div class="header">
                <span class="name">{{ address.name }}</span>
                <span class="mobile">{{ address.mobile }}</span>
            </div>
            <div class="body">
                <div class="address">{{ address.province + address.city + address.area + address.address }}</div>
            </div>
            <div class="footer">
                <span class="edit">编辑</span>
                <span class="delete">删除</span>
            </div>
        </li>
    </ul>

    <footer>
        <x-button type="primary" v-link="{ path: '/address/add' }">添加地址</x-button>
    </footer>
</template>

<script>
    import { XButton } from 'vux';

    export default {
        components: {
            XButton
        },

        ready: function () {
            this.getAddresses();
        },

        data: function () {
            return {
                addresses: []
            }
        },

        methods: {
            getAddresses: function () {
                this.$http.get('address').then(response => {
                    this.$set('addresses', response.body);
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
    #address-list {
        display: block;
        overflow: hidden;
        margin: 0;
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
            }
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
        padding: 15px 0;

        button {
            display: block;
            width: 80%;
            margin: 0 auto;
        }
    }
</style>

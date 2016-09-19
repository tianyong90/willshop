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
                <a class="edit" v-link="{path: '/address/' + address.id}">编辑</a>
                <span class="delete">删除</span>
            </div>
        </li>
    </ul>
    <div class="empty" v-else>
        <i class="icon iconfont">&#xe617;</i>
        <div class="tips">您还没有设置地址</div>
    </div>

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

        ready () {
            this.getAddresses();
        },

        data () {
            return {
                addresses: [],
            }
        },

        methods: {
            getAddresses () {
                this.$http.get('address').then(response => {
                    this.$set('addresses', response.body.addresses);
                }, response => {
                    console.log(response.body);
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

<style scoped lang="sass">
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

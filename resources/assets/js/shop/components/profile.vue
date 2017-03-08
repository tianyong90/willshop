<template>
    <group>
        <cell title="头像" v-link="{ path:'/avatar' }">
            <img class="avatar" :src="user.avatar ? user.avatar : '/img/avatar.jpg'" alt="">
        </cell>
        <cell title="用户名" value="admin"></cell>
    </group>

    <group title="账号安全">
        <cell title="登录密码" is-link v-link="{path:'/password'}"></cell>
    </group>
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
                    this.$set('user', response.data.user);
                }, response => {
                    console.log(response.data);
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .avatar {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }
</style>

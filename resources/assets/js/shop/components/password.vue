<template>
    <group>
        <x-input type="password" :value.sync="oldPassword" placeholder="原密码"></x-input>
        <x-input type="password" :value.sync="password" placeholder="新密码"></x-input>
        <x-input type="password" :value.sync="password_confirmation" placeholder="确认新密码"></x-input>
        <x-button id="submit-btn" type="primary" @click="submit" :disabled="!canSubmit">确定</x-button>
    </group>
</template>

<script>
    import { Group,XInput,XButton } from 'vux';

    export default {
        components: {
            Group,
            XInput,
            XButton
        },

        data () {
            return {
                oldPassword: '',
                password: '',
                password_confirmation: ''
            }
        },

        computed: {
            canSubmit: function () {
                let reg = /.{6,20}/;

                if (!this.oldPassword.match(reg)) {
                    return false;
                }

                if (!this.password.match(reg)) {
                    return false;
                }

                if (!this.password_confirmation.match(reg)) {
                    return false;
                }

                if (this.password_confirmation !== this.password) {
                    return false;
                }

                return true;
            }
        },

        methods: {
            submit () {
                this.axios.post('update-password', this.$data).then(response => {
                    this.$root.success(response.data.info);

                    setTimeout(() => {
                        this.$route.router.go({ path:'/user' });
                    }, 1000);
                }, response => {
                    this.$root.error(response.data[0]);
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    #submit-btn {
        width: 90%;
        margin: 20px auto;
    }
</style>

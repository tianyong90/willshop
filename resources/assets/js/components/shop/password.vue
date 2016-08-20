<template>
    <group>
        <x-input :value.sync="oldPassword" placeholder="原密码"></x-input>
        <x-input :value.sync="password" placeholder="新密码"></x-input>
        <x-input :value.sync="rePassword" placeholder="确认新密码"></x-input>
        <x-button id="submit-btn" type="primary" @click="submit">确定</x-button>
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
        ready: function () {
        },

        data: function () {
            return {
                oldPassword: '',
                password: '',
                rePassword: ''
            }
        },

        methods: {
            submit: function () {
                var formData = JSON.parse(JSON.stringify(this.$data));

                this.$http.get('update-password', formData).then(response => {
                    console.log(response.json());
                });
            }
        }
    }
</script>

<style scoped lang="sass">
    #submit-btn {
        width: 90%;
        margin: 20px auto;
    }
</style>

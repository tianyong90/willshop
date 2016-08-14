<template>
    <h1 @click="click" class="my-title">Hello world</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, sapiente?</p>
</template>

<script>
    export default {
        ready() {
            console.log('Component ready.')
        },
        methods: {
            click: function () {
                console.log('hit');
            }
        }
    }
</script>

<style>
.my-title {
    color:  red;
}
</style>


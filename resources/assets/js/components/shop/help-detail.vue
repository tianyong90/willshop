<template>
    <h1 class="title">{{ post.title }}</h1>

    <div class="content">{{ post.content }}</div>
</template>

<script>
    export default {
        ready: function () {
            this.getPost();
        },

        data: function () {
            return {
                post: {}
            }
        },

        methods: {
            getPost: function () {
                this.$http.get('post/' + this.$route.params.id).then(response => {
                    this.$set('post', response.body);
                });
            }
        }
    }
</script>

<style scoped lang="sass">
    .title {
        display: block;
        text-align: center;
        font-size: 17px;
        margin: 20px 0;
    }

    .content {
        display: block;
        padding: 10px;
        margin-bottom: 60px;
        text-align: justify;
    }
</style>

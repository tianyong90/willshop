<template>
    <group title="常见问题" id="post-list">
        <cell v-for="post in posts" :title="post.title" v-link="{path: '/help/' + post.id }" is-link></cell>
    </group>
</template>

<script>
    import { Group, Cell } from 'vux';
    export default {
        components: {
            Group,
            Cell
        },

        ready: function () {
            this.getPosts();
        },

        data: function () {
            return {
                posts: []
            }
        },

        methods: {
            getPosts: function () {
                this.$http.get('post').then(response => {
                    this.$set('posts', response.body);
                });
            }
        }
    }
</script>

<style lang="sass">
    #post-list {
        margin-bottom: 60px;
    }
</style>

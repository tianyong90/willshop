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

        mounted () {
            this.getPosts();
        },

        data () {
            return {
                posts: []
            }
        },

        methods: {
            getPosts () {
                this.axios.get('post').then(response => {
                    this.$set('posts', response.data.posts);
                });
            }
        }
    }
</script>

<style lang="scss">
    #post-list {
        margin-bottom: 60px;
    }
</style>

<template>
  <wv-group title="常见问题" id="post-list">
    <wv-cell v-for="post in posts" :key="post" :title="post.title" :to="'/help/' + post.id" is-link></wv-cell>
  </wv-group>
</template>

<script>
  export default {
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
          this.posts = response.data.posts;
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

<template>
  <wv-group
    title="常见问题"
    class="post-list">
    <wv-cell
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
      :to="'/help/' + post.id"
      is-link/>
  </wv-group>
</template>

<script>
import { Group, Cell } from 'we-vue'

export default {
  components: {
    [Group.name]: Group,
    [Cell.name]: Cell
  },

  mounted () {
    this.getPosts()
  },

  data () {
    return {
      posts: []
    }
  },

  methods: {
    getPosts () {
      this.axios.get('post').then(response => {
        this.posts = response.data.posts
      })
    }
  }
}
</script>

<style lang="scss">
.post-list {
  margin-bottom: 60px;
}
</style>

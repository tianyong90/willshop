<template>
  <w-group title="常见问题" class="post-list">
    <w-cell
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
      :to="'/help/' + post.id"
      is-link
    />
  </w-group>
</template>

<script>
import { WGroup, WCell } from 'we-vue/lib'

export default {
  components: {
    [WGroup.name]: WGroup,
    [WCell.name]: WCell,
  },

  mounted () {
    this.getPosts()
  },

  data () {
    return {
      posts: [],
    }
  },

  methods: {
    getPosts () {
      this.axios.get('post').then(response => {
        this.posts = response.data.posts
      })
    },
  },
}
</script>

<style lang="scss">
.post-list {
  margin-bottom: 60px;
}
</style>

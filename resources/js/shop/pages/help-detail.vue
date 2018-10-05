<template>
  <div>
    <h1 class="title">{{ post.title }}</h1>

    <div class="content">{{ post.content }}</div>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.getPost()
    },

    data () {
      return {
        post: {}
      }
    },

    methods: {
      getPost () {
        this.axios.get('post/' + this.$route.params.id).then((response) => {
          this.post = response.data.post
        })
      }
    }
  }
</script>

<style scoped lang="scss">
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

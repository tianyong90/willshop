<template>
    <div class="content">
        <h1 class="title">WillShop</h1>

        <p>这是一款基于 Laravel5.3 + vue.js1.0.26 的网店系统。是本人初学 vue.js 的练手项目，设计比较粗陋。现学现用之中，让我学到了不少新的东西，这无疑是一个不错的尝试。</p>

        <p>本项目遵守 MIT 开源协议，因此你可以最大限度的将它用于各种用途。</p>
        <p>如果你喜欢这个项目，不妨为它送上一星。同时也欢迎反馈问题、提出建议或者直接贡献代码。</p>
    </div>
    
</template>

<script>
    export default {
        ready: function () {
            
        },

        data: function () {
            return {
               
            }
        },

        methods: {
            
        }
    }
</script>

<style scoped lang="sass">
    .content {
        display: block;
        padding: 20px;

        .title {
            text-align: center;
            color: #555;
            font-size: 18px;
            margin-bottom: 20px;
        }

        p {
            font-size: 14px;
            color: #555;
            text-indent: 2em;
            text-align: justify;
        }
    }
</style>

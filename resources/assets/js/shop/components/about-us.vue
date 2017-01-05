<template>
    <div class="content">
        <h1 class="title">WillShop</h1>
        <p>这是一款基于 Laravel5.3 + vue.js1.0.26 的网店系统。是本人初学 vue.js 的练手项目，设计比较粗陋。现学现用之中，让我学到了不少新的东西，这无疑是一个不错的尝试。虽然算不上最佳实践，但也能起到一定的示范作用，所以将它分享出来。</p>
        <p>本项目遵守 MIT 开源协议，因此你可以最大限度的将它用于各种用途。</p>
        <p>如果你喜欢这个项目，不妨为它送上一星。同时也欢迎反馈问题、提出建议或者直接贡献代码。</p>
        <iframe id="github-star" src="https://ghbtns.com/github-btn.html?user=tianyong90&repo=willshop&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
    </div>
</template>

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

        #github-star {
            display: block;
            margin-top: 30px;
        }
    }
</style>

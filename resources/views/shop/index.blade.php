<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>willshop</title>
    <!-- Set render engine for 360 browser -->
    <meta name="renderer" content="webkit">

    <!-- No Baidu Siteapp-->
    <meta http-equiv="Cache-Control" content="no-siteapp"/>

    <link rel="stylesheet" href="/css/normalize.css" />
    <link rel="stylesheet" href="/css/vux.css" />
    <link rel="stylesheet" href="/css/app.css" />

    <script>
        window.Laravel = {
            csrfToken: "{!! csrf_token() !!}"
        };
    </script>
</head>
<body>
    <router-view></router-view>

    <div id="tabbar">
      <tabbar>
        <tabbar-item>
          <img slot="icon" src="../assets/demo/icon_nav_button.png">
          <span slot="label">Wechat</span>
        </tabbar-item>
        <tabbar-item show-dot>
          <img slot="icon" src="../assets/demo/icon_nav_msg.png">
          <span slot="label">Message</span>
        </tabbar-item>
        <tabbar-item selected>
          <img slot="icon" src="../assets/demo/icon_nav_article.png">
          <span slot="label">Explore</span>
        </tabbar-item>
        <tabbar-item>
          <i class="fa fa-home"></i>
          <span slot="label">News</span>
        </tabbar-item>
      </tabbar>
    </div>

    <script src="/js/shop.js"></script>
</body>
</html>
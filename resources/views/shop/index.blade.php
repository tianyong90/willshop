<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0">
    <meta name="format-detection" content="telephone=no" />
    <title>willshop</title>
    <!-- Set render engine for 360 browser -->
    <meta name="renderer" content="webkit">

    <!-- No Baidu Siteapp-->
    <meta http-equiv="Cache-Control" content="no-siteapp"/>

    <link rel="stylesheet" href="/css/iconfont/iconfont.css" />
    <link rel="stylesheet" href="/css/vux.css" />
    <link rel="stylesheet" href="/css/shop.css" />

    <script>
        window.Laravel = {
            csrfToken: "{!! csrf_token() !!}"
        };
    </script>
</head>
<body>
    <router-view></router-view>

    <mainmenu v-if="mainMenuvisiable"></mainmenu>
    <script src="/js/shop.js"></script>
</body>
</html>
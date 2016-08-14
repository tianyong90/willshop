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

    <link rel="stylesheet" href="/css/mint-ui.css" />
    <link rel="stylesheet" href="/css/app.css" />

    <style>
        .swipe {
            height: 180px;
        }
        .swipe img {
            display: block;
            width: 100%;
            height: auto;
        }
    </style>

    <script>
        window.Laravel = {
            csrfToken: "{!! csrf_token() !!}"
        };
    </script>
</head>
<body>
    <router-view></router-view>

    <mt-tabbar :selected.sync="selected">
      <mt-tab-item id="首页">
        <a v-link="{path: '/'}"><i slot="icon" class="fa fa-home"></i>
            首页</a>
      </mt-tab-item>
      <mt-tab-item id="订单">
        <a v-link="{path: '/hello'}"><i slot="icon" class="fa fa-home"></i>
            订单</a>
      </mt-tab-item>
      <mt-tab-item id="发现">
        <a v-link="{path: '/test'}"><i slot="icon" class="fa fa-home"></i>
            发现</a>
      </mt-tab-item>
      <mt-tab-item id="我的">
        <a v-link="{path: '/hello'}"><i slot="icon" class="fa fa-home"></i>
            我的</a>
      </mt-tab-item>
    </mt-tabbar>

    <script src="{{ asset('js/shop.js') }}"></script>
</body>
</html>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="">
  <meta name="keywords" content="willchat">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0">
  <meta name="format-detection" content="telephone=no"/>
  <title></title>
  <!-- Set render engine for 360 browser -->
  <meta name="renderer" content="webkit">

  <!-- No Baidu Siteapp-->
  <meta http-equiv="Cache-Control" content="no-siteapp"/>

  <link rel="stylesheet" href="{{ mix('css/admin.css') }}"/>

  {{--<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>--}}
  {{--<script src="http://willshop.test:6001/socket.io/socket.io.js"></script>--}}
  {{--<script src="https://cdn.bootcss.com/socket.io/2.0.3/socket.io.js"></script>--}}
  <script>
    window.Laravel = {
      csrfToken: '{!! csrf_token() !!}'
    };
  </script>
</head>
<body>
<div id="app">
  <el-container>
    <el-header>
      <router-view name="header"></router-view>
    </el-header>

    <el-container>
      <el-aside width="200px" class="admin-sidebar">
        <router-view name="sidebar"></router-view>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>

<script src="{{ mix('js/manifest.js') }}"></script>
<script src="{{ mix('js/vendor.js') }}"></script>
<script src="{{ mix('js/admin.js') }}"></script>
</body>
</html>

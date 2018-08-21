<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0">
    <meta name="format-detection" content="telephone=no"/>
    <title>willshop</title>
    <!-- Set render engine for 360 browser -->
    <meta name="renderer" content="webkit">

    <!-- No Baidu Siteapp-->
    <meta http-equiv="Cache-Control" content="no-siteapp"/>

    <link rel="stylesheet" href="{{ mix('css/shop.css') }}"/>
  </head>
  <body>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
    <mainmenu/>
  </div>

  {{--只有在不使用 hmr 的时候使用代码分割--}}
  @if(!mixIsUsingHmr())
  <script src="{{ mix('js/manifest.js') }}"></script>
  <script src="{{ mix('js/vendor.js') }}"></script>
  @endif
  <script src="{{ mix('js/shop.js') }}"></script>
  </body>
</html>

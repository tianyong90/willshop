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

    {{-- <link rel="stylesheet" href="/css/vux.css" /> --}}
    <link rel="stylesheet" href="/css/mint-ui.css" />
    <link rel="stylesheet" href="/css/app.css" />

    <style>
        .swipe {
            height: 150px;
        }
        .swipe img {
            display: block;
            width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="category in categories">
        <img :src="category.thumbnail" alt="" />
      </mt-swipe-item>
    </mt-swipe>

{{--     <ul>
        <li v-for="category in categories">
            <a href="javascript:;">
                <img v-bind:src="category.thumbnail" alt="" />
                <span>@{{ category.name }}</span>
            </a>
        </li>
    </ul> --}}

    <mt-tabbar :selected.sync="selected">
      <mt-tab-item id="首页">
        <i slot="icon" class="fa fa-home"></i>
        首页
      </mt-tab-item>
      <mt-tab-item id="订单">
        <i slot="icon" class="fa fa-home"></i>
        订单
      </mt-tab-item>
      <mt-tab-item id="发现">
        <i slot="icon" class="fa fa-home"></i>
        发现
      </mt-tab-item>
      <mt-tab-item id="我的">
        <i slot="icon" class="fa fa-home"></i>
        我的
      </mt-tab-item>
    </mt-tabbar>

    <script src="{{ asset('js/app.js') }}"></script>

    <script>
        window.Laravel = {
            csrfToken: "{!! csrf_token() !!}"
        };


        var vm = new Vue({
            el: "body",
            data: {
                products: [],
                categories: []
            },
            ready () {
                this.fetchProducts();
                this.fetchCategories();
            },
            methods: {
                fetchProducts: function () {
                    this.$http.get('/api/product').then(function (response) {
                        this.$set('products', response.json());
                    });
                },

                fetchCategories: function () {
                    this.$http.get('/api/product-category').then(function (response) {
                        this.$set('categories', response.json());
                    });
                }
            }
        });
    </script>
</body>
</html>
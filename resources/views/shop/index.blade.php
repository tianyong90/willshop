<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>willshop</title>
    {{-- <link rel="stylesheet" href="/css/vux.css" /> --}}
    <link rel="stylesheet" href="/css/mint-ui.css" />
    <link rel="stylesheet" href="/css/app.css" />
</head>
<body>
   {{--  <group title="group">
        <cell v-for="product in products" :title="product.name" :value="product.description" track-by="$index"></cell>
    </group> --}}

    {{-- <mt-button type="default">default</mt-button> --}}
    <mt-button type="primary">primary</mt-button>
    <mt-button type="danger">danger</mt-button>

    <mt-cell title="标题文字"></mt-cell>
    <mt-cell title="标题文字" value="说明文字"></mt-cell>

    <ul>
        <li v-for="category in categories">
            <a href="javascript:;">
                <img v-bind:src="category.thumbnail" alt="" />
                <span>@{{ category.name }}</span>
            </a>
        </li>
    </ul>


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
                    // this.$http.get('/api/product').then(function (response) {
                    //     this.$set('products', response.json());
                    // });
                },

                fetchCategories: function () {
                    // this.$http.get('/api/product-category').then(function (response) {
                    //     this.$set('categories', response.json());
                    // });
                }
            }
        });
    </script>
</body>
</html>
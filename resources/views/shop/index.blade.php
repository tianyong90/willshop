<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>willshap</title>
    <link rel="stylesheet" href="/css/vux.css" />
    <link rel="stylesheet" href="/css/app.css" />
</head>
<body>
    <h1>helo world</h1>

   {{--  <group title="group">
        <cell v-for="product in products" :title="product.name" :value="product.description" track-by="$index"></cell>
    </group> --}}

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
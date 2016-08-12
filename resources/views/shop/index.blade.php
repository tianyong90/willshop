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

    <group title="group">
        <cell v-for="product in products" :title="product.name" :value="product.description" track-by="$index"></cell>
    </group>

    <pre>@{{ products | json }}</pre>

    <script src="{{ asset('js/app.js') }}"></script>

    <script>
        window.Laravel = {
            csrfToken: "{!! csrf_token() !!}"
        };

        var vm = new Vue({
            el: "body",
            data: {
                products: []
            },
            ready () {
                this.fetchProduct();
            },
            methods: {
                fetchProduct: function () {
                    this.$http.get('/api/product').then(function (response) {
                        this.$set('products', response.json());
                    });
                }
            }
        });
    </script>
</body>
</html>
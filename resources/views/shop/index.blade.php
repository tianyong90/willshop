<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>willshap</title>
    <link rel="stylesheet" href="/css/vux.css" />
</head>
<body>
    <h1>helo world</h1>

    <group title="group">
        <cell v-for="product in products" :title="product.name" :value="product.description"></cell>
    </group>

    <script src="{{ asset('js/app.js') }}"></script>

    <script>
        window.Laravel = {};
        Laravel.csrfToken = "{!! csrf_token() !!}";

        var vm = new Vue({
            el: "body",
            data: {
                products: []
            },
            ready () {
                this.fetchData();
            },
            methods: {
                fetchData: function () {
                    this.$http.get('/api/product').then(function (response) {
                        // this.$set('products', response.data);
                        console.log(response.data);
                    });
                }
            }
        });
    </script>
</body>
</html>
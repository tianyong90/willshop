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
        <cell v-for="cate in cates" :title="cate.title" :value="cate.value"></cell>
    </group>

    <x-button type="primary" @click="click">test</x-button>
    <x-button type="warn">test</x-button>

    <script src="{{ asset('js/app.js') }}"></script>

    <script>
        var vm = new Vue({
            el: "body",
            data: {
                cates: [
                    {
                        title: 'abc',
                        value: 'fuck'
                    },
                    {
                        title: 'name',
                        value: 'you'
                    }
                ]
            },
            methods: {
                click: function () {
                    alert("fuck");
                }
            }
        });


    </script>
</body>
</html>
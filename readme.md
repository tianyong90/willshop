# WillShop

[![Greenkeeper badge](https://badges.greenkeeper.io/tianyong90/willshop.svg)](https://greenkeeper.io/)

这是一款基于 Laravel5.3 + vue.js1.0.26 的网店系统，也是本人初学 vue.js 的练手项目，设计比较粗陋。现学现用之中，让我学到了不少新的东西，这无疑是一个不错的尝试。虽然算不上最佳实践，但也能起到一定的示范作用，所以将它分享出来。

## 环境要求

- Nginx 或 Apache

- PHP5.6.4 或更新版本，建议 PHP7.x

- Composer

- MySQL5.7 及以上或对应的 MariaDB，数据库引擎使用 InnoDB

- Node.js (num, gulp, bower等为必备)

## 安装

1. 克隆代码到自己想要的安装目录

2. 配置 Apache 或 Nginx 虚拟主机

3. 安装 composer 依赖包

    ```shell
    composer install -vvv
    ```

4. 复制根目录下 .env.example 文件为 .env

5. 生成 APP_KEY

    ```shell
    php artisan key:generate
    ```

6. 创建数据库（请将数据库字符集设置为 utf8mb4 以便存储可能出现的 emoji 表情），然后在 .env 文件中配置数据库、邮件等相关参数

7. 生成数据表

    ```shell
    php artisan migrate --seed
    ```
> 如果不需要填充测试数据，则后面的 --seed 选项可省略

## 使用

访问 http://域名/shop 进入项目首页。

> 目前仅针对移动端开发了页面，所以请使用手机访问或者使用 Chrome 浏览器调试工具模拟手机访问。

## 二次开发

本项目使用 Laravel5.3 配套的 Elixir 整合前端资源，因此需要有一个可用的 node.js 环境，包括 npm、gulp 等。

1. 使用 npm 安装相关前端依赖

    ```shell
    npm install
    ```

2. 运行 gulp watch 命令，将启动 browserSync 并监听文章变化

    ```shell
    gulp watch
    ```

3. 尽情编写代码，实现各种牛逼的功能……

## 贡献代码

欢迎反馈 BUG、提出建议或者提交 pull request

**PHP 代码请务必遵守 PSR 规范。前端代码请使用 eslint 进行规范检查**

## License

MIT
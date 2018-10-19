const routes = [
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: 'js/shop-home' */ '../pages/home.vue'),
    name: 'home',
    meta: {
      auth: false,
      title: '首页'
    }
  },
  {
    path: '/cart',
    component: () =>
      import(/* webpackChunkName: 'js/shop-cart' */ '../pages/cart.vue'),
    name: 'cart',
    meta: {
      auth: true
    }
  },
  {
    path: '/category',
    component: () =>
      import(/* webpackChunkName: 'js/shop-category' */ '../pages/category.vue'),
    name: 'category'
  },
  {
    path: '/order-list',
    component: () =>
      import(/* webpackChunkName: 'js/shop-order' */ '../pages/order-list.vue'),
    name: 'order-list',
    meta: {
      hideMainmenu: true,
      auth: true
    }
  },
  {
    path: '/order/:orderNumber',
    component: () =>
      import(/* webpackChunkName: 'js/shop-order' */ '../pages/order.vue'),
    name: 'order',
    meta: {
      hideMainmenu: true,
      auth: true
    }
  },
  {
    path: '/favourite',
    component: () =>
      import(/* webpackChunkName: 'js/shop-favourite' */ '../pages/favourite.vue'),
    name: 'favourite',
    meta: {
      auth: true
    }
  },
  {
    path: '/checkout',
    component: () =>
      import(/* webpackChunkName: 'js/shop-checkout' */ '../pages/checkout.vue'),
    name: 'checkout',
    meta: {
      hideMainmenu: true,
      auth: true
    }
  },
  {
    path: '/payment/:order_no',
    component: () =>
      import(/* webpackChunkName: 'js/shop-payment' */ '../pages/payment.vue'),
    name: 'payment',
    meta: {
      hideMainmenu: true,
      auth: true
    }
  },
  {
    path: '/user',
    component: () =>
      import(/* webpackChunkName: 'js/shop-user' */ '../pages/user.vue'),
    name: 'user',
    meta: {
      auth: true
    }
  },
  {
    path: '/address',
    component: () =>
      import(/* webpackChunkName: 'js/shop-address' */ '../pages/address.vue'),
    name: 'address',
    meta: {
      auth: true,
      hideMainmenu: true
    }
  },
  {
    path: '/address/add',
    component: () =>
      import(/* webpackChunkName: 'js/shop-address' */ '../pages/address-edit.vue'),
    meta: {
      auth: true,
      hideMainmenu: true
    }
  },
  {
    path: '/address/:id/edit',
    component: () =>
      import(/* webpackChunkName: 'js/shop-address' */ '../pages/address-edit.vue'),
    meta: {
      auth: true,
      hideMainmenu: true
    }
  },
  {
    path: '/about-us',
    component: () =>
      import(/* webpackChunkName: 'js/shop-about' */ '../pages/about-us.vue'),
    meta: {
      hideMainmenu: true
    }
  },
  {
    path: '/help',
    component: () =>
      import(/* webpackChunkName: 'js/shop-help' */ '../pages/help.vue')
  },
  {
    path: '/help/:id',
    component: () =>
      import(/* webpackChunkName: 'js/shop-help' */ '../pages/help.vue')
  },
  {
    path: '/product/:id',
    component: () =>
      import(/* webpackChunkName: 'js/shop-product' */ '../pages/product.vue'),
    name: 'product',
    meta: {
      hideMainmenu: true
    }
  }
]

export default routes

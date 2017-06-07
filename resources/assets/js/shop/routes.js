const routes = [
  {
    path: '/',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/home.vue')), 'shop-home');
    },
    name: 'home',
    meta: {
      auth: false,
      title: '首页'
    }
  },
  {
    path: '/cart',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/cart.vue')), 'shop-home');
    },
    name: 'cart',
    meta: {
      auth: true,
      hideMainmenu: true
    }
  },
  {
    path: '/category',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/category.vue')), 'shop-home');
    },
    name: 'category',
  },
  {
    path: '/order-list',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/order-list.vue')), 'shop-home');
    },
    name: 'order-list',
    meta: {
      auth: true
    }
  },
  {
    path: '/order/:id',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/order.vue')), 'shop-home');
    },
    name: 'order',
    meta: {
      auth: true
    }
  },
  {
    path: '/favourite',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/favourite.vue')), 'shop-home');
    },
    name: 'favourite',
    meta: {
      auth: true
    }
  },
  {
    path: '/checkout',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/checkout.vue')), 'shop-home');
    },
    name: 'checkout',
    meta: {
      auth: true
    }
  },
  {
    path: '/user',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/user.vue')), 'shop-home');
    },
    name: 'user',
    meta: {
      auth: true
    }
  },
  {
    path: '/profile',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/profile.vue')), 'shop-home');
    },
    name: 'profile',
    meta: {
      auth: true
    }
  },
  {
    path: '/avatar',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/avatar.vue')), 'shop-home');
    },
    name: 'avatar',
    meta: {
      auth: true,
      hideMainmenu: true
    }
  },
  {
    path: '/address',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/address.vue')), 'shop-home');
    },
    name: 'address',
    meta: {
      auth: true,
      hideMainmenu: true
    }
  },
  {
    path: '/address/add',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/address-edit.vue')), 'shop-home');
    },
    meta: {
      auth: true,
      hideMainmenu: true
    }
  },
  {
    path: '/address/:id',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/address-edit.vue')), 'shop-home');
    },
    meta: {
      auth: true,
      hideMainmenu: true
    }
  },
  {
    path: '/about-us',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/about-us.vue')), 'shop-home');
    }
  },
  {
    path: '/help',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/help.vue')), 'shop-home');
    }
  },
  {
    path: '/help/:id',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/help-detail.vue')), 'shop-home');
    }
  },
  {
    path: '/login',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/login.vue')), 'shop-home');
    },
    meta: {
      hideMainmenu: true
    }
  },
  {
    path: '/register',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/register.vue')), 'shop-home');
    },
    name: 'register',
    meta: {
      hideMainmenu: true
    }
  },
  {
    path: '/product/:id',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/product.vue')), 'shop-home');
    },
    name: 'product',
    meta: {
      hideMainmenu: true
    }
  },
  {
    path: '/password',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/password.vue')), 'shop-home');
    },
    name: 'password',
    meta: {
      auth: true
    }
  }
];

export default routes;

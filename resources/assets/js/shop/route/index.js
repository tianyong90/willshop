router.map({
  '/': {
    component: require('./components/shop/home.vue')
  },
  '/cart': {
    component: require('./components/shop/cart.vue'),
    auth: true
  },
  '/category': {
    component: require('./components/shop/category.vue')
  },
  '/order-list': {
    component: require('./components/shop/order-list.vue'),
    auth: true
  },
  '/order/:id': {
    component: require('./components/shop/order.vue'),
    auth: true
  },
  '/favourite': {
    component: require('./components/shop/favourite.vue'),
    auth: true
  },
  '/checkout': {
    component: require('./components/shop/checkout.vue'),
    auth: true
  },
  '/user': {
    component: require('./components/shop/user.vue'),
    auth: true
  },
  '/profile': {
    component: require('./components/shop/profile.vue'),
    auth: true
  },
  '/avatar': {
    component: require('./components/shop/avatar.vue'),
    auth: true,
    hideMainmenu: true
  },
  '/address': {
    component: require('./components/shop/address.vue'),
    auth: true
  },
  '/address/add': {
    component: require('./components/shop/address-edit.vue'),
    auth: true,
    hideMainmenu: true
  },
  '/address/:id': {
    component: require('./components/shop/address-edit.vue'),
    auth: true,
    hideMainmenu: true
  },
  '/about-us': {
    component: require('./components/shop/about-us.vue')
  },
  '/help': {
    component: require('./components/shop/help.vue')
  },
  '/help/:id': {
    component: require('./components/shop/help-detail.vue')
  },
  '/login': {
    component: require('./components/shop/login.vue'),
    hideMainmenu: true
  },
  '/register': {
    component: require('./components/shop/register.vue'),
    hideMainmenu: true
  },
  '/product/:id': {
    component: require('./components/shop/product.vue'),
    hideMainmenu: true
  },
  '/password': {
    component: require('./components/shop/password.vue'),
    auth: true
  }
});
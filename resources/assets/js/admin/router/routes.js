const routes = [
  {
    path: '/',
    component: () => import('../pages/dashboard.vue'),
    meta: {
      requiresAuth: false,
      title: '首页',
      topmenuVisible: true,
      sidebarVidible: true
    }
  },
  {
    path: '/order/list',
    component: () => import('../pages/order/lsit.vue'),
    meta: {
      requiresAuth: true,
      title: '',
      topmenuVisible: true,
      sidebarVidible: true
    }
  },
  {
    path: '/product/list',
    component: () => import('../pages/product/lsit.vue'),
    meta: {
      requiresAuth: true,
      title: '',
      topmenuVisible: true,
      sidebarVidible: true
    }
  },
  {
    path: '/product/edit/:id',
    component: () => import('../pages/product/product_form.vue'),
    meta: {
      requiresAuth: true,
      title: '',
      topmenuVisible: true,
      sidebarVidible: true
    }
  },
  {
    path: '/user/list',
    component: () => import('../pages/user/lsit.vue'),
    meta: {
      requiresAuth: true,
      title: '',
      topmenuVisible: true,
      sidebarVidible: true
    }
  },
  {
    path: '/login',
    component: () => import('../pages/auth/login.vue'),
    meta: {
      requiresAuth: false,
      title: '',
      topmenuVisible: false,
      sidebarVidible: false
    }
  },
  {
    path: '*',
    component: () => import('../pages/404.vue'),
    meta: {
      title: '404',
      topmenuVisible: true,
      sidebarVidible: true
    }
  }
]

export default routes

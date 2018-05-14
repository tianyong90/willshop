const Topmenu = () => import(/* webpackChunkName: 'js/admin-topmenu' */ '../components/topmenu.vue')
const Sidebar = () => import(/* webpackChunkName: 'js/admin-sidebar' */ '../components/sidebar.vue')

const routes = [
  {
    path: '/',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-dashboard' */ '../pages/dashboard.vue'),
      topmenu: Topmenu,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: false,
      title: '首页'
    }
  },
  {
    path: '/order/list',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-order-list' */ '../pages/order/lsit.vue'),
      topmenu: Topmenu,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true,
      title: ''
    }
  },
  {
    path: '/product/list',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-product-list' */ '../pages/product/lsit.vue'),
      topmenu: Topmenu,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true,
      title: ''
    }
  },
  {
    path: '/product/edit/:id',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-product-form' */ '../pages/product/product_form.vue'),
      topmenu: Topmenu,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true,
      title: ''
    }
  },
  {
    path: '/user/list',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-user-list' */ '../pages/user/lsit.vue'),
      topmenu: Topmenu,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true,
      title: ''
    }
  },
  {
    path: '/login',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-auth-login' */ '../pages/auth/login.vue')
    },
    meta: {
      requiresAuth: false,
      title: ''
    }
  },
  {
    path: '*',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-error404' */ '../pages/404.vue'),
      topmenu: Topmenu,
      sidebar: Sidebar
    },
    meta: {
      title: '404'
    }
  }
]

export default routes

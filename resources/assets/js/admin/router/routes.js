const Header = () => import(/* webpackChunkName: 'js/admin-header' */ '../components/header.vue')
const Sidebar = () => import(/* webpackChunkName: 'js/admin-sidebar' */ '../components/sidebar.vue')

const routes = [
  {
    path: '/',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-dashboard' */ '../views/dashboard.vue'),
      header: Header,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: false,
      title: '首页'
    }
  },
  {
    path: '/login',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-auth-login' */ '../views/auth/login.vue')
    },
    meta: {
      requiresAuth: false,
      title: ''
    }
  },
  {
    path: '/user',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-user-list' */ '../views/user/list.vue'),
      header: Header,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true,
      title: ''
    }
  },
  {
    path: '/user/:id',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-user-detail' */ '../views/user/detail.vue'),
      header: Header,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true,
      title: ''
    }
  },
  {
    path: '/role',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-role-list' */ '../views/role/list.vue'),
      header: Header,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true,
      title: ''
    }
  },
  {
    path: '/permission',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-permission-list' */ '../views/permission/list.vue'),
      header: Header,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true,
      title: ''
    }
  },
  {
    path: '/order',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-order-list' */ '../views/order/list.vue'),
      header: Header,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true,
      title: ''
    }
  },
  {
    path: '/product',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-product-list' */ '../views/product/list.vue'),
      header: Header,
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
      default: () => import(/* webpackChunkName: 'js/admin-product-form' */ '../views/product/product_form.vue'),
      header: Header,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true,
      title: ''
    }
  },
  {
    path: '/category',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-category-list' */ '../views/category/list.vue'),
      header: Header,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true,
      title: ''
    }
  },
  {
    path: '/brand',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-brand-list' */ '../views/brand/list.vue'),
      header: Header,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true,
      title: ''
    }
  },
  {
    path: '/coupon',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-coupon-list' */ '../views/coupon/list.vue'),
      header: Header,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true,
      title: ''
    }
  },
  {
    path: '*',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-error404' */ '../views/404.vue'),
      header: Header,
      sidebar: Sidebar
    },
    meta: {
      title: '404'
    }
  }
]

export default routes

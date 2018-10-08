const Header = () => import(/* webpackChunkName: 'js/admin-header' */ '../components/header.vue')
const Sidebar = () => import(/* webpackChunkName: 'js/admin-sidebar' */ '../components/sidebar.vue')

const routes = [
  {
    path: '/',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-dashboard' */ '../pages/dashboard.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-auth-login' */ '../pages/auth/login.vue')
    },
    meta: {
      requiresAuth: false,
      title: ''
    }
  },
  {
    path: '/user',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-user-index' */ '../pages/users/index.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-user-show' */ '../pages/users/show.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-role-index' */ '../pages/roles/index.vue'),
      header: Header,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true,
      title: ''
    }
  },
  {
    path: '/role/:roleId',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-role-show' */ '../pages/roles/show.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-permission-index' */ '../pages/permissions/index.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-order-index' */ '../pages/orders/index.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-product-index' */ '../pages/products/index.vue'),
      header: Header,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true,
      title: ''
    }
  },
  {
    path: '/product/:productId',
    components: {
      default: () => import(/* webpackChunkName: 'js/admin-product-show' */ '../pages/products/show.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-category-index' */ '../pages/categories/index.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-brand-index' */ '../pages/brands/index.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-coupon-index' */ '../pages/coupons/index.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-error404' */ '../pages/404.vue'),
      header: Header,
      sidebar: Sidebar
    },
    meta: {
      title: '404'
    }
  }
]

export default routes

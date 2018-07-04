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
      default: () => import(/* webpackChunkName: 'js/admin-user-list' */ '../pages/user/list.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-user-detail' */ '../pages/user/detail.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-role-list' */ '../pages/role/list.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-permission-list' */ '../pages/permission/list.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-order-list' */ '../pages/order/list.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-product-list' */ '../pages/product/list.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-product-form' */ '../pages/product/product_form.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-category-list' */ '../pages/category/list.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-brand-list' */ '../pages/brand/list.vue'),
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
      default: () => import(/* webpackChunkName: 'js/admin-coupon-list' */ '../pages/coupon/list.vue'),
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

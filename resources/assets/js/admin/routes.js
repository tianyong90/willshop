const routes = [
  {
    path: '/',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/dashboard.vue')));
    },
    meta: {
      topmenuVisible: true,
      sidebarVisible: false,
      requiresAuth: false,
      title: '首页'
    }
  },
  {
    path: '/account/add',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/account/form.vue')));
    },
    meta: {
      topmenuVisible: true,
      sidebarVisible: false,
      requiresAuth: true,
      title: '添加公众号'
    }
  },
  {
    path: '/account/edit/:id',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/account/form.vue')));
    },
    meta: {
      topmenuVisible: true,
      sidebarVisible: false,
      requiresAuth: true,
      title: '修改公众号'
    }
  },
  {
    path: '/login',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/auth/login.vue')));
    },
    meta: {
      topmenuVisible: false,
      sidebarVisible: false,
      requiresAuth: false,
      title: '用户登录'
    }
  },
  {
    path: '/avatar',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/user/avatar.vue')));
    },
    meta: {
      topmenuVisible: true,
      sidebarVisible: false,
      requiresAuth: false,
      title: '头像设置'
    }
  },
  {
    path: '*',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/errors/404.vue')));
    },
    meta: {
      title: '404',
      showTopmenu: false
    }
  }
];

export default routes;

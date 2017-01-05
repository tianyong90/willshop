const routes = [
  {
    path: '/',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/home.vue')), 'shop-home')
    },
    meta: {
      requiresAuth: false,
      title: '首页'
    }
  }
]

export default routes

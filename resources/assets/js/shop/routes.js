const routes = [
  {
    path: '/',
    component: (resolve) => {
      require.ensure([], () => resolve(require('./components/home.vue')), 'card-home')
    },
    meta: {
      requiresAuth: false,
      title: '首页'
    }
  }
]

export default routes

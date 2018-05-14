const MenuConfig = [
  {
    title: '控制面板',
    icon: 'iconfont icon-home',
    route: '/'
  },
  {
    title: '商品管理',
    icon: 'iconfont icon-goods',
    subItems: [
      {
        title: '商品列表',
        route: '/product/list'
      },
      {
        title: '商品分类',
        route: '/product/list'
      }
    ]
  },
  {
    title: '订单管理',
    icon: 'iconfont icon-list',
    subItems: [
      {
        title: '订单列表',
        route: '/order/list'
      }
    ]
  },
  {
    title: '用户管理',
    icon: 'iconfont icon-people',
    subItems: [
      {
        title: '用户列表',
        route: '/user/list'
      }
    ]
  }
]

const state = {
  MenuConfig: MenuConfig
}

const getters = {}

const actions = {}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}

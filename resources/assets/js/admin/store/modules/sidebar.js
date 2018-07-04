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
        route: '/product'
      },
      {
        title: '商品分类',
        route: '/category'
      }
    ]
  },
  {
    title: '订单管理',
    icon: 'iconfont icon-list',
    subItems: [
      {
        title: '订单列表',
        route: '/order'
      }
    ]
  },
  {
    title: '用户管理',
    icon: 'iconfont icon-people',
    subItems: [
      {
        title: '用户列表',
        route: '/user'
      },
      {
        title: '统计数据',
        route: '/user/stat'
      }
    ]
  },
  {
    title: '角色及权限',
    icon: 'iconfont icon-people',
    subItems: [
      {
        title: '角色列表',
        route: '/role'
      },
      {
        title: '权限列表',
        route: '/permission'
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

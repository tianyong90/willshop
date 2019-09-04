const MenuConfig = [
  {
    title: '控制面板',
    icon: 'iconfont icon-home',
    route: '/',
  },
  {
    title: '用户管理',
    icon: 'iconfont icon-people',
    subItems: [
      {
        title: '用户列表',
        route: '/user',
      },
      {
        title: '统计数据',
        route: '/user/stat',
      },
    ],
  },
  {
    title: '商品管理',
    icon: 'iconfont icon-goods',
    subItems: [
      {
        title: '商品列表',
        route: '/product',
      },
      {
        title: '商品分类',
        route: '/category',
      },
      {
        title: '品牌列表',
        route: '/brand',
      },
    ],
  },
  {
    title: '订单管理',
    icon: 'iconfont icon-list',
    subItems: [
      {
        title: '订单列表',
        route: '/order',
      },
    ],
  },
  {
    title: '活动与优惠',
    icon: 'iconfont icon-goods',
    subItems: [
      {
        title: '债券管理',
        route: '/coupon',
      },
    ],
  },
  {
    title: '广告管理',
    icon: 'iconfont icon-goods',
    subItems: [
      {
        title: '广告位列表',
        route: '/coupon',
      },
      {
        title: '广告列表',
        route: '/coupon',
      },
    ],
  },
  {
    title: '角色及权限',
    icon: 'iconfont icon-people',
    subItems: [
      {
        title: '角色列表',
        route: '/role',
      },
      {
        title: '权限列表',
        route: '/permission',
      },
    ],
  },
]

const state = {
  MenuConfig: MenuConfig,
}

const getters = {}

const actions = {}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations,
}

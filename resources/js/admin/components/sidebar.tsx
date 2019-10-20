import React, { Component } from 'react'
import { Icon, Layout, Menu } from 'antd'

const { Sider } = Layout
const { SubMenu } = Menu

const menus = [
  {
    name: '控制面板',
    icon: 'home',
    key: 'home',
  },
  {
    name: '订单管理',
    icon: 'order',
    key: 'order',
    subMenus: [
      {
        name: '列表',
        key: 'list',
      },
    ],
  },
  {
    name: '用户管理',
    icon: 'user',
    key: 'user',
    subMenus: [
      {
        name: '列表',
        key: 'list',
      },
    ],
  },
  {
    name: '商品管理',
    icon: 'goods',
    key: 'goods',
    subMenus: [
      {
        name: '列表',
        key: 'list',
      },
    ],
  },
]

function renderMenuItem (menu) {
  if (menu.subMenus) {
    return (
      <SubMenu
        key={menu.key}
        title={
          <span>
              <Icon type={menu.icon}/>
            {menu.name}
            </span>
        }
      >
        {
          menu.subMenus.map(subMenu => (
            <Menu.Item key={menu.key + subMenu.key}>{subMenu.name}</Menu.Item>
          ))
        }
      </SubMenu>
    )
  } else {
    return (
      <Menu.Item key={menu.key}>
        <span>
          <Icon type={menu.icon}/>
          {menu.name}
        </span>
      </Menu.Item>
    )
  }
}

const Sidebar = () => {
  return (
    <Sider
      theme="dark"
      collapsible
      width={200}
      style={{ background: '#f00' }}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {
          menus.map(menu => (
            renderMenuItem(menu)
          ))
        }
      </Menu>
    </Sider>
  )
}

export default Sidebar

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
  },
  {
    name: '用户管理',
    icon: 'user',
    key: 'user',
  },
  {
    name: '商品管理',
    icon: 'goods',
    key: 'goods',
  },
]

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
            <Menu.Item key={menu.key}>
              <span>
                <Icon type={menu.icon}/>
                {menu.name}
              </span>
            </Menu.Item>
          ))
        }

        <Menu.Item key="home">
          <span>
              <Icon type="home" />
              控制面板
            </span>
        </Menu.Item>

        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="laptop" />
              商品管理
            </span>
          }
        >
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="user" />
              订单管理
            </span>
          }
        >
          <Menu.Item key="5">订单列表</Menu.Item>
          <Menu.Item key="6">abc</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="laptop" />
              用户管理
            </span>
          }
        >
          <Menu.Item key="5">用户列表</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="laptop" />
              评论管理
            </span>
          }
        >
          <Menu.Item key="5">评论列表</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default Sidebar

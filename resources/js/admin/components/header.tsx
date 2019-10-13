import React, { Component } from 'react'
import { Layout, Menu, Avatar } from 'antd'

const { Header } = Layout

export default class Sidebar extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount (): void {
  }

  public render () {
    return (
      <Header className="flex items-center header">
        <div className="inline-flex text-white text-lg font-medium">WILLSHOP</div>
        <Menu
          className="ml-auto mr-1"
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="index">首页</Menu.Item>
          <Menu.Item key="index2">首页</Menu.Item>
          <Menu.Item key="index3">首页</Menu.Item>
        </Menu>

        <Avatar
          className="ml-1"
          icon="user"
        />
      </Header>
    )
  }
}

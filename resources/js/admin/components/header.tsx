import React, { Component } from 'react'
import { Layout, Menu } from 'antd'

const { Header } = Layout

export default class Sidebar extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount (): void {
    console.log('haha')
  }

  public render () {
    return (
      <Header className="flex header">
        <div className="inline-flex text-white text-lg font-medium">logo</div>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="index">首页</Menu.Item>
          <Menu.Item key="index2">首页</Menu.Item>
          <Menu.Item key="index3">首页</Menu.Item>
        </Menu>
      </Header>
    )
  }
}

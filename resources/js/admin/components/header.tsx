import React, { Component, FC } from 'react'
import { Layout, Menu, Avatar } from 'antd'

const { Header } = Layout

const MyHeader: React.FC = () => {
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
      </Menu>

      <Avatar
        className="ml-1"
        style={{ verticalAlign: 'middle', backgroundColor: 'red' }}
      >bontian</Avatar>
    </Header>
  )
}

export default MyHeader

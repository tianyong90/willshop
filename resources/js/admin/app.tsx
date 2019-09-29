import React, { Component } from 'react'
import { Breadcrumb, Layout } from 'antd'
import MyHeader from './components/header'
import Sidebar from './components/sidebar'

const { Content } = Layout

export default class App extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount (): void {
  }

  public render () {
    return (
      <Layout>
        <MyHeader />
        <Layout>
          <Sidebar />
          <Layout>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

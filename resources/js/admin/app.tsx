import React, { Component } from 'react'
import { Breadcrumb, Layout } from 'antd'
import MyHeader from './components/header'
import MySidebar from './components/sidebar'

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
          <MySidebar />
          <Layout>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List asdfs</Breadcrumb.Item>
            </Breadcrumb>

            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

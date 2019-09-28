import React, { Component } from 'react'
import { Button } from 'antd'

import Header from './components/header'
import Sidebar from './components/sidebar'

export default class App extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount (): void {
  }

  public render () {
    const { children } = this.props

    return (
      <>
        <Header />
        <Sidebar />

        { children }
      </>
    )
  }
}

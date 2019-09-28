import React, { Component } from 'react'
import { Button } from 'antd'

export default class Sidebar extends Component {
  constructor (props) {
    super(props)
  }

  onClick (e) {
    console.log(e.type)
  }

  componentDidMount (): void {
  }

  public render () {
    const { children } = this.props

    return (
      <>
        <h1>sidebar</h1>

        {children}
      </>
    )
  }
}

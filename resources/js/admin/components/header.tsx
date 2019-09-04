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
console.log('haha')
}

public render () {
const { children } = this.props

return (
<>
<Button type="primary" onClick={this.onClick}>
  hello
</Button>

{ children }
</>
)
}
}

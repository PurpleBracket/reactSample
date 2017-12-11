import React, { Component } from 'react'

import Styles from './onboarding.step.actionWrapper.styles.scss'

export default class ActionWrapper extends Component {
  constructor (props) {
    super(props)
    this.setActivity = this.setActivity.bind(this)

    this.state = {
    }
  }

  setActivity () {
    if (this.props.active) {
      return ''
    } else {
      return ' passive'
    }
  }

  render () {
    let styleClasses = this.props.className + ' action-wrapper'
    styleClasses += this.setActivity()

    return (
      <div style={Styles.actionWrapper} className={styleClasses}>
        {this.props.children}
      </div>
    )
  }
}

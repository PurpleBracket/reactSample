import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signout } from './signout.action'

class Signout extends Component {
  componentWillMount () {
    console.log('component will mount')
    this.props.signout()

    if (typeof (window) !== 'undefined') { // hack for test
      window.globalState.clearGlobalState()

      this.props.history.push('/')
    }
  }

  render () {
    return (
      <h1>See you soon!</h1>
    )
  }
}

export default connect(null, {signout})(Signout)

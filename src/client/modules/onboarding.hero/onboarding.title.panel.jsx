import React, { Component } from 'react'
import Headline from '../../atoms/headline/headline'
import Subhead from '../../atoms/subhead/subhead'
import Panel from '../../atoms/panel/panel'

export default class OnboardingTitle extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render () {
    return (
      <div className='columns'>
        <div className='column is-three-fifths is-offset-one-fifth'>
          <Panel
            noBorder
            noShadow
            transparentBG
            >
            <Subhead size='6' bold spaced color={'primary'}>WELCOME TO TREASURE</Subhead>
            <Headline size='3' spaced>We need your help to get started.</Headline>
            <Subhead size='5'>After that, our cash management <b>A.I.</b> can do the rest.</Subhead>
          </Panel>
        </div>
      </div>
    )
  }
}

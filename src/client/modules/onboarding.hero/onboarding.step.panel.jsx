import React, { Component } from 'react'
import Headline from '../../atoms/headline/headline'
import Subhead from '../../atoms/subhead/subhead'
import Panel from '../../atoms/panel/panel'
import Button from '../../atoms/button/button'
import ActionWrapper from './onboarding.step.actionWrapper'
import Style from './onboarding.step.panel.styles.scss'

export default class OnboardingStep extends Component {
  constructor (props) {
    super(props)
    this.toggleAction = this.toggleAction.bind(this)

    this.state = {
      actionActive: false
    }
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   if (nextProps === this.props) {
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  toggleAction () {
    return (this.setState({actionActive: !this.state.actionActive}))
  }

  render () {
    let styleClass = 'columns'
    styleClass += this.props.completed ? ' completed step-panel' : ' step-panel'

    return (
      <div style={Style.stepPanel} className={styleClass}>
        <div className='column is-three-fifths is-offset-one-fifth'>
          <Panel
            passive={!this.props.active}
            padding
            noBorder
            transparentBG
          >
            <div className={'columns level'}>
              <div className='column level-left'>
                <Subhead size='6' bold color={'primary'}>{this.props.stepHelpText}</Subhead>
                <Headline size='4'>{this.props.stepTitle}</Headline>
                <Subhead size='6'>{this.props.stepDescription}</Subhead>
              </div>

              {this.state.actionActive
                ? <span className='icon is-medium' onClick={this.toggleAction}>
                  <small>Not Ready Yet?</small> <i className='fa fa-lg fa-times' /></span>
                  : <div className='column is-narrow level-right'>
                    {this.props.buttonComponent
                        ? this.props.buttonComponent
                        : <Button color={'primary'} onClick={this.props.action
                            ? this.props.action
                            : this.toggleAction
                        }>{this.props.callToAction}</Button>
                    }</div>
              }
            </div>
            {this.props.actionComponent
                ? <div className={'columns'} style={{textAlign: 'center'}}>
                  <ActionWrapper className={'column'} active={this.state.actionActive}>
                    <Subhead size='6' centered>{this.props.actionSubhead}</Subhead>
                    {this.props.actionComponent}
                  </ActionWrapper>
                </div>
            : ''}
          </Panel>
        </div>
      </div>
    )
  }
}

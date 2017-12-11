import React, { Component } from 'react'
import OnboardingTitle from './onboarding.title.panel'
import OnboardingStep from './onboarding.step.panel'
import CompanyNew from '../company.forms/company.new.form'
import Plaid from '../../components/plaid/plaid'

export default class OnboardingHero extends Component {
  // constructor (props) {
  //   super(props)
  //
  //   this.state = {
  //     activeAccount: false
  //   }
  // }
  //
  // componentWillReceiveProps (newProps) {
  //   this.setState({activeAccount: newProps.hasCompany})
  // }

  render () {
    return (
      <div>
        <OnboardingTitle />

        {!this.props.hasCompany ? <OnboardingStep
          stepHelpText={'Start here'}
          stepTitle={'Set-up your organization'}
          stepDescription={'Create your compnay profile.'}
          callToAction={'BEGIN SETUP'}
          actionComponent={<CompanyNew onSubmit={this.props.handleOrgSubmit} />}
          actionSubhead={'Please add Business Details'}
          active={!this.props.hasCompany}
        /> : ''}

        {!this.props.hasAccount ? <OnboardingStep
          stepHelpText={'Do this next'}
          stepTitle={'Add an account'}
          stepDescription={'Treasure needs to connect to at least one bank account to work.'}
          callToAction={'CONNECT ACCOUNT'}
          buttonComponent={<Plaid onCreate={this.props.handleAccountCreate} />}
          active={this.props.hasCompany}
        /> : ''}
      </div>
    )
  }
}

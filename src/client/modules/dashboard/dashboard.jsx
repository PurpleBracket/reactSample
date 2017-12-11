import React, { Component } from 'react'
import DashboardOverview from './dashboard.overview'
import OnboardingHero from '../onboarding.hero/onboarding.hero'
import { fetchAccounts } from '../../components/account/account.list/account.list.action'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.handleOrgSubmit = this.handleOrgSubmit.bind(this)
    // this.handleAccountCreate = this.handleAccountCreate.bind(this)
    // this.renderContent = this.renderContent.bind(this)

    this.state = {
      hasCompany: window.globalState.hasCompany(),
      hasAccount: false
    }
  }
  //
  // componentWillMount () {
  //   if (this.state.hasCompany) {
  //     this.props.fetchAccounts(window.globalState.getCompanyId())
  //   }
  // }

  handleOrgSubmit () {
    console.log('Company created - on submit called...')
    this.setState({hasCompany: true})
  }

  handleAccountCreate () {
    console.log('Account created...')
    // this.setState({hasAccount: true})

    this.props.fetchAccounts(window.globalState.getCompanyId())
  }

  // renderContent () {
  //   if (!this.state.hasCompany || (this.props.accounts && this.props.accounts.length === 0)) {
  //     return (<OnboardingHero
  //       hasCompany={this.state.hasCompany}
  //       hasAccount={this.props.accounts.length > 0}
  //       handleOrgSubmit={this.handleOrgSubmit}
  //       handleAccountCreate={this.handleAccountCreate}
  //     />)
  //   } else if (this.props.loading) {
  //     return (<h1>Loading..</h1>)
  //   } else {
  //     return (<DashboardOverview />)
  //   }
  // }

  render () {
    // let Content = this.renderContent()
    if (!this.state.hasCompany || (this.props.accounts && this.props.accounts.length === 0)) {
      return (<OnboardingHero
        hasCompany={this.state.hasCompany}
        hasAccount={this.props.accounts.length > 0}
        handleOrgSubmit={this.handleOrgSubmit}
        handleAccountCreate={this.handleAccountCreate}
      />)
    } else if (this.props.loading) {
      return (<h1>Loading..</h1>)
    } else {
      return (<DashboardOverview />)
    }
  }
}

Dashboard.defaultProps = {
  loading: true,
  accounts: null,
  hasAccount: false
}

export default connect((state) => state.accounts, {fetchAccounts})(withRouter(Dashboard))

import React, { Component } from 'react'
import TopbarDashboard from '../components/topbar/topbar.dashboard'
import Sidebar from '../components/sidebar/sidebar'
import PrivateRoute from '../routes/PrivateRoute'
import AccountList from '../components/account/account.list/account.list'
import AccountDetails from '../components/account/account.details/account.details'
import Dashboard from '../modules/dashboard/dashboard'
import NotFound from '../components/error/notfound'
import { Route, Switch } from 'react-router-dom'
import { fetchAccounts } from '../components/account/account.list/account.list.action'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class AppTemplate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hasCompany: window.globalState.hasCompany(),
      sidebarCollapsed: true
    }

    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  componentWillMount () {
    if (this.state.hasCompany) {
      this.props.fetchAccounts(window.globalState.getCompanyId())
    }
  }

  toggleSidebar () {
    this.setState({sidebarCollapsed: !this.state.sidebarCollapsed})
  }

  // componentWillReceiveProps() {
  //   if(!this.state.hasCompany && this.props.accounts && this.props.accounts.length>0)
  //   {
  //     this.setState({hasCompany: true})
  //   }
  // }

  render () {
    // let hasCompany = window.globalState.hasCompany(),
    //   hasAccount = props.fetchAccounts(window.globalState.getCompanyId())

    // let hasCompany = false
    // let hasAccount = false

    return (
      <div>
        <TopbarDashboard
          hasCompany={this.state.hasCompany || (this.props.accounts && this.props.accounts.length > 0)}
          hasAccount={(this.props.accounts && this.props.accounts.length > 0)}
          collapsed={this.state.sidebarCollapsed}
        />
        <div className={'container nav-padding'} style={this.state.sidebarCollapsed ? {paddingLeft: '50px'} : {paddingLeft: '220px'}}>
          <Sidebar
            hasCompany={this.state.hasCompany || (this.props.accounts && this.props.accounts.length > 0)}
            hasAccount={(this.props.accounts && this.props.accounts.length > 0)}
            collapsed={this.state.sidebarCollapsed}
            toggleSidebar={this.toggleSidebar}
          />
          <Switch>
            <PrivateRoute exact path='/app/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/app/banking/transactions/:accountId' component={AccountDetails} />
            <PrivateRoute exact path='/app/banking' component={AccountList} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    )
  }
}

//
// AppTemplate.defaultProps = {
//   loading: true,
//   accounts: null,
//   hasAccount: false
// }

// export default AppTemplate

export default connect((state) => state.accounts, {fetchAccounts})(withRouter(AppTemplate))

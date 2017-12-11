import React, { Component } from 'react'
import Plaid from '../../plaid/plaid'
import { fetchAccounts } from './account.list.action'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Account from '../account.item/account.item'
import accountTypes from '../../plaid/account.types'
import { FormattedNumber } from 'react-intl'

export class AccountList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hasCompany: window.globalState.hasCompany()
    }
    this.handleViewDetails = this.handleViewDetails.bind(this)
  }

  handleViewDetails (accountId) {
    this.props.history.push(`/app/banking/transactions/${accountId}`)
  }

  componentWillMount () {
    if (this.state.hasCompany) {
      this.props.fetchAccounts(window.globalState.getCompanyId())
    }
  }

  getTotal (accounts) {
    return accounts.reduce((prev, acc, index) => {
      return prev + acc.balances.available
    }, 0)
  }
  renderAccounts (title, accounts) {
    if (!accounts || accounts.length <= 0) {
      return ''
    }

    return (<div className='panel'>
      <div className='level'>
        <div className='level-left'>
          <div>{title}</div>
        </div>
        <div className='level-right'>
          <div>
            <span>Total: </span>
            <FormattedNumber value={this.getTotal(accounts)} style='currency' currency='USD' />
          </div>
        </div>
      </div>
      <div>
        {accounts.map((account, i) =>
          <Account
            key={i}
            accountId={account.account_id}
            name={account.name}
            mask={account.mask}
            available={account.balances.available ? account.balances.available : 0}
            onClick={this.handleViewDetails}
          />)}
      </div>
      <br />
    </div>)
  }

  render () {
    if (this.props.loading) {
      return <div>Loading...</div>
    }

    let investments = this.props.accounts.filter(a => {
      return (accountTypes.getSubtypeType(a.subtype) === 'INVESTMENT')
    })

    let cash = this.props.accounts.filter(a => {
      return (accountTypes.getSubtypeType(a.subtype) === 'CASH')
    })

    let liabilities = this.props.accounts.filter(a => {
      return (accountTypes.getSubtypeType(a.subtype) === 'LIABILITY')
    })

    let other = this.props.accounts.filter(a => {
      return (accountTypes.getSubtypeType(a.subtype) === 'OTHER')
    })

    let unknown = this.props.accounts.filter(a => {
      return (accountTypes.getSubtypeType(a.subtype) === 'UNKNOWN')
    })

    return (
      <div>
        <section className='hero'>
          <div className='hero-body'>
            <div className='container'>
              <h1 className='title'>
                Banking
              </h1>
            </div>
          </div>
        </section>

        <div className='box'>
          <Plaid />
        </div>

        <div>
          {this.renderAccounts('INVESTMENTS', investments)}
          {this.renderAccounts('CASH', cash)}
          {this.renderAccounts('LIABILITIES', liabilities)}
          {this.renderAccounts('OTHER', other)}
          {this.renderAccounts('UNKNOWN', unknown)}
        </div>

      </div>
    )
  }
}

export default connect((state) => state.accounts, {fetchAccounts})(withRouter(AccountList))

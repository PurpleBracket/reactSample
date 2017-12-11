import React, { Component } from 'react'
import Transactions from '../../transactions/transactions'
import { connect } from 'react-redux'
import FigurePanel from '../.././../modules/dashboard/dashboard.overview.figures.panel'
import { fetchTransactions } from '../../transactions/transactions.action'

class AccountDetails extends Component {
  // constructor (props) {
  //   super(props)
  // }

  componentWillMount () {
    this.props.fetchTransactions(this.props.match.params.accountId)
  }

  render () {
    if (!this.props.accounts || this.props.accounts.length === 0) {
      return 'Loading...'
    }

    return (
      <div className='container'>
        <div className='level'>
          <div className='level-item'>
            <div>{this.props.accounts[0].name}</div>
            <div>...{this.props.accounts[0].mask}</div>
          </div>
          <div className='level-item'>
            <FigurePanel
              title={'AVAILABLE NOW'}
              value={this.props.accounts[0].balances.available}
            />
          </div>
          <div className='level-item'>
            <FigurePanel
              title={'TOTAL BALANCE'}
              value={this.props.accounts[0].balances.current}
            />
          </div>
        </div>
        <div className='level'>
          <div className='level-item has-text-centered'>
            <Transactions accountId={this.props.match.params.accountId} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return {
    transactions: state.transactions.transactions,
    accounts: state.transactions.accounts
  }
}, {fetchTransactions})(AccountDetails)

// export default connect(null, {fetchTransactions})(withRouter(AccountDetails))

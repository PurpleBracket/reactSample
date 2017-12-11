import React, { Component } from 'react'
import { fetchTransactions } from './transactions.action'
import { connect } from 'react-redux'
import TransactionItem from './transaction.item'

class Transactions extends Component {
  // componentWillMount () {
  //   this.props.fetchTransactions(this.props.accountId)
  // }

  render () {
    if (this.props.loading) {
      return 'Loading...'
    }

    if (this.props.accounts && this.props.accounts[0].account_id !== this.props.accountId) {
      return 'Loading...'
    }

    let transactionItems = this.props.transactions.map((t, i) => {
      return <TransactionItem key={i} date={t.date} name={t.name} amount={t.amount} />
    })

    return (
      <table className='table'>
        <tbody>
          {transactionItems}
        </tbody>
      </table>
    )
  }
}

Transactions.defaultProps = {
  loading: true,
  transactions: []
}

export default connect(state => {
  return {
    loading: false,
    transactions: state.transactions.transactions,
    accounts: state.transactions.accounts
  }
}, {fetchTransactions})(Transactions)

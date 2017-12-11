import TransactionsClient from './transactions.client'

export const fetchTransactions = (accountId) => {
  let transactionsClient = new TransactionsClient()

  const request = transactionsClient.getTransactionsByAccountId(accountId)
  // .then(res => callback(null, res))
  // .catch(err => callback(err))

  return {
    type: 'FETCH_TRANSACTIONS',
    payload: request
  }
}

export default fetchTransactions

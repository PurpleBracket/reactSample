import RestClient from '../../../packages/express-plus/src/data/restclient'

export default class TransactionsClient {
  constructor () {
    this.restclient = new RestClient('/api/transaction')
  }

  async getTransactionsByAccountId (accountId) {
    return this.restclient.get({
      accountId: accountId
    })
  }
}

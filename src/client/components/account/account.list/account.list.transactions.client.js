import RestClient from '../../../../packages/express-plus/src/data/restclient'

export default class AccountClient {
  constructor () {
    this.restclient = new RestClient('/api/transaction')
  }

  getTransactionsByAccountId (accountId) {
    console.log(this.restclient.get({
      accountId
    }))

    return this.restclient.get({
      accountId
    })
  }
}

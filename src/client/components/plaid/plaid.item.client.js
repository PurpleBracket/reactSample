import RestClient from '../../../packages/express-plus/src/data/restclient'

export default class PlaidClient {
  constructor () {
    this.restclient = new RestClient('/api/plaiditem')
  }

  async create (plaidItemModel) {
    // plaidItem.companyId = companyId || window.globalState.getCompanyId()
    return this.restclient.post(plaidItemModel)
  }

  // async getByPlaidItemId (plaidItemId) {
  //   return this.restclient.get({
  //     id: plaidItemId
  //   })
  // }
}

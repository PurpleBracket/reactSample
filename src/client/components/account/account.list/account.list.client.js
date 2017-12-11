import RestClient from '../../../../packages/express-plus/src/data/restclient'

export default class AccountClient {
  constructor () {
    this.restclient = new RestClient('/api/plaidaccount')
  }

  // async create (plaidAccountModel) {
  //   // plaidItem.companyId = companyId || window.globalState.getCompanyId()
  //   return this.restclient.post(plaidAccountModel)
  // }

  getAccountsByCompanyId (companyId) {
    return this.restclient.get({
      companyId: companyId
    })
  }
}

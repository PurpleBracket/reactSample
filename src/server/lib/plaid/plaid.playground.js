import plaidInterface from './plaid.api.interface'

class PlaidPlayground {
  constructor (publicToken) {
    this.publicToken = publicToken
    this.plaidInterface = plaidInterface
  }

  async run () {
    try {
      // Get Access to Item (Bank)
      this.res = await plaidInterface.getAccessTokenAndItemId(this.publicToken)

      // Get all accounts at bank
      this.accounts = await plaidInterface.getAccounts(this.res.access_token)

      global.logger.log(this.accounts)

      return {
        accounts: this.accounts,
        access_token: this.res.access_token
      }
    } catch (e) {
      global.logger.error(e)
    }
  }
}

// var p = require('./pp')
// var a = new p.default("public-sandbox-01c27d8e-2f6b-46fe-aef6-6574d585492b")
// a.run()

var a = new PlaidPlayground('public-sandbox-8a9f6c07-6311-40fa-b9fb-dd54652125d6')
export default a.run()

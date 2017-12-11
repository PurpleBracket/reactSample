import RestClient from '../../../packages/express-plus/src/data/restclient'

class UserClient {
  constructor () {
    this.restclient = new RestClient('/api/user')
  }

  async getCompaniesByUserId (userId) {
    return this.restclient.get({
      id: userId,
      fields: ['companies']
    })
  }
}

export default new UserClient()

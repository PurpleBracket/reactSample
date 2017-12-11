import RestClient from '../../../packages/express-plus/src/data/restclient'

class DashboardClient {
  constructor () {
    this.restclient = new RestClient('/api/dashboard')
  }

  async getSummaryByCompanyId (companyId) {
    return this.restclient.get({
      companyId
    })
  }
}

export default new DashboardClient()

import RestClient from '../../../packages/express-plus/src/data/restclient'

class CompanyClient {
  constructor () {
    this.restclient = new RestClient('/api/company')
  }

  async create (company, userId) {
    company.admin = userId || window.globalState.get('userId')
    return this.restclient.post(company)
  }

  async getByCompanyId (companyId) {
    return this.restclient.get({
      id: companyId,
      fields: ['name']
    })
  }
}

export default new CompanyClient()

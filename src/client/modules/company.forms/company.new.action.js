import companyClient from './company.client'

export const createCompany = (values, callback) => {
  // let companyClient = new CompanyClient()

  const request = companyClient.create(values)
    .then(res => callback(null, res))
    .catch(err => callback(err))

  return {
    type: 'COMPANY_ADD',
    payload: request
  }
}

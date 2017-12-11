import AccountDetailsClient from './account.details.client'

export const fetchAccountDetails = (companyId, callback) => {
  let accountDetailsClient = new AccountDetailsClient()

  const request = accountDetailsClient.getAccountsByC(companyId)
    .then(res => callback(null, res))
    .catch(err => callback(err))

  return {
    type: 'FETCH_ACCOUNT_DETAILS',
    payload: request
  }
}

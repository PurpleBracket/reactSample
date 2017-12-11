import AccountClient from './account.list.client'

export const fetchAccounts = (companyId) => {
  let accountClient = new AccountClient()

  const request = accountClient.getAccountsByCompanyId(companyId)

  console.log('Request = ', request)

  return {
    type: 'FETCH_ACCOUNTS',
    payload: request
  }
}

// export const addAccounts = (companyId, addAccounts)

let subtype = {
  brokerage: ['401k', 'brokerage', 'ira', 'retirement', 'roth', 'ugma'],
  credit: ['credit card', 'paypal', 'line of credit', 'rewards'],
  depository: ['checking', 'savings', 'money market', 'paypal', 'prepaid'],
  loan: ['auto', 'commercial', 'construction', 'consumer', 'home', 'home equity', 'loan', 'mortgage', 'overdraft', 'line of credit', 'student'],
  mortgage: ['home'],
  other: ['403B', 'cash management', 'cd', 'hsa', 'keogh', 'money market', 'mutual fund', 'prepaid', 'recurring', 'rewards', 'safe deposit', 'sarsep', 'other']
}

// let TreasureTypes = {
//   investment: ['401k', 'brokerage', 'ira', 'retirement', 'roth', 'ugma', 'home'],
//
//   cash: ['checking', 'savings', 'money market', 'paypal', 'prepaid'],
//
//   liability: ['credit card', 'paypal', 'line of credit', 'rewards', 'auto',
//       'commercial', 'construction', 'consumer', 'home', 'home equity', 'loan',
//     'mortgage', 'overdraft', 'line of credit', 'student']
//
//   other: ['403B', 'cash management', 'cd', 'hsa', 'keogh', 'money market', 'mutual fund', 'prepaid', 'recurring', 'rewards', 'safe deposit', 'sarsep', 'other']
// }

class AccountTypes {
  getSubtypeType (type) {
    if (this.isCashAccount(type)) {
      return 'CASH'
    } else if (this.isInvestmentAccount(type)) {
      return 'INVESTMENT'
    } else if (this.isLiabilityAccount(type)) {
      return 'LIABILITY'
    } else if (this.isOther(type)) {
      return 'OTHER'
    } else {
      return 'UNKNOWN'
    }
  }

  isInvestmentAccount (type) {
    return (subtype.brokerage.includes(type) || subtype.mortgage.includes(type))
  }

  isCashAccount (type) {
    return (subtype.depository.includes(type) || subtype.mortgage.includes(type))
  }

  isLiabilityAccount (type) {
    return (subtype.loan.includes(type) || subtype.credit.includes(type))
  }

  isOther (type) {
    return subtype.other.includes(type)
  }
}

export default new AccountTypes()

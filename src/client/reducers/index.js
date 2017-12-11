import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import companyReducer from '../reducers/companies'
import signinReducer from '../reducers/signin'
// import accountReducer from '../components/accounts/account.reducer'
import plaidReducer from '../components/plaid/plaid.reducer'
import AccountListReducer from '../components/account/account.list/account.list.reducer'
import TransactionsReducer from '../components/transactions/transactions.reducer'

const appReducer = combineReducers({
  companies: companyReducer,
  signin: signinReducer,
  form: formReducer,
  plaid: plaidReducer,
  accounts: AccountListReducer,
  transactions: TransactionsReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'SIGNOUT') {
    console.log('CLEARING STATE...')

    const {routing} = state
    state = {routing}
  }

  return appReducer(state, action)
}

export default rootReducer

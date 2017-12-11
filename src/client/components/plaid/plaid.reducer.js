export default (state = {accounts: []}, action) => {
  switch (action.type) {
    case 'PLAID_ITEM_ADD':
      return {
        accounts: state.accounts
      }

    // case 'COMPANY_GET':
    //   return {
    //     company: state.company
    //   }

    default:
      return state
  }
}

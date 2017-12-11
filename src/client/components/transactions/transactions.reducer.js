export default (state = {transactions: []}, action) => {
  switch (action.type) {
    case 'FETCH_TRANSACTIONS':
      return {
        ...action.payload.body,
        loading: false
      }

    default:
      return state
  }
}

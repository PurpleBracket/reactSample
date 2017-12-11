export default (state = {
  accounts: [],
  loading: true
}, action) => {
  console.log('Action received: ', action)
  switch (action.type) {
    case 'FETCH_ACCOUNTS':
      return {
        accounts: action.payload.body,
        loading: false
      }

    default:
      return state
  }
}

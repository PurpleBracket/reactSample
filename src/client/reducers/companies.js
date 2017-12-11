export default (state = {company: null}, action) => {
  switch (action.type) {
    case 'COMPANY_ADD':
      return {
        company: {
          name: action.name
        }
      }

    case 'COMPANY_GET':
      return {
        company: state.company
      }

    default:
      return state
  }
}

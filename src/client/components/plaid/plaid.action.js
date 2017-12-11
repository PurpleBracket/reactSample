import PlaidClient from './plaid.item.client'
// import PlaidItemSchema from '../../../server/models/plaid.item.schema'

export const createPlaidItem = (data, callback) => {
  // {companyId, metadata, publicToken}
  let plaidClient = new PlaidClient()

  var model = ({
    companyId: data.companyId,
    publicToken: data.publicToken,
    institution_id: data.metadata.institution.institution_id,
    name: data.metadata.institution.name,
    link_session_id: data.metadata.link_session_id
  })

  // global.logger.log(model.toObject())
  // global.logger.log(model.toJSON())

  // const request = plaidClient.create(model.toObject())
  const request = plaidClient.create(model)
    .then(res => callback(null, res))
    .catch(err => callback(err))

  return {
    type: 'PLAID_ITEM_ADD',
    payload: request
  }
}

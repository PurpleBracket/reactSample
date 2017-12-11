/* global expect test */
import PlaidItem from './plaid.item.schema'
import mongoose from 'mongoose'

test('Plaid Item', done => {
  let data = {
    _id: mongoose.Types.ObjectId(),
    access_token: 'test'
  }

  let item = new PlaidItem(data)

  item.publicToken = 'test'

  expect(item.publicToken).toEqual('test')
  expect(item.toJSON()).toEqual(data)

  item.validate((err) => {
    expect(err.errors.access_token).not.toBeNull()
    done()
  })
})

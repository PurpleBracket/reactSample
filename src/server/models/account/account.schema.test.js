/* global expect test */
import mongoose from 'mongoose'
import Account from './account.schema'

test('Account Schema', done => {
  let data = {
    _id: mongoose.Types.ObjectId(),
    companyId: mongoose.Types.ObjectId(),
    name: 'CompanyName',
    access_token: 'Access Token!',
    institution: {
      _id: mongoose.Types.ObjectId(),
      institution_id: 'Institution ID',
      name: 'Institution Name'
    }
  }

  let item = new Account(data)

  item.publicToken = 'test'

  expect(item.publicToken).toEqual('test')
  expect(item.toJSON()).toEqual(data)

  item.validate((err) => {
    expect(err).toBeNull()
    done()
  })
})

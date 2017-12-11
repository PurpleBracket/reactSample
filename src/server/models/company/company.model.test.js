/* global describe expect test */
import mongoose from 'mongoose'
import Company from './company.model'

describe('Company', () => {
  test('Model', done => {
    let data = {
      _id: mongoose.Types.ObjectId(),
      admin: mongoose.Types.ObjectId(),
      name: 'CompanyName',
      taxId: 'Tax Id'
    }

    let item = new Company(data)

    expect(item.toJSON()).toEqual(data)

    item.validate((err) => {
      expect(err).toBeNull()
      done()
    })
  })

  test('Api', done => {
    done()
  })
})

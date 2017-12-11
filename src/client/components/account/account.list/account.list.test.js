/* global describe test expect */
import AccountList from './account.list'
import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'

describe('Account', () => {
  test('Snapshot', () => {
    const account = shallow(<Provider><AccountList /></Provider>)
    expect(account).toMatchSnapshot()
  })
})

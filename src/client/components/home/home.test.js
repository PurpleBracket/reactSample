/* global describe test expect */
import Home from './home'
import React from 'react'
import { shallow } from 'enzyme'

describe('Home', () => {
  test('Snapshot', () => {
    const home = shallow(<Home />)
    expect(home).toMatchSnapshot()
  })
})

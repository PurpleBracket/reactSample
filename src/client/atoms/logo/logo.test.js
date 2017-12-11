/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import Logo from './logo.full'

describe('Logo', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<Logo />)
    expect(wrapper).toMatchSnapshot()
  })
})

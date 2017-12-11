/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import LogoFull from './logo.full'

describe('LogoFull', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<LogoFull />)
    expect(wrapper).toMatchSnapshot()
  })
})

/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import LogoType from './logo.type'

describe('LogoIcon', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<LogoType />)
    expect(wrapper).toMatchSnapshot()
  })
})

/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import LogoIcon from './logo.icon'

describe('LogoIcon', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<LogoIcon />)
    expect(wrapper).toMatchSnapshot()
  })
})

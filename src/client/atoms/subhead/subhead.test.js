/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import Subhead from './subhead'

describe('Subhead', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<Subhead size='1'>Test Subhead</Subhead>)
    expect(wrapper).toMatchSnapshot()
  })
})

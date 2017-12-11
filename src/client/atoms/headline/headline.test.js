/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import Headline from './headline'

describe('Headline', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<Headline size='1'>Test</Headline>)
    expect(wrapper).toMatchSnapshot()
  })
})

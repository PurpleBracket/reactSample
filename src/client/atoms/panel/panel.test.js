/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import Panel from './panel'

describe('Headline', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<Panel>Test Panel</Panel>)
    expect(wrapper).toMatchSnapshot()
  })
})

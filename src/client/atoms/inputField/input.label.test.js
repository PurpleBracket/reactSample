/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import Label from './input.label'

describe('Headline', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<Label>Test Label</Label>)
    expect(wrapper).toMatchSnapshot()
  })
})

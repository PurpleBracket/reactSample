/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import TextInput from './input.text'

describe('Headline', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<TextInput type='text' label='Input Label' placeholder='Text Input' />)
    expect(wrapper).toMatchSnapshot()
  })
})

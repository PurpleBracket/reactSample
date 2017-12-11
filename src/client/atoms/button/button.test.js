/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import Button from './button'

describe('Button', () => {
  test('should match snapshot', () => {
    const btn = shallow(<Button>Test Button</Button>)
    expect(btn).toMatchSnapshot()
  })
})

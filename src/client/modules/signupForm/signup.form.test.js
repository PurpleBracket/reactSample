/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import SignupForm from './signup.form'

describe('Register', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<SignupForm />)
    expect(wrapper).toMatchSnapshot()
  })
})

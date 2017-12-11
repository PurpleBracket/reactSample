/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import PasswordResetForm from './passwordReset.form'

describe('Register', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<PasswordResetForm />)
    expect(wrapper).toMatchSnapshot()
  })
})

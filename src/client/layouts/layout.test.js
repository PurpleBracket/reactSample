/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import AppTemplate from './app.template'
import LandingTemplate from './landing.template'
import { Provider } from 'react-redux'

describe('App Template', () => {
  test('should match App', () => {
    const wrapper = shallow(<Provider><AppTemplate /></Provider>)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Landing Template', () => {
  test('should match Landng page', () => {
    const wrapper = shallow(<LandingTemplate />)
    expect(wrapper).toMatchSnapshot()
  })
})

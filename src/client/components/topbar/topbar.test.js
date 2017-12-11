/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import TopbarHome from './topbar.home'
import TopbarDashboard from './topbar.dashboard'

describe('Header', () => {
  test('should render for landing page', () => {
    const wrapper = shallow(<TopbarHome />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should render for app page', () => {
    const wrapper = shallow(<TopbarDashboard />)
    expect(wrapper).toMatchSnapshot()
  })
})

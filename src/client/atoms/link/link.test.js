/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import Link from './link'

describe('Headline', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<Link href='#'>Link</Link>)
    expect(wrapper).toMatchSnapshot()
  })
})

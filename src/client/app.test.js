/* global describe test expect */
import React from 'react'
// import { shallow } from 'enzyme'
import App from '../client/app'
import renderer from 'react-test-renderer'

import { MemoryRouter } from 'react-router'

describe('App', () => {
  test('should match snapshot', () => {
    // const wrapper = shallow(<App />)
    const tree = renderer.create(
      <MemoryRouter initialEntries={['/users/2']}>
        <App />
      </MemoryRouter>).toJSON()

    // TODO:
    // expect(wrapper.find('div').text()).toBe('Welcome to React Boilerplate App')
    expect(tree).toMatchSnapshot()
  })

  // test('should trigger button click', () => {
  //   // const mockCallBack = jest.fn()
  //
  //   const wrapper = shallow(<App />)
  //   expect(wrapper.find('button').text()).toEqual('Click here to load more files')
  //   // expect(mockCallBack.mock.calls.length).toEqual(1);
  // })
})

/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import SigninForm from './signin.form'

// beforeAll(() => {
//   global.logger = {
//     info: function () {
//
//     }
//     // info: jest.fn(),
//     // log: jest.fn(),
//     // error: jest.fn()
//   }
// })

describe('Register', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<SigninForm />)
    expect(wrapper).toMatchSnapshot()
  })

  test('email is stored in state', () => {
    const wrapper = shallow(<SigninForm />)
    let input = wrapper.find('[name="email"]')
    input.simulate('change', {target: {name: 'email', value: 'abc'}})
    expect(wrapper.state().email).toEqual('abc')
  })

    // test('handle submit calls login', async done => {
    //   let mockHistory = jest.fn()
    //   let mockLogin = jest.fn((state) => {
    //     return new Promise((resolve, reject) => {
    //       if (state) {
    //         resolve(state)
    //       } else {
    //         reject(new Error('Empty state object'))
    //       }
    //     })
    //   })
    //
    //   let wrapper = shallow(<Signin history={{push: mockHistory}} />)
    //   wrapper.instance().client.login = mockLogin
    //
    //   wrapper.update()
    //   wrapper.instance().handleSubmit({
    //     preventDefault: () => {}
    //   })
    //
    //   await expect(mockLogin).toBeCalled()
    //   await expect(mockHistory).toBeCalled()
    //   done()
    // })
})

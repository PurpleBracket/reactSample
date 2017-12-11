/* global describe test expect */
import User from './userschema'

describe('User Schema', () => {
  test('can be loaded', () => {
    let user = new User()
    expect(user).toBeTruthy()
    expect(user.isUserModel).toBeTruthy()
  })
})

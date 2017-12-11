/* describe jest */
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

require('events').EventEmitter.prototype._maxListeners = 100

Enzyme.configure({
  adapter: new Adapter()
})

// let getCompanyId = jest.fn(() => {
//   return 44
// })
//
global.window = {
  globalState: {
    getCompanyId: function () {
      return 44
    },
    clearGlobalState: function () {

    }
  },

  CONFIG_ENV: 'test'
}

global.logger = {
  info: function () {

  },
  log: function () {

  }
  // jest.fn()
  // info: jest.fn(),
  // log: jest.fn(),
  // error: jest.fn()
}

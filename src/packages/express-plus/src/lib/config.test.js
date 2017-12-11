/* global describe test expect beforeAll */
import Config from '../lib/config'

let config = null

beforeAll(async done => {
  config = await Config.createConfig('config-test')
  // console.log(config.config._store)
  done()
})

describe('Global config', () => {
  test('returns environment', async done => {
    expect(config.getGlobal('env:env')).toEqual('test')
    done()
  })

  test('returns secret', async done => {
    expect(config.getGlobal('secret')).toEqual('TEST')
    done()
  })

  test('returns true for test env', async done => {
    expect(config.getGlobal('env:test')).toEqual(true)
    done()
  })

  test('returns false for dev env', async done => {
    expect(config.getGlobal('env:dev')).toEqual(undefined)
    done()
  })
})

describe('Config for Service', () => {
  test('returns port', async done => {
    expect(config.get('port')).toEqual(1234)
    done()
  })
})

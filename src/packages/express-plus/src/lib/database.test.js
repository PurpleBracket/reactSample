/* global test expect */
import Config from './config'
import database from './database' // eslint-disable-line

test('Database connection works', async done => {
  try {
    expect(database.config).toEqual(expect.anything())

    var config = await Config.createConfig('treasure-api')
    database.config(config)
      .then(val => {
        done(null, val)
      })
      .catch(err => {
        done(err, null)
      })
  } catch (e) {
    done(e, null)
  }
})

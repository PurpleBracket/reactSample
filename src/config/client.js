module.exports = {
  local: {
    'treasure-api': {
      uri: 'localhost:3000'
    },
    plaid: {
      publickey: 'e4505299424a97df527f268a5f76a4',
      secret: 'ada3d63b4836607dee64c9603bf3ee',
      clientid: '57e6f7d7062e8c1d58ff9320',
      env: 'sandbox'
    }
  },
  development: {
    'treasure-api': {
      uri: 'devbox.treasure.tech:3000'
    },
    plaid: {
      publickey: 'e4505299424a97df527f268a5f76a4',
      secret: 'ada3d63b4836607dee64c9603bf3ee',
      clientid: '57e6f7d7062e8c1d58ff9320',
      env: 'development'
    }
  },
  production: {
    'treasure-api': {
      uri: 'devbox.treasure.tech'
    },
    plaid: {
      publickey: 'e4505299424a97df527f268a5f76a4',
      secret: 'ada3d63b4836607dee64c9603bf3ee',
      clientid: '57e6f7d7062e8c1d58ff9320',
      env: 'development'
    }
  },
  test: {
    'treasure-api': {
      uri: 'localhost:3000'
    },
    plaid: {
      publickey: 'e4505299424a97df527f268a5wf76a4',
      secret: 'ada3d63b4836607dee64c9603bf3ee',
      clientid: '57e6f7d7062e8c1d58ff9320',
      env: 'sandbox'
    }
  }
}

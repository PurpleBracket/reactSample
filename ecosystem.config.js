module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */

  apps: [

    // First application
    {
      exec_mode: 'cluster',
      listen_timeout: 1000,
      name: 'Treasure-API',
      script: 'npm',
      args: 'start',
      instances: 1,
      kill_timeout: 3000,
      wait_ready: true,
      env: {
        port: 5000,
        NODE_ENV: 'development'
      }
      // env_production : {
      //   NODE_ENV: 'production'
      // }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    // production : {
    //   user : 'node',
    //   host : '212.83.163.1',
    //   ref  : 'origin/master',
    //   repo : 'git@github.com:repo.git',
    //   path : '/var/www/production',
    //   'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    // },
    local: {
      user: 'node',
      host: '127.0.0.1',
      path: '/Users/theoutlander/www/local',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
      env: {
        port: 8000,
        NODE_ENV: 'development'
      }
    }
    // development : {
    //   user : 'node',
    //   host : '212.83.163.1',
    //   ref  : 'origin/master',
    //   repo : 'git@github.com:repo.git',
    //   path : '/var/www/development',
    //   'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
    //   env  : {
    //     NODE_ENV: 'dev'
    //   }
    // }
  }
}

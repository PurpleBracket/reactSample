module.exports = {
  plugins: [
    require('postcss-import')({
      plugins: [
        // require("stylelint")({ /* your options */ })
      ]
    }),
    require('postcss-url'),
    require('precss'),
    require('postcss-cssnext'), // cpontains autoprefixer
    require('postcss-utilities'),
    require('cssnano')({autoprefixer: false}),
    require('postcss-reporter'),
    require('postcss-browser-reporter')
  ]
}

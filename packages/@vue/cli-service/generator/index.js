module.exports = (api, options) => {
  api.render('./template', {
    doesCompile: api.hasPlugin('babel') || api.hasPlugin('typescript')
  })

  console.log('**********************************************************')
  console.log(JSON.stringify(options, null, '  '))
  console.log('**********************************************************')

  api.extendPackage({
    scripts: {
      'serve': 'vicli-cli-service serve',
      'build': 'vicli-cli-service build'
    },
    dependencies: {
      'react': '^16.8.4',
      'react-dom': '^16.8.4'
    },
    'postcss': {
      'plugins': {
        'autoprefixer': {}
      }
    },
    browserslist: [
      '> 1%',
      'last 2 versions'
    ]
  })

  if (options.router) {
    require('./router')(api, options)
  }

  if (options.vuex) {
    require('./vuex')(api, options)
  }

  if (options.cssPreprocessor) {
    const deps = {
      // TODO: remove 'sass' option in v4 or rename 'dart-sass' to 'sass'
      sass: {
        'node-sass': '^4.9.0',
        'sass-loader': '^7.1.0'
      },
      'node-sass': {
        'node-sass': '^4.9.0',
        'sass-loader': '^7.1.0'
      },
      'dart-sass': {
        sass: '^1.18.0',
        'sass-loader': '^7.1.0'
      },
      less: {
        'less': '^3.0.4',
        'less-loader': '^4.1.0'
      },
      stylus: {
        'stylus': '^0.54.5',
        'stylus-loader': '^3.0.2'
      }
    }

    api.extendPackage({
      devDependencies: deps[options.cssPreprocessor]
    })
  }

  // additional tooling configurations
  if (options.configs) {
    api.extendPackage(options.configs)
  }
}

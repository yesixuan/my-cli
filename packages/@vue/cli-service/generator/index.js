module.exports = (api, options) => {
  api.render('./template', {
    doesCompile: api.hasPlugin('babel') || api.hasPlugin('typescript')
  })

  api.extendPackage({
    scripts: {
      'serve': 'vicli-cli-service serve',
      'build': 'vicli-cli-service build'
    },
    dependencies: {
      'react': '^16.8.6',
      'react-dom': '^16.8.4',
      // 开发环境下使用 @hot-loader/react-dom 代替 react-dom 以实现热更新
      '@hot-loader/react-dom': '^16.8.6'
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

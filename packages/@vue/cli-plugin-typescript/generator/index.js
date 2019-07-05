module.exports = (api, {
  classComponent,
  tsLint,
  lintOn = []
}, { router }, invoking) => {

  if (typeof lintOn === 'string') {
    lintOn = lintOn.split(',')
  }

  api.extendPackage({
    babel: {
      presets: [['@babel/preset-typescript', {
        isTSX: true,
        allExtensions: true
      }]],
      plugins: [
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread'
      ]
    },
    devDependencies: {
      'typescript': '^3.4.3',
      'eslint': '^5.16.0',
      '@types/node': '12.0.10',
      '@types/react': '16.8.22',
      '@types/react-dom': '16.8.4',
      '@babel/preset-typescript': '^7.3.3',
      '@babel/plugin-proposal-class-properties': '^7.4.4',
      '@babel/plugin-proposal-object-rest-spread': '^7.4.4'
    }
  })

  if (router) {
    api.extendPackage({
      dependencies: {
        '@types/react-router-dom': '^4.3.4'
      }
    })
  }

  if (tsLint) {
    api.extendPackage({
      scripts: {
        lint: 'vicli-cli-service lint'
      }
    })

    if (!lintOn.includes('save')) {
      api.extendPackage({
        vue: {
          lintOnSave: false
        }
      })
    }

    if (lintOn.includes('commit')) {
      api.extendPackage({
        devDependencies: {
          'lint-staged': '^8.1.5'
        },
        gitHooks: {
          'pre-commit': 'lint-staged'
        },
        'lint-staged': {
          '*.ts': ['vicli-cli-service lint', 'git add'],
          '*.tsx': ['vicli-cli-service lint', 'git add']
        }
      })
    }

    // lint and fix files on creation complete
    api.onCreateComplete(() => {
      // return require('../lib/tslint')({}, api, true)
    })
  }

  // late invoke compat
  if (invoking) {
    if (api.hasPlugin('unit-mocha')) {
      // eslint-disable-next-line node/no-extraneous-require
      require('@vue/cli-plugin-unit-mocha/generator').applyTS(api)
    }

    if (api.hasPlugin('unit-jest')) {
      // eslint-disable-next-line node/no-extraneous-require
      require('@vue/cli-plugin-unit-jest/generator').applyTS(api)
    }

    if (api.hasPlugin('eslint')) {
      // eslint-disable-next-line node/no-extraneous-require
      require('@vicli/cli-plugin-eslint/generator').applyTS(api)
    }
  }

  api.render('./template', {
    isTest: process.env.VUE_CLI_TEST || process.env.VUE_CLI_DEBUG,
    hasMocha: api.hasPlugin('unit-mocha'),
    hasJest: api.hasPlugin('unit-jest'),
    isTs: api.hasPlugin('typescript')
  })

  require('./convert')(api, { tsLint })
}

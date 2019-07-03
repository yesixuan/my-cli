const fs = require('fs')
const path = require('path')

module.exports = (api, { config, lintOn = [] }, _, invoking) => {
  if (typeof lintOn === 'string') {
    lintOn = lintOn.split(',')
  }

  const eslintConfig = require('../eslintOptions').config(api)

  const pkg = {
    scripts: {
      lint: 'vicli-cli-service lint'
    },
    eslintConfig,
    // TODO:
    // Move these dependencies to package.json in v4.
    // Now in v3 we have to add redundant eslint related dependencies
    // in order to keep compatibility with v3.0.x users who defaults to ESlint v4.
    devDependencies: {
      'babel-eslint': '^10.0.1',
      'eslint': '^5.16.0',
      'eslint-plugin-react-app': '5.0.1'
    }
  }

  const injectEditorConfig = (config) => {
    const filePath = api.resolve('.editorconfig')
    if (fs.existsSync(filePath)) {
      // Append to existing .editorconfig
      api.render(files => {
        const configPath = path.resolve(__dirname, `./template/${config}/_editorconfig`)
        const editorconfig = fs.readFileSync(configPath, 'utf-8')

        files['.editorconfig'] += `\n${editorconfig}`
      })
    } else {
      api.render(`./template/${config}`)
    }
  }

  if (config === 'airbnb') {
    eslintConfig.extends.push('airbnb')
    eslintConfig.settings = {
      'import/resolver': {
        webpack: {
          config: require.resolve('@vicli/cli-service/webpack.config.js')
        }
      },
      'import/extensions': [
        '.js',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx'
      ]
    }
    Object.assign(pkg.devDependencies, {
      'eslint-config-airbnb': '^17.1.1'
    })
    injectEditorConfig('airbnb')
  } else if (config === 'standard') {
    eslintConfig.extends.push('@vicli/standard')
    Object.assign(pkg.devDependencies, {
      '@vicli/eslint-config-standard': '^0.0.0'
    })
    injectEditorConfig('standard')
  } else if (config === 'prettier') {
    eslintConfig.extends.push('@vicli/prettier')
    Object.assign(pkg.devDependencies, {
      '@vicli/eslint-config-prettier': '^0.0.1'
    })
    // prettier & default config do not have any style rules
    // so no need to generate an editorconfig file
  } else {
    // default
    eslintConfig.extends.push('eslint:recommended')
  }

  if (!lintOn.includes('save')) {
    pkg.vue = {
      lintOnSave: false // eslint-loader configured in runtime plugin
    }
  }

  if (lintOn.includes('commit')) {
    Object.assign(pkg.devDependencies, {
      'lint-staged': '^8.1.5'
    })
    pkg.gitHooks = {
      'pre-commit': 'lint-staged'
    }
    pkg['lint-staged'] = {
      '*.{js,vue}': ['vicli-cli-service lint', 'git add']
    }
  }

  api.extendPackage(pkg)

  // typescript support
  if (api.hasPlugin('typescript')) {
    applyTS(api)
  }

  // invoking only
  if (invoking) {
    if (api.hasPlugin('unit-mocha')) {
      // eslint-disable-next-line node/no-extraneous-require
      require('@vue/cli-plugin-unit-mocha/generator').applyESLint(api)
    } else if (api.hasPlugin('unit-jest')) {
      // eslint-disable-next-line node/no-extraneous-require
      require('@vue/cli-plugin-unit-jest/generator').applyESLint(api)
    }
  }

  // lint & fix after create to ensure files adhere to chosen config
  if (config && config !== 'base') {
    api.onCreateComplete(() => {
      require('../lint')({ silent: true }, api)
    })
  }
}

const applyTS = module.exports.applyTS = api => {
  api.extendPackage({
    eslintConfig: {
      extends: ['typescript', 'typescript/react'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaFeatures: {
          "jsx": true
        }
      },
      plugins: ['@typescript-eslint']
    },
    devDependencies: {
      '@typescript-eslint/parser': '^1.11.0',
      '@typescript-eslint/eslint-plugin': '^1.11.0'
    }
  })
}

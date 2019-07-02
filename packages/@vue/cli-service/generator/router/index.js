const rootComponentWithRouter = `

  (<BrowserRouter>
    <Switch>
      <Route path='/' exact component={App}/>
      <Route path='/demo' component={Demo}/>
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>),
  
`

module.exports = (api, options = {}) => {
  api.injectImports(api.entryFile, `import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'`)
  api.injectImports(api.entryFile, `import Demo from './Demo.jsx'`)
  // api.injectRootOptions(api.entryFile, `router`)
  api.extendPackage({
    dependencies: {
      'vue-router': '^3.0.3',
      'react-router-dom': "^5.0.1",
    }
  })
  api.render('./template', {
    historyMode: options.routerHistoryMode,
    doesCompile: api.hasPlugin('babel') || api.hasPlugin('typescript')
  })

  api.postProcessFiles(files => {
    const appFile = files[`src/main.js`]
    if (appFile) {
      files[`src/main.js`] = appFile.replace(/<App \/>,/, rootComponentWithRouter)
    }
  })

  if (api.invoking) {
    api.postProcessFiles(files => {
      const appFile = files[`src/main.js`]
      if (appFile) {
        files[`src/main.js`] = appFile.replace(/<App \/>,/, rootComponentWithRouter)
      }
    })

    if (api.hasPlugin('typescript')) {
      /* eslint-disable-next-line node/no-extraneous-require */
      const convertFiles = require('@vue/cli-plugin-typescript/generator/convert')
      convertFiles(api)
    }
  }
}

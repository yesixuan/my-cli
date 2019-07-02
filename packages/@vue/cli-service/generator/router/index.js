module.exports = (api, options = {}) => {
  // api.injectImports(api.entryFile, `import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'`)
  // api.injectImports(api.entryFile, `import Demo from './Demo.jsx'`)
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

  if (api.invoking) {
    api.postProcessFiles(files => {
      const appFile = files[`src/App.jsx`]
      if (appFile) {
        files[`src/App.jsx`] = appFile.replace(/^import[^]+App/, `
import React from 'react'
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom'

import Index from './views/Index.jsx'
import Demo from './views/Demo.jsx'
import './App.css'

const App = () => <>
	<BrowserRouter>
		<Link to='/index'>Index</Link>
		<br />
		<Link to='/demo'>Demo</Link>
    <Switch>
      <Route path='/' exact component={Index}/>
      <Route path='/demo' component={Demo}/>
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>
</>

export default App
        `)
      }
    })

    if (api.hasPlugin('typescript')) {
      /* eslint-disable-next-line node/no-extraneous-require */
      const convertFiles = require('@vue/cli-plugin-typescript/generator/convert')
      convertFiles(api)
    }
  }
}

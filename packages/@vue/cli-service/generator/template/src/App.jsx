<%_ if (!options.router) { _%>
import React from 'react'
import './App.css'

const App = () => (
  <div className="App">
    <header className="App-header">
      <h2>App Component</h2>
    </header>
  </div>
)

export default App
<%_ } else { _%>
import React from 'react'
import { <%= options.routerHistoryMode ? `BrowserRouter` : `HashRouter` %>, Route, Redirect, Switch, Link } from 'react-router-dom'

import Index from './views/Index.jsx'
import Demo from './views/Demo.jsx'
import './App.css'

const App = () => <>
<<%= options.routerHistoryMode ? `BrowserRouter` : `HashRouter` %>>
  <Link to='/index'>Index</Link>
  <br />
  <Link to='/demo'>Demo</Link>
  <Switch>
    <Route path='/' exact component={Index}/>
    <Route path='/demo' component={Demo}/>
    <Redirect to='/' />
  </Switch>
  </<%= options.routerHistoryMode ? `BrowserRouter` : `HashRouter` %>>
</>

export default App
<%_ } _%>

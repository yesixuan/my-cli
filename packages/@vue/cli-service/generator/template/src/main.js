<%_ if (!rootOptions.router) { _%>
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

ReactDOM.render(<App />, document.getElementById('app'))
<%_ } else { _%>
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Index from './App'
import Demo from './Demo'

ReactDOM.render(
    (<BrowserRouter>
    <Switch>
      <Route path='/' exact component={Index}/>
      <Route path='/demo' component={Demo}/>
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>),
  document.getElementById('app')
)
<%_ } _%>

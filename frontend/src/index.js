import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { PlantProvider } from './context'
import 'bootstrap/dist/css/bootstrap.css'

import { App } from './App.jsx'

ReactDOM.render(
  <PlantProvider>
    <Router>
      <App />
    </Router>
  </PlantProvider>,
  document.getElementById('root')
)

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

import App from './App.jsx'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)

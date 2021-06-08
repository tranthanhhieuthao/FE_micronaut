import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ClassWelcome from './Components/ClassWelcome'
import Welcome from './Components/Welcome'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={ClassWelcome}/>
                <Route path="/register" component={Welcome} />
                <App />
              </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

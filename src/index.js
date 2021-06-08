import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import TopBar from './Components/TopBar'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { CookiesProvider } from 'react-cookie'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className={useStyles.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={useStyles.paper}><TopBar /></Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={{ height: 'calc(100vh - 200px)', marginTop: '20px' }} className={useStyles.paper}>SideBar</Paper>
          </Grid>
          <Grid item xs={9} >
            <Paper style={{ height: 'calc(100vh - 200px)' }} className={useStyles.paper}>
              <CookiesProvider>
                <App />
              </CookiesProvider>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

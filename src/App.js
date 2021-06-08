import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Components/Home'
import ListUser from './Components/ListUser'
import DetailUser from './Components/DetailUser'
import AdminScreen from './Components/AdminScreen'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TopBar from './Components/TopBar'
import SideBar from './Components/SideBar'


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
function App() {
  return (
    <div>
      <div className={useStyles.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={useStyles.paper}><TopBar /></Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={{ height: 'calc(100vh - 200px)', marginTop: '20px' }} className={useStyles.paper}><SideBar /></Paper>
          </Grid>
          <Grid item xs={9} >
            <Paper style={{ height: 'calc(100vh - 200px)' }} className={useStyles.paper}>
            
          <Switch>
          <Route
                exact
                path="/"
                render={() => {
                    return (
                      <Redirect to="/login" />                    )
                }}
              />
            <Route path="/home" component={Home} />
            <Route path="/users" component={ListUser} />
            <Route path="/detail" component={DetailUser} />
            <Route path="/admin" component={AdminScreen} />
            <Redirect to="/" />
          </Switch>
          </Paper>
              </Grid>
            </Grid>
      </div>
    </div>
  );
}

export default App;

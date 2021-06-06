import React, { Component } from 'react'
import ClassWelcome from './Components/ClassWelcome'
import { BrowserRouter,Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './Components/Welcome'
import Home from './Components/Home'
import ListUser from './Components/ListUser'
import DetailUser from './Components/DetailUser'
import AdminScreen from './Components/AdminScreen'

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" component={ClassWelcome} />
        <Route path="/register" component={Welcome} />
        <Route path="/home" component={Home} />
        <Route path="/users" component={ListUser} />
        <Route path="/detail" component={DetailUser} />
        <Route path="/admin" component={AdminScreen} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;

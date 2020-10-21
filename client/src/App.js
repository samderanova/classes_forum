import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login.component';
import Home from './components/Home.component'; 
import Register from './components/Register.component';
import Header from './components/Header.component';
import Profile from './components/Profile.component';
import './App.scss';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/profile' component={Profile} />
      </Router>
    );
  }
}

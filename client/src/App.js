import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login.component';
import Home from './components/Home.component'; 
import Register from './components/Register.component';
import './App.scss';
import Header from './components/Header.component';
import Footer from './components/Footer.component'
export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Footer />
      </Router>
    );
  }
}

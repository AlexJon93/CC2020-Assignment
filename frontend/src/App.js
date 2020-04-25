import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './js/Login';
import Main from './js/Main';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Main}/>
      <Route path="/login" component={Login}/>
    </Router>
  );
}

export default App;

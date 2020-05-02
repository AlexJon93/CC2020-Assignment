import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './js/Login';
import Main from './js/Main';
import Register from './js/Register';
import WallPage from './js/WallPage';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Main}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/wall" exact component={WallPage}/>
    </Router>
  );
}

export default App;

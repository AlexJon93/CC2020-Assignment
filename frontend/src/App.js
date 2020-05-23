import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Main from './main/Main';
import Register from './register/Register';
import WallPage from './wall/WallPage';
import GroupList from './group-list/GroupList';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Main}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/wall" exact component={WallPage}/>
      <Route path="/groups" exact component={GroupList}/>
    </Router>
  );
}

export default App;

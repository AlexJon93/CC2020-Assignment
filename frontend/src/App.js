import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './login/Login';
import Main from './main/Main';
import Register from './register/Register';
import Wall from './wall/Wall';
import GroupList from './group-list/GroupList';
import Profile from './profile/Profile';
import MyNav from './Nav';
import Logout from './Logout';

function App() {
  return (
    <div>
      <MyNav/>
      <main>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/group/:GroupID" component={Wall}/>
          <Route path="/group" exact component={GroupList} />
          <Route path="/profile" exact component={Profile}/>
          <Route path="/logout" exact component={Logout}/>
        </Switch>
      </main>
    </div>
  );
}

export default App;

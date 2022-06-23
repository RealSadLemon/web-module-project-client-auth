import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/LogIn';
import NavBar from './components/NavBar';
import FriendsList from './components/FriendsList';
import PrivateRoute from './components/PrivateRoute';
import AddFriend from './components/AddFriend';
import {useState} from 'react';
import { Redirect } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const changeLoggedIn = (bool) => {
    setLoggedIn(bool);
  }

  return (
    <Router>
      <NavBar loggedIn={loggedIn} />
      <Switch>
        <PrivateRoute path="/protected" name="loggedIn" component={App}/>
        <Route path='/friendlist'>
          <FriendsList />
        </Route>
        <Route path='/addfriend'>
          <AddFriend />
        </Route>
        <Route path={'/login'}>
          <Login loggedIn={loggedIn} changeLoggedIn={changeLoggedIn}/>
        </Route>
        <Route path={'/'}>
          <Redirect to={'/login'} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

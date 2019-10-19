import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useAuth0 } from './react-auth0-wrapper'

import PrivateRoute from './components/PrivateRoute'

import ExternalApi from './components/ExternalApi';
import ArtistHome from './containers/ArtistHome'
import ArtistProfile from './containers/ArtistProfile'
import LogIn from './components/LogIn'
import NavBar from './NavBar/NavBar';

import './style_sheets/App.css';
import SignUp from './components/SignUp';

function App() {
  const { loading, user } = useAuth0()

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavBar />
          <p>Work In Progress...</p>
        </header>
        <Switch>
          <Route path="/" exact component={LogIn}/>
          <Route path="/signup" component={SignUp}/>
          <PrivateRoute path="/artistprofile" component={() => <ArtistProfile user={user}  /> } />
          <PrivateRoute path="/external-api" component={ExternalApi} />
          <PrivateRoute path="/artisthome" component={() => <ArtistHome  user={user} /> } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

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

function App() {
  const { loading } = useAuth0()

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
          <PrivateRoute path="/artistprofile" component={ArtistProfile} />
          <PrivateRoute path="/external-api" component={ExternalApi} />
          <PrivateRoute path="/artisthome" component={ArtistHome} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import { useAuth0 } from './react-auth0-wrapper'

import PrivateRoute from './components/PrivateRoute'

import ExternalApi from './components/ExternalApi';
import ArtistHome from './containers/ArtistHome'
import ArtistProfile from './containers/ArtistProfile'
import LogIn from './components/LogIn'
import NavBar from './NavBar/NavBar';

import './style_sheets/App.css';
import SignUp from './components/SignUp';
import Main from './containers/Main'
import BrowseArtists from './containers/BrowseArtists';

function App() {
  const { loading, user } = useAuth0()

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  // if (user) {
  //   return <PrivateRoute path="/home" component={() => <Main user={user} />} />
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact component={LogIn}/>
          <Route path="/signup" component={SignUp}/>
          <PrivateRoute path="/home" component={() => <Main user={user} />} />
          <PrivateRoute path="/artistprofile" component={() => <Main user={user} artistProfile={true} /> } />
          <PrivateRoute path="/external-api" component={ExternalApi} />
          <PrivateRoute path="/artisthome" component={() => <Main user={user} artistHome={true} /> } />
          <PrivateRoute path="/publicprofile" component={() => <Main user={user} publicProfile={true} /> } />
          <PrivateRoute path="/browse-artists" component={() => <Main user={user} browse={true} /> } />
        </Switch>
      </BrowserRouter>
      {/* {user ? <Main user={user} /> : null} */}
    </div>
  );
}

export default App;

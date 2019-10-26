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
import BookerDash from './containers/BookerDash';

function App() {
  const { loading, user } = useAuth0()

  const flagEmails = ["tylermastersonfilm@gmail.com"]

  console.log(user === undefined)

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
      {user !== undefined 
        ? flagEmails.includes(user.email)
          ? <div>
              <header>
                <NavBar booker={true} />
              </header>
              <Switch>
                <Route path="/" exact component={LogIn}/>
                <Route path="/signup" component={SignUp}/>
                <PrivateRoute path="/agentprofile" component={() => <BookerDash user={user} agentProfile={true} /> } />
                <PrivateRoute path="/home" component={() => <BookerDash user={user} agentHome={true} /> } />
                <PrivateRoute path="/publicprofile" component={() => <BookerDash user={user} publicProfile={true} /> } />
                <PrivateRoute path="/browse-artists" component={() => <BookerDash user={user} browse={true} /> } />
              </Switch>
            </div>
          : <><header>
              <NavBar />
            </header>
            <Switch>
              <Route path="/" exact component={LogIn}/>
              <Route path="/signup" component={SignUp}/>
              {/* <PrivateRoute path="/home" component={() => <Main user={user} />} /> */}
              <PrivateRoute path="/artistprofile" component={() => <Main user={user} artistProfile={true} /> } />
              <PrivateRoute path="/home" component={() => <Main user={user} artistHome={true} /> } />
              <PrivateRoute path="/publicprofile" component={() => <Main user={user} publicProfile={true} /> } />
              <PrivateRoute path="/browse-artists" component={() => <Main user={user} browse={true} /> } />
            </Switch></>
      : <><header>
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
        </Switch></>
      }
    </BrowserRouter>
      
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useAuth0 } from './react-auth0-wrapper'

import PrivateRoute from './components/PrivateRoute'
import LogIn from './components/LogIn'
import NavBar from './NavBar/NavBar';
import SignUp from './components/SignUp';
import Main from './containers/Main'
import BookerDash from './containers/BookerDash';

import './style_sheets/App.css';

function App() {
  const { loading, user } = useAuth0()

  const flagEmails = ["tylermastersonfilm@gmail.com"]

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  const AGENTMAIN = (
    <div>
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
        <PrivateRoute path="/venues" component={() => <BookerDash user={user} showVenues={true} /> } />
      </Switch>
    </div>
  )

  const ARTISTMAIN = (
    <>
      <header>
        <NavBar />
      </header>
      <Switch>
        <Route path="/" exact component={LogIn}/>
        <Route path="/signup" component={SignUp}/>
        <PrivateRoute path="/artistprofile" component={() => <Main user={user} artistProfile={true} /> } />
        <PrivateRoute path="/home" component={() => <Main user={user} artistHome={true} /> } />
        <PrivateRoute path="/publicprofile" component={() => <Main user={user} publicProfile={true} /> } />
        <PrivateRoute path="/browse-artists" component={() => <Main user={user} browse={true} /> } />
        <PrivateRoute path="/venues" component={() => <Main user={user} showVenues={true} /> } />
      </Switch>
    </>
  )
  return (
    <div className="App">
      <BrowserRouter>
        {user !== undefined 
          ? flagEmails.includes(user.email)
            ? AGENTMAIN
            : ARTISTMAIN
        : ARTISTMAIN
        }
      </BrowserRouter>
    </div>
  );
}

export default App;

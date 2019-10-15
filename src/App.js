import React from 'react';
import './style_sheets/App.css';
import LogIn from './components/LogIn';
import NavBar from './NavBar/NavBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ArtistHome from './containers/ArtistHome'
import { useAuth0 } from './react-auth0-wrapper'
import PrivateRoute from './components/PrivateRoute'
import ExternalApi from './components/ExternalApi';

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
          {/* <LogIn /> */}
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/artisthome" component={ArtistHome} />
          <PrivateRoute path="/external-api" component={ExternalApi} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

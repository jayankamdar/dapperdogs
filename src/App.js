import React, { Component } from 'react';
import './App.css';
import { UserSession } from 'blockstack'
import Landing from './Landing';
import SignedIn from './SignedIn';
import {appConfig} from './constants'

class App extends Component {
  constructor(props) {
    super(props)
    this.userSession = new UserSession({ appConfig })
  }

  componentDidMount() {
    const session = this.userSession
    if (!session.isUserSignedIn() && session.isSignInPending()) {
      session.handlePendingSignIn()
        .then((userData) => {
          if (!userData.username) {
            throw new Error('This app requires a username.')
          }
          window.location = `/profile`
        })
    }
  }

  render() {
    return (
      <main role="main">
        {this.userSession.isUserSignedIn() ?
          <SignedIn />
          :
          <Landing />
        }
      </main>
    );
  }
}

export default App;

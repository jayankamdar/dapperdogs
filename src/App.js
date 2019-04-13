import React, { Component } from 'react';

import './App.css';
import { UserSession } from 'blockstack'
import UserInfo from './UserInfo';
import Landing from './Landing';
import SignedIn from './SignedIn';

const blockstack = require('blockstack');

class App extends Component {
  constructor(props) {
    super(props)
	this.userSession = new UserSession()
    let isSignedIn = this.checkSignedInStatus();

    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  checkSignedInStatus() {
    if (blockstack.isUserSignedIn()) {
      return true;
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn().then(function(userData) {
        window.location = window.location.origin
      })
      return false;
    }
  }

  handleSignIn(event) {
    event.preventDefault();
    blockstack.redirectToSignIn()
  }

  handleSignOut(event) {
    event.preventDefault();
    blockstack.signUserOut(window.location.href)
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

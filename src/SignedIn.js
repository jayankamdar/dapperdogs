import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { UserSession } from 'blockstack'
import NavBar from './NavBar'
import { appConfig} from './constants'
import './SignedIn.css'
import ProfilePage from './Profile'
import CreatePage from './Create'
import Feed from './Feed'

class SignedIn extends Component {

  constructor(props) {
    super(props)

  	this.userSession = new UserSession({ appConfig })
    this.signOut = this.signOut.bind(this)
  }

  signOut(e) {
    e.preventDefault()
    this.userSession.signUserOut()
    window.location = '/'
  }

  render() {
    const username = this.userSession.loadUserData().username

    return (
      <div className="SignedIn">
        <NavBar username={username} signOut={this.signOut}/>
        <Switch>
                <Route
                  path='/'
                  exact
                  component={Feed}
                />
                <Route
                  path='/profile'
                  component={ProfilePage}
                />
          <Route
          path='/create'
          component={CreatePage}
          />
        </Switch>
      </div>
    );
  }
}

export default SignedIn

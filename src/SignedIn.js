import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { UserSession } from 'blockstack'
import NavBar from './NavBar'
import { appConfig} from './constants'
import './SignedIn.css'
import ProfilePage from './Profile'
import Create from './Create'
import Feed from './Feed'
import Edit from './Edit'

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
                <Redirect exact from='/' to='/feed'/>
                <Route
                  path='/feed'
                  exact
                  component={Feed}
                />
                <Route
                  path='/profile/:username'
                  exact
                  component={ProfilePage}
                />
          <Route
          path='/create'
          component={Create}
          />
          <Route path="/:username/edit" component={Edit}/>
        </Switch>
      </div>
    );
  }
}

export default SignedIn

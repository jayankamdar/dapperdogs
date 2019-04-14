import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { UserSession, Profile } from 'blockstack'
import NavBar from './NavBar'
import Landing from './Landing'
import { appConfig} from './constants'
import './SignedIn.css'
import ProfilePage from './Profile'
import CreatePage from './Create'


class SignedIn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      me: {},
      savingMe: false,
      savingKingdown: false,
      redirectToMe: false
    }

	this.userSession = new UserSession({ appConfig })
    this.loadMe = this.loadMe.bind(this)
    this.saveMe = this.saveMe.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  componentWillMount() {
    this.loadMe()
  }

  loadMe() {
    const options = { decrypt: false }

  }

  saveMe(me) {
    this.setState({me, savingMe: true})
    const options = { encrypt: false }
    .finally(() => {
      this.setState({savingMe: false})
    })
  }

  signOut(e) {
    e.preventDefault()
    this.userSession.signUserOut()
    window.location = '/'
  }

  render() {
    const username = this.userSession.loadUserData().username
    const me = this.state.me
    const redirectToMe = this.state.redirectToMe
    if(redirectToMe) {
      // User hasn't configured her animal
      if(window.location.pathname !== '/me') {
        return (
          <Redirect to="/me" />
        )
      }
    }

    return (
      <div className="SignedIn">
      <NavBar username={username} signOut={this.signOut}/>
      <Switch>
              <Route
                path='/'
                exact
                render={
                  routeProps => <Landing
                  myKingdom={false}
                  protocol={routeProps.match.params.protocol}
                  currentUsername={username}
                  {...routeProps} />
                }
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

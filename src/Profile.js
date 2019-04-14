import React, { Component } from 'react'
import { UserSession } from 'blockstack';
import { appConfig } from './constants';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state ={
            name: ''
        }
        this.userSession = new UserSession({ appConfig })
    }

    componentDidMount(){
        const options = { decrypt: false }
        this.userSession.getFile(this.userSession.loadUserData().username + ".json", options)
        .then((content) => {
            if(content) {
                const data = JSON.parse(content)
                this.setState({name: data.name})
            } else {            
                console.log("Error retrieving user data")
                alert("Error retrieving user data")
            }
        })
    }

    render(){
        return (
            <React.Fragment>
                <h1>Profile Page</h1>
                <h2>{this.state.name}</h2>
            </React.Fragment>
        )
    }
}
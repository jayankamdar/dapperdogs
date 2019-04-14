import React, { Component } from 'react'
import { UserSession } from 'blockstack';
import { appConfig } from './constants';
import { getFile } from 'blockstack';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state ={
            name: '',
            age: '',
            breed: '',
            weight: '',
            // photo: '',
            misc: '',
            // friends: []
        }
        this.userSession = new UserSession({ appConfig })
    }

    componentDidMount(){
		const username = this.userSession.loadUserData.username
        const options = { decrypt: false }
        getFile(`${username}.json`, options)
        .then((content) => {
            if(content) {
                const data = JSON.parse(content)
                this.setState({
                    name: data.name,
                    age: data.age,
                    breed: data.breed,
                    weight: data.weight,
                    // photo: data.photo,
                    misc: data.misc,
                    // friends: data.friends
                })
            } else {
                console.log("Error retrieving user data")
                alert("Error retrieving user data")
            }
        })
    }

    render(){
        return (
            <React.Fragment>
                <h1>Name: {this.state.name}</h1>
                <h2>Age: {this.state.age}</h2>
                <h2>Breed: {this.state.breed}</h2>
                <h2>Weight: {this.state.weight}</h2>
                <h2>Miscellaneous information: {this.state.misc}</h2>
                <button onClick={() => window.location=`/${this.props.match.params.username}/edit`}>Edit profile</button>
            </React.Fragment>
        )
    }
}
import React, { Component } from 'react'
import { isSignInPending, loadUserData, Person, getFile, putFile, lookupProfile } from 'blockstack'
export default class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state ={
            name: ''
        }
    }

    componentDidMount(){
		const username = this.props.username
        const options = { decrypt: false }
        getFile(`${username}.json`, options)
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
                <h2>Name: {JSON.stringify(this.state.name)}</h2>
            </React.Fragment>
        )
    }
}
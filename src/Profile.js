import React, { Component } from 'react'
export default class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state ={
            name: ''
        }
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
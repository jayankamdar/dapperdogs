import React, { Component } from 'react'
export default class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state ={
            data: []
        }
    }

    componentDidMount(){
        const options = { decrypt: false }
        this.userSession.getFile(this.userSession.loadUserData().username + ".json", options)
        .then((content) => {
            if(content) {
                const data = JSON.parse(content)
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
                <h2>{typeof this.state.data}</h2>
            </React.Fragment>
        )
    }
}
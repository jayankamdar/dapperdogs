import React, { Component } from 'react'
import { UserSession } from 'blockstack';
import { appConfig } from './constants';
import { getFile, putFile } from 'blockstack';

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
            bark: "",
            barks: []
        }
        this.userSession = new UserSession({ appConfig })
        this.handleChange= this.handleChange.bind(this)
        this.handleBark = this.handleBark.bind(this)
    }

    componentDidMount(){
		const username = this.userSession.loadUserData().username
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

        getFile('barks.json', options)
        .then(content => {
            if (content){
                this.setState({
                    barks: JSON.parse(content).filter(item => item.id === username)
                })
            }
        })
    }
    
    handleChange(e){
        this.setState({
            bark: e.target.value
        })
    }

    handleBark(e){        
        e.preventDefault
        var barks = [...this.state.barks, {id: this.userSession.loadUserData().username, bark: this.state.bark, date:new Date()}]
        alert(barks.length)
        const options = { encrypt: false }
	    putFile('barks.json', JSON.stringify(barks), options).then(() => {})
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
                <form onSubmit={this.handleBark}>
                    <input type="text" name="bark" value={this.state.status} maxlength="100" onChange={this.handleChange}/><br/>
                    <button type="submit">Post bark</button>
                </form>
                {/* {
                    this.state.barks.reverse().map(bark => 
                        <div className="barK">
                            <h3>{bark.date}</h3>
                            <p>{bark.bark}</p>
                        </div>)
                } */}
                <h1>{this.state.barks.length}</h1>
            </React.Fragment>
        )
    }
}
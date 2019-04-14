import React, { Component } from 'react'
import './Edit.css'
import { getFile, putFile, UserSession } from 'blockstack'
import { appConfig } from './constants'

class Edit extends Component {

  constructor() {
	  super()
    this.state = {
	  id: "",
      name: "",
      age: "",
	  breed: "",
	  weight: "",
	  photo: "",
	  friends: "",
	  misc: ""
	}
	this.userSession = new UserSession({ appConfig })
	this.handleChange = this.handleChange.bind(this)
	this.handleClick = this.handleClick.bind(this)
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
}

  handleChange(e) {
	  this.setState({[e.target.name] : e.target.value})
  }
  
  handleClick(e) {
	  const username = this.userSession.loadUserData().username
    
	  let dogInfo = {
		  id: username,
		  name: this.state.name,
		  age: this.state.age,
		  breed: this.state.breed,
		  weight: this.state.weight,
		  photo: this.state.photo,
		  misc: this.state.misc,
		  friends: this.state.friends
	  }
	  
	  var dogList = {}
	  var dogL = {}
	  
	  const options1 = { decrypt: false }
	  getFile('dogs.json', options1).then((file) => {dogL = JSON.parse(file)
		if (dogL != null) { 
		  dogList = dogL
		}
		dogList[`${username}`] = this.state.name
	  })
	  
	  const options2 = { encrypt: false }
	  putFile('dogs.json', JSON.stringify(dogList), options2).then(() => {})
	  
	  const options3 = { encrypt: false }
      putFile(`${username}.json`, JSON.stringify(dogInfo), options3).then(() => {window.location=`/profile/${username}`})
  }  

  render() {
    return (
      <div className="Edit profile">
      <h2>Edit profile</h2>
      <p>Enter some information about your dog</p>
        <h3>Name</h3>
        <input type="text" name="name" value={this.state.name} maxlength="100" onChange={this.handleChange}/><br/>
        <h3>Age</h3>
        <input type="text" name="age" value={this.state.age} maxlength="100" onChange={this.handleChange}/><br/>
		<h3>Breed</h3>
		<input type="text" name="breed" value={this.state.breed} maxlength="100" onChange={this.handleChange}/><br/>
		<h3>Weight</h3>
		<input type="text" name="weight" value={this.state.weight} maxlength="100" onChange={this.handleChange}/><br/>
		<h3>Miscellaneous information</h3>
		<textarea className="bigText" name="misc" value={this.state.misc} maxlength="100" onChange={this.handleChange}/><br/>
		<h3>Photo</h3>
		<input type="file" name="photo" value="" maxlength="100" /><br/>
		
		<button
		name="submit"
		className="submitBtn"
		onClick={
			this.handleClick
		}
		>Submit
		</button>
	  </div>
    );
  }
}

export default Edit

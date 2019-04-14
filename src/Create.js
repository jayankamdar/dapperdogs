import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import './Create.css'
import { getFile, putFile, UserSession } from 'blockstack'
import { appConfig } from './constants'

class Create extends Component {

  constructor() {
	  super()
    this.state = {
	  id: "",
      dogName: "",
      dogAge: "",
	  dogBreed: "",
	  dogWeight: "",
	  dogPhoto: "",
		dogFriends: "",
		dogMisc: "",
	  isSubmitted: ""
		}
		this.userSession = new UserSession({ appConfig })
	this.handleChange = this.handleChange.bind(this)
	this.handleClick = this.handleClick.bind(this)
  }
  
  handleChange(e) {
	  this.setState({[e.target.name] : e.target.value})
  }
  
  handleClick(e) {
		const username = this.userSession.loadUserData.username
		this.setState({
			id: username
		})
	  
	  let dogInfo = {
		  id: this.state.id,
		  name: this.state.dogName,
		  age: this.state.dogAge,
		  breed: this.state.dogBreed,
		  weight: this.state.dogWeight,
			photo: this.state.dogPhoto,
			misc: this.state.dogMisc,
		  friends: this.state.dogFriends
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
		putFile(`${username}.json`, JSON.stringify(dogInfo), options3).then(() => {window.location='/profile'})
  }  

  render() {
    return (
      <div className="Create profile">
      <h2>Create profile</h2>
      <p>Enter some information about your dog</p>
        <h3>Name</h3>
        <input type="text" name="dogName" value={this.state.dogName} maxlength="100" onChange={this.handleChange}/><br/>
        <h3>Age</h3>
        <input type="text" name="dogAge" value={this.state.dogAge} maxlength="100" onChange={this.handleChange}/><br/>
		<h3>Breed</h3>
		<input type="text" name="dogBreed" value={this.state.dogBreed} maxlength="100" onChange={this.handleChange}/><br/>
		<h3>Weight</h3>
		<input type="text" name="dogWeight" value={this.state.dogWeight} maxlength="100" onChange={this.handleChange}/><br/>
		<h3>Miscellaneous information</h3>
		<textarea className="bigText" name="dogMisc" value={this.state.dogMisc} maxlength="100" onChange={this.handleChange}/><br/>
		<h3>Photo</h3>
		<input type="file" name="dogPhoto" value="" maxlength="100" /><br/>
		
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

export default Create

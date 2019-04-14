import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './CreateProfile.css'

class CreateProfile extends Component {

  constructor() {
	  super()
    this.state = {
      selectedName: false,
      selectedAge: false,
	  selectedBreed: false,
	  selectedPhoto: false
    }
  }

  render() {
    let dogName = null
    let dogAge = null
	let dogBreed = null
	let dogPhoto = null

    return (
      <div className="Create profile">
      <h2>Create profile</h2>
      <p>Enter some information about your dog</p>
        <h3>Name</h3>
        <input type="text" name="dogName" value="" maxlength="100" /><br/>
        <h3>Age</h3>
        <input type="text" name="dogAge" value="" maxlength="100" /><br/>
		<h3>Breed</h3>
		<input type="text" name="dogBreed" value="" maxlength="100" /><br/>
		<h3>Weight</h3>
		<input type="text" name="dogWeight" value="" maxlength="100" /><br/>
		<h3>Miscellaneous information</h3>
		<input type="text" className="bigText" name="dogBreed" value="" maxlength="100" /><br/>
		<h3>Photo</h3>
		<input type="file" name="dogPhoto" value="" maxlength="100" /><br/>
		
        
	  </div>
    );
  }
}

export default CreateProfile

import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import './Create.css'
import { getFile, putFile, UserSession } from 'blockstack'
import { appConfig } from './constants'

var photoURL = "";

class Create extends Component {

	constructor() {
		super()
		this.state = {
			id: "",
      dogName: "",
      dogAge: "",
			dogBreed: "",
			dogWeight: "",
			dogPhotoOrig: null,
			dogPhoto: "",
			dogFriends: "",
			dogMisc: "",
			isSubmitted: ""
		}
		this.userSession = new UserSession({ appConfig })
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.openFile = this.openFile.bind(this)
  }
  
  handleChange(e) {
	  this.setState({[e.target.name] : e.target.value})
  }
  
  handleClick(e) {
		const username = this.userSession.loadUserData().username
		this.setState({
			id: username
		})

		let dogInfo = {
			id: this.state.id,
			name: this.state.dogName,
			age: this.state.dogAge,
			breed: this.state.dogBreed,
			weight: this.state.dogWeight,
		  photo: photoURL,
			misc: this.state.dogMisc,
		  friends: this.state.dogFriends
	  }
	  
	  var dogList = []
	  // var dogL = []
	  
	  const options1 = { decrypt: false }
		getFile('dogs.json', options1).then((file) =>	dogList = [...JSON.parse(file), {id: this.state.id}])
	  
	  const options2 = { encrypt: false }
	  putFile('dogs.json', JSON.stringify(dogList), options2).then(() => {})
	  
	  const options3 = { encrypt: false }
		putFile(`${username}.json`, JSON.stringify(dogInfo), options3).then(() => {window.location=`/profile/${username}`})
	}  
	
	openFile = function(event) {
		var input = event.target;
	
		var reader = new FileReader();
		
		reader.onload = function(){
			var dataURL = reader.result;
			var output = document.getElementById('output');
			output.src = dataURL;
			
			photoURL = dataURL;
	
		};
				
		reader.readAsDataURL(input.files[0]);
	};

	render() {
		return (
			<div className="Create profile">
				<h2>Create profile</h2>
				<p>Enter some information about your dog</p>
				<h3>Name</h3>
				<input type="text" name="dogName" value={this.state.dogName} maxlength="100" onChange={this.handleChange} /><br />
				<h3>Age</h3>
				<input type="text" name="dogAge" value={this.state.dogAge} maxlength="100" onChange={this.handleChange} /><br />
				<h3>Breed</h3>
				<input type="text" name="dogBreed" value={this.state.dogBreed} maxlength="100" onChange={this.handleChange} /><br />
				<h3>Weight</h3>
				<input type="text" name="dogWeight" value={this.state.dogWeight} maxlength="100" onChange={this.handleChange} /><br />
				<h3>Miscellaneous information</h3>
				<textarea className="bigText" name="dogMisc" value={this.state.dogMisc} maxlength="100" onChange={this.handleChange} /><br />
				<h3>Photo</h3>
				<input type="file" accept="image/*" name="dogPhotoOrig" value={this.state.dogPhotoOrig} maxlength="100" onChange={this.openFile}/><br/>
				<img id='output' alt="Avatar" height="100px" width="100px"/>
				<br></br>
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

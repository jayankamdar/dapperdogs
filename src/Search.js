import React, { Component } from 'react'
import {getFile} from 'blockstack'
import memoize from 'memoize-one'

export default class Search extends Component{
    constructor(props){
        super(props)

        this.state = {
            user: '',
            results: [],
            filtered: []
        }

        this.handleChange = this.handleChange.bind(this)
    }  

    componentDidMount(){
        const options = { decrypt: false }
        getFile("dogs.json", options)
        .then((content) => {
            if(content) {
                const data = JSON.parse(content)
                this.setState({
                    results: data
                })
            } else {
                console.log("Error retrieving user data")
                alert("Error retrieving user data")
            }
        })
    }

    filter = memoize(
        (list, filterText) => list.map(dog => dog.id).filter(username => username.toLowerCase().includes(filterText.toLowerCase()))
    )

    handleChange(e){
        if (e.target.value !== ''){
            this.setState({
                user: e.target.value,
                filtered: this.filter(this.state.results, e.target.value)
            })
        }
        else{
            this.setState({
                user: e.target.value,
                filtered: []
            })
        }
    }

    getUserData(username){
        const options = { decrypt: false }
        var data = {}
        getFile(`${username}.json`, options)
        .then((content) => {
            if(content) {
                data = JSON.parse(content)
            } else {
                console.log("Error retrieving user data")
                alert("Error retrieving user data")
            }
        })
        return(
            <ul>
               <li>{data.name}</li>
               <li>{data.age}</li>
               <li>{data.breed}</li>
           </ul>
       )
    }

    render(){
        return(
            <React.Fragment>
                <input type="text" name="user" value={this.state.user} maxlength="100" onChange={this.handleChange}/><br/>
                {/* {this.state.filtered.map(username => this.getUserData(username))} */}
                <h1>{this.state.results.length}</h1>
            </React.Fragment>
            
        )
    }
}
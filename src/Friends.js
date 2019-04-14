import React, { Component } from 'react'
import sami from './images/IMG-20180707-WA0000.jpg'
import odie from './images/Snapchat-1815374910.jpg'
import fat from './images/fat.jpg'

export default class Friends extends Component{


    render(){
        return(
            <React.Fragment>
                <img src={sami} width="220" height="260"/>
                <h2>Name: Sami Rao</h2>
                <h3>Age: 2</h3>
                <h3>Breed: Golden Doodle</h3> 
                <h3>Miscellaneous: "I love ricotta cheese!"</h3>
                <button>View profile</button>
                <br/>
                <br />
                <img src={odie} width="220" height="260"/>
                <h2>Name: Odie Mattingly</h2>
                <h3>Age: 14</h3>
                <h3>Breed: Cockapoo</h3>
                <h3>Miscellaneous: "Grey is my favorite color."</h3>
                <button>View profile</button>
                <br />
                <br />
                <img src={fat} width="220" height="260"/>
                <h2>Name: Cobi Lee</h2>
                <h3>Age: 12</h3>
                <h3>Breed: Labrador</h3>
                <h3>Miscellaneous: "zzZzzZzz"</h3>
            </React.Fragment>
        )
    }
}
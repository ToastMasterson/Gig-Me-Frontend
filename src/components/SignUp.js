import React, {Component} from 'react'
import { useAuth0 } from '../react-auth0-wrapper'
import { Redirect } from 'react-router-dom'
import '../style_sheets/SignUp.css'
require('dotenv').config()

class SignUp extends Component {

    state = {
        signedUp: false,
        username: "",
        email: "",
        password: "",
        artistName: "",
        artistId: 0,
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.createUser()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createUser = async () => {
        await fetch('http://localhost:3001/api/artists', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                "username": this.state.username.toLowerCase(),
                "email": this.state.email,
                "artist_name": this.state.artistName
            })
        }).then(res => res.json()).then((data) => this.signUp(data.id))
    }

    signUp = (artistId) => {
        fetch('https://gig-me.auth0.com/dbconnections/signup', {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Host":"gig-me.auth0.com"
            },
            body: JSON.stringify({
                clientId: "004I2FioPFIxgC0HJocX1VruscVQ5pYq",
                connection: "GigMeSignup",
                username: this.state.username.toLowerCase(),
                password: this.state.password,
                email: this.state.email,
                members: "",
                gear: "",
                user_metadata: {
                    artist_id: artistId.toString()
                }
            })
        }).then(res => res.json())
        .then(window.location.href = "http://localhost:3000/").catch(err => console.log(err))
    }


    render(){
        return (
            <div className="signup-div">
                <form onSubmit={(event) => this.handleSubmit(event)} id="signup">
                    <fieldset>
                        <legend>Sign up</legend>
                        <p>
                        <input 
                            type="username" 
                            onChange={this.handleChange} 
                            name="username" 
                            id="signup-username" 
                            placeholder="Username" 
                            required/>
                        </p>
                        <p>
                        <input 
                            type="email" 
                            onChange={this.handleChange} 
                            name="email" 
                            id="signup-email" 
                            placeholder="Email" 
                            required/>
                        </p>
                        <p>
                        <input 
                            type="password" 
                            onChange={this.handleChange} 
                            name="password" 
                            id="signup-password" 
                            placeholder="Password"
                            required/>
                        </p>
                        <p>
                        <input 
                            type="artist-name" 
                            onChange={this.handleChange} 
                            name="artistName" 
                            id="artist-name" 
                            placeholder="Artist Name" 
                            required/>
                        </p>
                        <input type="submit" value="Sign up"/>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default SignUp
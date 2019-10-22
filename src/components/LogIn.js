import React from 'react'
import { useAuth0 } from '../react-auth0-wrapper'
import { withRouter, Redirect } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'

import '../style_sheets/LogIn.css'

const LogIn = () => {
    const { isAuthenticated, user } = useAuth0()

    var options = {
        theme: {
            logo: 'https://i.imgur.com/mQWWPgC.png',
            primaryColor: '#2975a6'
        },
        auth: {
            redirectUrl: 'http://localhost:3000/home',
            responseType: 'token',
        },
        scope: "openid user_metadata",
        allowedConnections: ['GigMeSignup'],
        allowShowPassword: true,
        autofocus: true,
        
        allowSignUp: false
    }
    var lock = new Auth0Lock(
        '004I2FioPFIxgC0HJocX1VruscVQ5pYq',
        'gig-me.auth0.com', options
    )

    const Button = withRouter(({history}) => (
        <button
            className="button" 
            onClick={() => {history.push('/signup')}}>
            Sign Up
        </button>
    ))

    return (isAuthenticated
        ?   <Redirect to="/home"/>
        :   <div className="log-in">
                <div className="headers">
                    <h4>Welcome To</h4>
                    <img className="login-logo" src="https://i.imgur.com/mQWWPgC.png" alt="logo" />
                </div>
                <div className="choices">
                    <button 
                    className="button"
                        onClick={() => lock.show()}
                    >
                        Log In
                    </button>
                    Or
                    <Button />
                </div>
            </div>
    )
}

export default LogIn
import React from 'react'
import { useAuth0 } from '../react-auth0-wrapper'
import { Redirect } from 'react-router-dom'
import '../style_sheets/LogIn.css'

const LogIn = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0()

    return (isAuthenticated
        ?   <Redirect to="/artisthome"/>
        :   <div className="log-in">
                <div className="headers">
                    <h4>Welcome To</h4>
                    <h1>Gig-Me</h1>
                </div>
                    <button 
                    className="button"
                        onClick={() => loginWithRedirect({})}
                    >
                        Get Started
                    </button>
            </div>
    )
}

export default LogIn
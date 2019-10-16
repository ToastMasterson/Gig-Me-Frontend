import React from 'react'
import { useAuth0 } from '../react-auth0-wrapper'
import {Link, Redirect} from 'react-router-dom'
import '../style_sheets/NavBar.css'

const NavBar = () => {
    const { isAuthenticated, logout, user } = useAuth0()

    return(
        <div className="nav-bar">
            {!isAuthenticated && (
                <Redirect to="/" />
            )}
            <div className="logo-and-links">
                {isAuthenticated && (<img className="nav-logo" src="https://i.imgur.com/mQWWPgC.png" alt="GigMe" />)}
                {isAuthenticated && (
                    <span>
                    <Link to ="/artisthome">Home</Link>
                    <Link to="/artistprofile">Profile</Link>
                    <Link to="/venues">Venues</Link>
                    <Link to="/browse-artists">Artists</Link>
                    <Link to="/browse-agents">Booking</Link>
                    {/* Links to Venues, Top Artists? Artists, Agents */}
                    <Link to="/external-api">External API</Link>
                    </span>
                )}
            </div>
            <div className="thumbnail">
            {isAuthenticated && (<button onClick={() => logout()}>Log out</button>)}
            {isAuthenticated && (
                <Link to ="/artistprofile">
                    <img className="nav-profile-image" src={user.picture} alt="thumbnail"/>
                </Link>)}
            </div>
        </div>
    )
}

export default NavBar
import React from 'react'
import { useAuth0 } from '../react-auth0-wrapper'
import {Link, Redirect} from 'react-router-dom'
import {withRouter} from 'react-router'
import '../style_sheets/NavBar.css'

const NavBar = (props) => {
    const { isAuthenticated, logout, user } = useAuth0()

    return(
        <div className="nav-bar">
            {!isAuthenticated && (
                <Redirect to="/" />
            )}
            {props.booker
            ? <>
                <div className="logo-and-links">
                    {isAuthenticated && (<img className="nav-logo" src="https://i.imgur.com/mQWWPgC.png" alt="GigMe" />)}
                    {isAuthenticated && (
                        <span>
                            <Link to ="/home">Home</Link>
                            <Link to="/venues">Venues</Link>
                            <Link to="/browse-artists">Artists</Link>
                            <Link to="/browse-agents">Booking</Link>
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
            </>
            : <>
                <div className="logo-and-links">
                    {isAuthenticated && (<img className="nav-logo" src="https://i.imgur.com/mQWWPgC.png" alt="GigMe" />)}
                    {isAuthenticated && (
                        <span>
                            <Link to ="/home">Home</Link>
                            <Link to="/publicprofile">Profile</Link>
                            <Link to="/venues">Venues</Link>
                            <Link to="/browse-artists">Artists</Link>
                            <Link to="/browse-agents">Booking</Link>
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
            </>
            }
        </div>
    )
}

export default withRouter(NavBar)
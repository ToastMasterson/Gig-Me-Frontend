import React, { Fragment } from 'react'
import '../style_sheets/PublicProfile.css'
import { withRouter } from 'react-router-dom'

const ArtistProfile = ({artist, profile, user}) => {

    const renderSocial = () => (
        <div className="social">
            {profile.facebook !== ""
                ? <a href={profile.facebook} target="_blank" rel="noopener noreferrer" >
                    <img className="icon" src="http://icons.iconarchive.com/icons/danleech/simple/256/facebook-icon.png" alt="icon" />
                </a>
                : null
            }
            {profile.instagram !== ""
                ? <a href={profile.instagram} target="_blank" rel="noopener noreferrer" >
                    <img className="icon" src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png" alt="icon" />
                </a>
                : null
            }
            {profile.bandcamp !== ""
                ? <a href={profile.bandcamp} target="_blank" rel="noopener noreferrer" >
                    <img className="icon" src="https://i.pinimg.com/originals/78/c6/d8/78c6d839394ec3e17cbe8696fc8dcfd8.png" alt="icon" />
                </a>
                : null
            }
            {profile.soundcloud !== ""
                ? <a href={profile.soundcloud} target="_blank" rel="noopener noreferrer" >
                    <img className="icon" src="https://i1.sndcdn.com/avatars-000681921569-32qkcn-t500x500.jpg" alt="icon" />
                </a>
                : null
            }
        </div>
    )

    function checkUser() {
        return user
            ? user.nickname === artist.username
                ? <EditButton></EditButton>
                : null
            : null
    }

    const EditButton = withRouter(({history}) => (
        <button className="edit-button" onClick={() => {history.push('/artistprofile')}}>
            Edit Profile
        </button>
    ))

    const renderEvents = () => {
        return artist.events.map(event => (
            <div className="event-card" key={event.title}>
                <div className="event-card-image" style={{backgroundImage: `url(${event.flyer})`}}></div>
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-date">{event.date}</p>
            </div>
        ))
    }

    return(
        <Fragment>
            <div className="profile">
                <div className="info">
                    <img className="public-avatar" src={profile.avatar} alt="profile" />
                    <h3>Social Media:</h3>
                    {renderSocial()}
                    <h3 className="info-header">Summary:</h3>
                    <p>{profile.summary}</p>
                    <h3 className="info-header">Contact:</h3>
                    <p>{artist.email}</p>
                    <h3 className="info-header">Influences:</h3>
                    <p>{profile.influences}</p>
                </div>
                <div className="middle">
                    <div className="header">
                        <div className="public-banner" style={{backgroundImage: `url(${profile.banner})`}} >
                            <h1 className="band-name">{artist.artist_name}</h1>
                        </div>
                    </div>
                    <div className="events">
                        <h2>Upcoming Events</h2>
                        <div className="upcoming-events">
                            {renderEvents()}
                        </div>
                    </div>
                </div>
                <div className="info">
                    {checkUser()}
                    <h3>Members:</h3>
                    <p>{profile.members}</p>
                    <h3>Gear:</h3>
                    <p>{profile.gear}</p>
                    <h3>Genres:</h3>
                    <p>{profile.genres}</p>
                </div>
            </div>
        </Fragment>
    )
}

export default ArtistProfile
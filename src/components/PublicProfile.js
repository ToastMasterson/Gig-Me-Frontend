import React, { Fragment } from 'react'
import '../style_sheets/PublicProfile.css'

const ArtistProfile = ({artist, profile, user}) => {

    const renderSocial = () => (
        <div className="social">
            {profile.facebook !== ""
                ? <a href={profile.facebook} target="_blank">
                    <img className="icon" src="http://icons.iconarchive.com/icons/danleech/simple/256/facebook-icon.png" />
                </a>
                : null
            }
            {profile.instagram !== ""
                ? <a href={profile.instagram} target="_blank">
                    <img className="icon" src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png" />
                </a>
                : null
            }
            {profile.bandcamp !== ""
                ? <a href={profile.bandcamp} target="_blank">
                    <img className="icon" src="https://i.pinimg.com/originals/78/c6/d8/78c6d839394ec3e17cbe8696fc8dcfd8.png" />
                </a>
                : null
            }
            {profile.soundcloud !== ""
                ? <a href={profile.soundcloud} target="_blank">
                    <img className="icon" src="https://i1.sndcdn.com/avatars-000681921569-32qkcn-t500x500.jpg" />
                </a>
                : null
            }
        </div>
    )

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
                        <div>
                            <h2>Upcoming Events</h2>
                        </div>
                        <div>
                            <div>
                                <p>SomeEvent</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="info">
                    {user.nickname === artist.username
                    ? <button className="edit-button">Edit Profile</button>
                    : null
                    }
                    <h3>Members:</h3>
                    <p>{profile.members}</p>
                    <h3>Gear:</h3>
                    <p>{profile.influences}</p>
                </div>
            </div>
        </Fragment>
    )
}

export default ArtistProfile
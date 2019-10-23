import React from 'react'
import '../style_sheets/Event.css'

const Event = ({event}) => {

    const renderArtists = () => {
        console.log(event.artists)
        return event.artists.map(artist => (
            <div key={artist.artist_name}>
                {artist.artist_name}
            </div>
        ))
    }

    const renderComments = () => {
        console.log()
    }

    return(
        <div className="event-main">
            <div className="event-left-info">
                <div className="event-booker">
                    <h3>Booking Agent:</h3>
                    <img className="booker-avatar" src={event.booker.avatar} alt="avatar" />
                    
                        <h3>{event.booker.first_name} {event.booker.last_name}</h3>
                    
                </div>
                <div className="event-bands">
                    <h3>Line Up:</h3>
                    {renderArtists()}
                </div>
                <h3>Description:</h3>
                    <div>
                        <span>{event.description}</span>
                    </div>
            </div>
            <div className="event-header">
                <h1>{event.title}</h1>
                <div>
                    <h2>Comments:</h2>
                    {event.soundcheck}
                    {renderComments()}
                </div>
            </div>
            <div className="event-right-info">
                <img className="flyer" src={event.flyer} alt="flyer"/>
                <div className="event-details">
                    <h3>Venue:</h3>
                    
                        <span>{event.venue.name}</span>
                    
                    <h3>Date:</h3>
                    
                        <span>{event.date}</span>
                    
                    <h3>Time:</h3>
                    
                        <span>{event.time}</span>
                    
                </div>
            </div>
        </div>
    )
}

export default Event
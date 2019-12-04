import React from 'react'

import '../style_sheets/Event.css'

const Event = ({event, artist}) => {

    const checkArtist = () => {
        let isArtist = false
        event.artists.forEach(a => {
            if(a.id === artist[0].id){
                return isArtist = true
            }
            else { return isArtist = false}
        })
        return isArtist
    }

    const splitDate = () => {
        let splitDate = event.date.split('T')
        return splitDate[0]
    }

    const renderArtists = () => {
        return event.artists.map(artist => (
            <div key={artist.artist_name}>
                {artist.artist_name}
            </div>
        ))
    }

    const renderComments = () => {
        //comment divs
    }

    const handleRequest = () => {
        fetch(`http://localhost:3001/api/events/${event.id}/request`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                artist_id: artist[0].id,
                booker_id: event.booker.id,
                event_id: event.id,
                message: `${artist[0].artist_name} wants to be added to ${event.title}`
            })
        }).then(res => res.json())
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
                    {artist
                        ? checkArtist()
                            ? null
                            : <button onClick={handleRequest}>Request to be put on this event</button>
                        : null
                    }
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
                    SoundCheck: {event.soundcheck}
                    {renderComments()}
                </div>
            </div>
            <div className="event-right-info">
                <img className="flyer" src={event.flyer} alt="flyer"/>
                <div className="event-details">
                    <h3>Venue:</h3>
                    <span>{event.venue.name}</span>
                    <h3>Date:</h3>
                    <span>{splitDate()}</span>
                    <h3>Time:</h3>
                    <span>{event.time}</span>
                </div>
            </div>
        </div>
    )
}

export default Event
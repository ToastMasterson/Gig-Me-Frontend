import React, { Component } from 'react'
import '../style_sheets/Venues.css'

class Venues extends Component {

    state = {
        venueName: ""
    }

    renderVenues = () => {
        return this.props.venues.map(venue => (
            <div className="venue-card" key={venue.id} onClick={() => this.props.visitVenue(venue)}>
                <img className="venue-card-image" src={venue.image} alt="venue" />
                <h3 className="venue-card-name">{venue.name}</h3>
                <h3 className="venue-card-location">{venue.location}</h3>
            </div>
        ))
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render(){
        return(
            <div className="venue-browser">
                <h1>Venues</h1>
                        <div>
                            <label htmlFor="genre">Filter by Name:</label>
                            <input onChange={this.handleChange} name="venueName" type="text" placeholder="Enter a name"/>
                        </div>
                <div className="venue-spread">
                    {this.renderVenues()}
                </div>
            </div>
        )
    }
}

export default Venues
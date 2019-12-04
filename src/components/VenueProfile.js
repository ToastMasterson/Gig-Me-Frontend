import React, {Component} from 'react'
import '../style_sheets/Venue.css'

class VenueProfile extends Component {

    state = {
        stage: false
    }

    splitDate = (date) => {
        let splitDate = date.split('T')
        return splitDate[0]
    }

    handleStage = () => {
        this.state.stage
            ? this.setState({stage: false})
            : this.setState({stage: true})
    }

    renderEvents = () => {
        return this.props.venue.events.map(event => (
            <div onClick={() => this.props.handleEventClick(event.id)} className="event-card" key={event.title}>
                <div className="event-card-image" style={{backgroundImage: `url(${event.flyer})`}}></div>
                <h4 className="event-card-title">{event.title}</h4>
                <p className="event-card-date">{this.splitDate(event.date)}</p>
            </div>
        ))
    }

    render(){
        return(
            <div className="venue-profile">
                <div className="venue-info">
                        <img className="venue-image" src={this.props.venue.image} alt="venue" />
                        <h3 className="venue-info-header">Location:</h3>
                        <p>{this.props.venue.location}</p>
                        <h3 className="venue-info-header">Hours:</h3>
                        <p>{this.props.venue.hours}</p>
                        <h3 className="stage-header" onClick={this.handleStage}>Stage</h3>
                </div>
                <div className="venue-middle">
                    {this.state.stage
                        ? <div className="modal">
                            <img className="stage" src={this.props.venue.stage} alt="stage"/>
                        </div>
                        : <><div className="venue-header">
                            <div className="venue-banner" >
                                <h1 className="venue-name">{this.props.venue.name}</h1>
                            </div>
                        </div>
                        <div className="venue-events">
                            <h2>Upcoming Events</h2>
                            <div className="venue-upcoming-events">
                                {this.renderEvents()}
                            </div>
                        </div></>
                    }
                </div>
            </div>
        )
    }
}

export default VenueProfile
import React, { Fragment, Component } from 'react'
import '../style_sheets/ArtistHome.css'
import '../style_sheets/BookerDash.css'
import CreateEvent from '../components/forms/CreateEvent'
import BrowseArtists from './BrowseArtists'
import PublicProfile from '../components/PublicProfile'
import Event from '../components/Event'
import Venues from '../components/Venues'
import VenueProfile from '../components/VenueProfile'

class BookerDash extends Component {

    state = {
        booker: {},
        events: [],
        venues: [],
        requests: [],
        yourEvents: [],
        loading: false,
        showYourEvents: true,
        showAllEvents: false,
        showRequests: false,
        showForm: false,
        browse: this.props.browse,
        visitProfile: false,
        profileToVisit: {},
        visitEvent: false,
        eventToVisit: {},
        showVenues: this.props.showVenues,
        visitVenue: false,
        venueToVisit: {}
    }
    
    async componentDidMount() {
        await fetch(`http://localhost:3001/api/bookers/${this.props.user.email}`)
            .then(res => res.json())
            .then(booker => this.setState({booker: booker}))
        await fetch(`http://localhost:3001/api/events`)
            .then(res => res.json())
            .then(events => this.setState({
                events: events, 
                yourEvents: events.filter(event => event.booker_id === this.state.booker[0].id), 
                })
            )
        await fetch('http://localhost:3001/api/venues')
            .then(res => res.json())
            .then(venues => this.setState({ venues: venues })
            )
        await fetch(`http://localhost:3001/api/bookers/${this.state.booker[0].id}/requests`)
            .then(res => res.json())
            .then(requests => this.setState({requests: requests, loading: true}))
    }

    componentWillReceiveProps() {
        this.setState({browse: this.props.browse, showVenues: this.props.showVenues, visitEvent: false})
    }

    visitProfile = (artist) => {
        this.setState({visitProfile: true, profileToVisit: artist, showYourEvents: false, browse: false})
    }

    visitVenue = (venue) => {
        this.setState({venueToVisit: venue, visitVenue: true, showVenues: false})
    }

    splitDate = (date) => {
        let splitDate = date.split('T')
        return splitDate[0]
    }

    handleYourEvents = () => {
        this.setState({showYourEvents: true, 
            showAllEvents: false, 
            showRequests: false, 
            showForm: false, 
            browse: false, 
            visitProfile: false, 
            visitEvent: false
        })
    }
    handleAllEvents = () => {
        this.setState({showYourEvents: false, 
            showAllEvents: true, 
            showRequests: false, 
            showForm: false, 
            browse: false, 
            visitProfile: false, 
            visitEvent: false
        })
    }
    handleRequests = () => {
        this.setState({showYourEvents: false, 
            showAllEvents: false, 
            showRequests: true, 
            showForm: false, 
            browse: false, 
            visitProfile: false, 
            visitEvent: false
        })
    }
    handleCreateEvent = () => {
        this.setState({showForm: true, 
            showYourEvents: false, 
            showAllEvents: false, 
            showRequests: false, 
            browse: false, 
            visitProfile: false, 
            visitEvent: false
        })
    }
    handleEventClick = (id) => {
        this.setState({visitEvent: true, 
            eventToVisit: this.state.events.filter(event => event.id === id), 
            showYourEvents: false, 
            showAllEvents: false,
            showVenues: false,
            visitVenue: false
        })
    }

    handleAccept = async (pending) => {
        await fetch(`http://localhost:3001/api/events/${pending.event[0].id}/addArtist`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                artist_id: pending.artist_id
            })
        }).then(res => res.json())
            .then(this.setState({requests: this.state.requests.filter(request => request.id !== pending.id)}))
    }

    handleDeny = async (pending) => {
        await fetch(`http://localhost:3001/api/requests/${pending.id}`, {
            method: "DELETE",
            headers: {"Content-Type":"application/json"},
        }).then(res => res.json())
            .then(this.setState({requests: this.state.requests.filter(request => request.id !== pending.id)}))
    }

    handleDeleteEvent = (id) => {
        console.log("here")
        fetch(`http://localhost:3001/api/events/${id}`, {
            method: "DELETE",
            headers: {"Content-Type":"application/json"}
        }).then(res => res.json()).then(message => console.log(message))
    }

    renderYourEvents = () => {
        return this.state.yourEvents.map(event => (
            <div className="event-card" key={event.title}>
                <div className="event-card-image" style={{backgroundImage: `url(${event.flyer})`}}></div>
                <h4 className="event-card-title">{event.title}</h4>
                <p className="event-card-date">{event.venue.name}</p>
                <p className="event-card-date">{this.splitDate(event.date)}</p>
                <button className="event-card-button" onClick={() => this.handleEventClick(event.id)}>View Event</button>
                <button className="event-card-button" onClick={() => this.handleDeleteEvent(event.id)}>Delete</button>
            </div>
        ))
    }

    renderEvents = () => {
        return this.state.events.map(event => (
            <div onClick={() => this.handleEventClick(event.id)} className="event-card" key={event.title}>
                <div className="event-card-image" style={{backgroundImage: `url(${event.flyer})`}}></div>
                <h4 className="event-card-title">{event.title}</h4>
                <p className="event-card-date">{this.splitDate(event.date)}</p>
            </div>
        ))
    }

    renderRequests = () => {
        return this.state.requests.map(request => (
            <div className="request-card">
                <div className="request-card-image" style={{backgroundImage: `url(${request.event[0].flyer})`}}></div>
                <h3>{request.artist.artist_name}</h3>
                <p>{request.message}</p>
                <button onClick={() => this.handleAccept(request)} className="accept-button">Accept</button>
                <button onClick={() => this.handleDeny(request)} className="deny-button">Deny</button>
            </div>
        ))
    }

    render(){
        return(
            <Fragment>
               {this.state.loading
                    ? <div className="dashboard">
                        <div className="dashboard-nav">
                            <img className="nav-avatar" src={this.state.booker[0].avatar} alt="avatar"/>
                            <h2>{this.state.booker[0].first_name} {this.state.booker[0].last_name}</h2>
                            <h3 className="info-select" onClick={this.handleYourEvents}>Your Events</h3>
                            <h3 className="info-select" onClick={this.handleAllEvents}>All Events</h3>
                            <h3 className="info-select" onClick={this.handleRequests}>Requests</h3>
                            <button className="create-button" onClick={this.handleCreateEvent}>Create Event</button>
                        </div>
                        <div className="display">
                            {this.state.browse
                                ? <BrowseArtists visitProfile={this.visitProfile} />
                                : this.state.showVenues
                                    ? <Venues visitVenue={this.visitVenue} venues={this.state.venues} />
                                    : this.state.visitVenue
                                        ? <VenueProfile handleEventClick={this.handleEventClick} venue={this.state.venueToVisit} />
                                        : this.state.visitProfile
                                            ? <PublicProfile 
                                                artist={this.state.profileToVisit} 
                                                profile={this.state.profileToVisit.artist_profile} 
                                                />
                                            : this.state.visitEvent
                                                ? <Event event={this.state.eventToVisit[0]}/>
                                                :<>
                                                    {this.state.showYourEvents
                                                        ? <div className="events-container">
                                                            <div className="events-header">
                                                                <h1 className="header-text">Your Events</h1>
                                                            </div>
                                                            <div className="card-container">
                                                                {this.renderYourEvents()}
                                                            </div>
                                                        </div>
                                                        : null
                                                    }
                                                    {this.state.showAllEvents
                                                        ? <div className="events-container">
                                                            <div className="events-header">
                                                                <h1 className="header-text">All Events</h1>
                                                            </div>
                                                            <div className="card-container">
                                                                {this.renderEvents()}
                                                            </div>
                                                        </div>
                                                        : null
                                                    }
                                                    {this.state.showRequests
                                                        ? <div className="events-container">
                                                            <div className="events-header">
                                                                <h1 className="header-text">Your Requests</h1>
                                                            </div>
                                                            <div className="card-container">
                                                                {this.renderRequests()}
                                                            </div>
                                                        </div>
                                                        : null
                                                    }
                                                    {this.state.showForm
                                                        ? <CreateEvent 
                                                            bookerId={this.state.booker[0].id} 
                                                            handleYourEvents={this.handleYourEvents} 
                                                            venues={this.state.venues} />
                                                        : null
                                                    }
                                                </>
                            }
                        </div>
                    </div> 
                    : <div>Loading...</div>
                } 
            </Fragment>
        )
    }
}

export default BookerDash
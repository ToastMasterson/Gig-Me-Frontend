import React, { Fragment, Component } from 'react'
import '../style_sheets/ArtistHome.css'

class ArtistHome extends Component {

    constructor(props){
        super(props)
        this.state = {
            artist: {},
            events: [],
            yourEvents: [],
            requests: [],
            loading: false,
            showYourEvents: true,
            showAllEvents: false,
            showRequests: false,
            yours: false
        }
    }

    async componentDidMount() {
        await fetch(`http://localhost:3001/api/artists/${this.props.artist[0].id}/requests`)
        .then(res => res.json()).then(requests => this.setState({requests: requests}))
        await this.setState({
            artist: this.props.artist, 
            events: this.props.events, 
            yourEvents: this.props.artist[0].events,
            loading: true})
    }

    handleClick = (id) => {
        console.log(this.state.artist[0].artist_profile.avatar)
    }

    handleEventClick = (id) => {
        this.props.visitEvent(id)
    }

    handleYourEvents = () => {
        this.setState({showYourEvents: true, showAllEvents: false, showRequests: false})
    }
    handleAllEvents = () => {
        this.setState({showYourEvents: false, showAllEvents: true, showRequests: false})
    }
    handleRequests = () => {
        this.setState({showYourEvents: false, showAllEvents: false, showRequests: true})
    }

    renderYourEvents = () => {
        return this.state.yourEvents.map(event => (
            <div onClick={() => this.handleEventClick(event.id)} className="event-card" key={event.title}>
                <div className="event-card-image" style={{backgroundImage: `url(${event.flyer})`}}></div>
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-date">{event.date}</p>
            </div>
        ))
    }

    renderEvents = () => {
        return this.state.events.map(event => (
            <div onClick={() => this.handleEventClick(event.id)} className="event-card" key={event.title}>
                <div className="event-card-image" style={{backgroundImage: `url(${event.flyer})`}}></div>
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-date">{event.date}</p>
            </div>
        ))
    }

    renderRequests = () => {
        this.state.requests.map(request => {
            console.log(request.event)
        })
        return this.state.requests.map(request => (
            <div className="request-card">
                <div className="request-card-image" style={{backgroundImage: `url(${request.event[0].flyer})`}}></div>
                <h3>{request.booker.first_name}{request.booker.last_name}</h3>
                <p>{request.message}</p>
            </div>
        ))
    }

    render(){
        return(
            <Fragment>
                
               {this.state.loading
                ? <div className="dashboard">
                    <div className="dashboard-nav">
                        <img className="nav-avatar" src={this.state.artist[0].artist_profile.avatar} alt="avatar"/>
                        <h2>{this.state.artist[0].artist_name}</h2>
                        <h3 className="info-select" onClick={this.handleYourEvents}>Your Events</h3>
                        <h3 className="info-select" onClick={this.handleAllEvents}>All Events</h3>
                        <h3 className="info-select" onClick={this.handleRequests}>Requests</h3>
                        {/* Filter by Venue? */}
                    </div>
                    <div className="display">
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
                                        <h1 className="header-text">Your Events</h1>
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
                    </div>
                </div> 
                : <div>Loading...</div>
                } 
            </Fragment>
        )
    }
}

export default ArtistHome
import React, { Fragment, Component } from 'react'
import '../style_sheets/ArtistHome.css'

class ArtistHome extends Component {

    constructor(props){
        super(props)
        this.state = {
            artist: {},
            events: [],
            loading: false
        }
    }

    async componentDidMount() {
        await this.setState({artist: this.props.artist, events: this.props.events, loading: true})
    }

    handleClick = (id) => {
        console.log(this.state.artist[0].artist_profile.avatar)

    }

    

    renderEvents = () => {
        return this.state.events.map(event => (
            <div onClick={() => this.handleClick(event.id)} className="event-card" key={event.title}>
                <div className="event-card-image" style={{backgroundImage: `url(${event.flyer})`}}></div>
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-date">{event.date}</p>
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
                        <h3>{this.state.artist[0].artist_name}</h3>
                        <h3>Your Events</h3>
                        <h3>All Events</h3>
                        {/* Filter by Venue? */}
                    </div>
                    <div className="display">
                        <div className="events-container">
                        <div className="events-header">
                            <h1 className="header-text">Your Events</h1>
                        </div>
                        <div className="card-container">
                            {this.renderEvents()}
                        </div>
                        </div>
                    </div>
                </div> 
                : <div>Loading...</div>
                } 
            </Fragment>
        )
    }
}

export default ArtistHome
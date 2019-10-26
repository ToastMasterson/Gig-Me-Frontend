import React, {Component} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import ExternalApi from '../components/ExternalApi'
import ArtistProfile from './ArtistProfile'
import ArtistHome from './ArtistHome'
import PublicProfile from '../components/PublicProfile'
import PrivateRoute from '../components/PrivateRoute'
import BrowseArtists from './BrowseArtists'
import Event from '../components/Event'

export default class Main extends Component {

    state = {
        artist: {},
        requests: [],
        loaded: false,
        visitProfile: false,
        profileToVisit: {},
        browse: this.props.browse,
        artistHome: this.props.artistHome,
        events: [],
        visitEvent: false,
        eventToVisit: {}
    }

    async componentDidMount(){
        await fetch(`http://localhost:3001/api/artists/${this.props.user.nickname}`)
        .then(res => res.json()).then(artist => this.setState({artist: artist}))
        await fetch('http://localhost:3001/api/events')
        .then(res => res.json()).then(events => this.setState({events: events, loaded: true}))
    }

    componentWillReceiveProps() {
        this.setState({browse: this.props.browse, visitProfile: false, visitEvent: false, artistHome: true})
    }

    visitProfile = (artist) => {
        console.log(artist)
        this.setState({visitProfile: true, profileToVisit: artist, browse: false})
    }

    visitEvent = (id) => {
        console.log(id)
        const event = this.state.events.filter(event => event.id === id)
        this.setState({artistHome: false, visitEvent: true, eventToVisit: event})
    }

    render(){
        return(
        <div className="main">
            {this.state.loaded
            ? <div>
                
                    {this.props.artistProfile
                    ? <ArtistProfile artist={this.state.artist} />
                    : null
                    }
                    {this.state.artistHome
                    ? <ArtistHome visitEvent={this.visitEvent} artist={this.state.artist} requests={this.state.requests} events={this.state.events.filter(event => event.artist_id === this.state.artist.id)} />
                    : null
                    }
                    {this.props.publicProfile
                    ? <PublicProfile user={this.props.user} artist={this.state.artist[0]} profile={this.state.artist[0].artist_profile} />
                    : null
                    }
                    {this.state.browse
                    ? <BrowseArtists visitProfile={this.visitProfile} />
                    : null
                    }
                    {this.state.visitProfile
                    ? <PublicProfile artist={this.state.profileToVisit} profile={this.state.profileToVisit.artist_profile} />
                    : null
                    }
                    {this.state.visitEvent
                    ? <Event artist={this.state.artist} event={this.state.eventToVisit[0]} />
                    : null
                    }
                </div>
            : <div>Loading...</div>
            
            }
        </div>
        )
    }
}
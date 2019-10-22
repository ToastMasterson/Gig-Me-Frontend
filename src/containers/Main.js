import React, {Component} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import ExternalApi from '../components/ExternalApi'
import ArtistProfile from './ArtistProfile'
import ArtistHome from './ArtistHome'
import PublicProfile from '../components/PublicProfile'
import PrivateRoute from '../components/PrivateRoute'
import BrowseArtists from './BrowseArtists'

export default class Main extends Component {

    state = {
        artist: {},
        loaded: false,
        visitProfile: false,
        profileToVisit: {},
        browse: this.props.browse
    }

    async componentDidMount(){
        await fetch(`http://localhost:3001/api/artists/${this.props.user.nickname}`)
        .then(res => res.json()).then(artist => this.setState({artist: artist, loaded: true}))
    }

    componentWillReceiveProps() {
        this.setState({browse: this.props.browse, visitProfile: false})
    }

    visitProfile = (artist) => {
        console.log(artist)
        this.setState({visitProfile: true, profileToVisit: artist, browse: false})
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
                    {/* <PrivateRoute path="/external-api" component={ExternalApi} /> */}
                    {this.props.artistHome
                    ? <ArtistHome artist={this.state.artist} />
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
                </div>
            : <div>Loading...</div>
            
            }
        </div>
        )
    }
}
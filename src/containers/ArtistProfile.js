import React, { Fragment, Component } from 'react'
import { useAuth0 } from '../react-auth0-wrapper'

class ArtistProfile extends Component {

    state = {
        artist: {}
    }

    componentDidMount(){
        fetch(`http://localhost:3001/api/artists/${this.props.user.nickname}`)
        .then(res => res.json())
        .then(artist => this.setState({
            artist: artist
        }))
    }

    render(){
        return(

            <Fragment>
                <img src={this.props.user.picture} alt="Profile" />
                <h2>{this.props.user.name}</h2>
                <p>{this.props.user.email}</p>
            </Fragment>
        )
    }
}

export default ArtistProfile
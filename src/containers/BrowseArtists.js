import React, {Component} from 'react'
import '../style_sheets/BrowseArtists.css'


export default class BrowseArtists extends Component {

    state = {
        artists: [],
        filteredArtists: [],
        genre: ""
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/artists')
            .then(res => res.json())
            .then(artists => this.setState({artists: artists, filteredArtists: artists}))
    }

    handleClick = (artist) => {
        this.props.visitProfile(artist)
    }

    renderArtists = () => {
        return this.state.filteredArtists.map(artist => (
            <div onClick={() => this.handleClick(artist)} className="card" key={artist}>
                <img className="card-image" src={artist.artist_profile.avatar} alt="thumbnail" />
                <div className="card-name">{artist.artist_name}</div>
                <p>{artist.artist_profile.genres}</p>
            </div>
        ))
    }

    filterByGenre = (genre) => {
        this.setState({
            filteredArtists: this.state.artists.filter(artist => artist.artist_profile.genres.toLowerCase().includes(genre))
        }, () => {
            return this.state.genre === ""
                ? this.setState({filteredArtists: this.state.artists})
                : null
        })
    }

    handleChange = (event) => {
        this.setState({
            genre: event.target.value.toLowerCase()
        })
        this.filterByGenre(this.state.genre)
    }

    render(){
        return(
            <div className="browser">
                <h1>Artists</h1>
                <div>
                    <label htmlFor="genre">Filter by Genre:</label>
                    <input onChange={this.handleChange} name="genre" type="text" placeholder="Enter a genre"/>
                </div>
                <div className="spread">
                    {this.renderArtists()}
                </div>
            </div>
        )
    }
}
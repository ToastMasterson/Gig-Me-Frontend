import React, { Fragment, Component } from 'react'
import ImageUploader from 'react-images-upload'
import request from 'superagent'
import '../style_sheets/Profile.css'
import Social from '../components/forms/Social'
require('dotenv').config()



class ArtistProfile extends Component {

    state = {
        artist: {},
        profile: {},
        aFile: [],
        bFile: [],
        memberList: [],
        uploadedFileCloudinaryUrl: '',
        newSummary: "",
        newContact: "",
        newGear: "",
        newMembers: "",
        newInfluences: "",
        newGenres: "",
        avatar: false,
        banner: false,
        social: false,
        summary: false,
        contact: false,
        members: false,
        gear: false,
        influences: false,
        genres: false
    }

    componentDidMount(){
        this.setState({
            artist: this.props.artist[0], 
            profile: this.props.artist[0].artist_profile,
            facebook: this.props.artist[0].artist_profile.facebook,
            instagram: this.props.artist[0].artist_profile.instagram,
            soundcloud: this.props.artist[0].artist_profile.soundcloud,
            bandcamp: this.props.artist[0].artist_profile.bandcamp,
            memberList: this.props.artist[0].artist_profile.members.split(',')
        })
    }

    patchUrl = () => `http://localhost:3001/api/profiles/${this.state.profile.id}`

    imageUpload = (type) => (
        <ImageUploader 
            singleImage={true}
            withIcon={false}
            withLabel={false}
            buttonText='Upload Image'
            onChange={type === "avatar" ? this.onAvatarDrop : this.onBannerDrop}
            imgExtension={['.jpg', '.png']}
            maxFileSize={5242880}
        />
    )

    handleSocial = () => {
        this.state.social
            ? this.setState({social: false})
            : this.setState({social: true})
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSummary = () => {
        this.state.summary
            ? this.setState({summary: false})
            : this.setState({summary: true})
    }

    handleContact = () => {
        this.state.contact
            ? this.setState({contact: false})
            : this.setState({contact: true})
    }

    handleMembers = () => {
        this.state.members
            ? this.setState({members: false})
            : this.setState({members: true})
    }

    handleGear = () => {
        this.state.gear
            ? this.setState({gear: false})
            : this.setState({gear: true})
    }

    handleInfluences = () => {
        this.state.influences
            ? this.setState({influences: false})
            : this.setState({influences: true})
    }

    handleAvatar = () => {
        this.state.avatar
            ? this.setState({avatar: false})
            : this.setState({avatar: true})
    }

    handleBanner = () => {
        this.state.banner
            ? this.setState({banner: false})
            : this.setState({banner: true})
    }

    handleGenres = () => {
        this.state.genres
            ? this.setState({genres: false})
            : this.setState({genres: true})
    }

    onAvatarDrop = (picture) => {
        this.setState({aFile: this.state.aFile.concat(picture)})
        this.handleImageUpload(picture[0])
    }

    onBannerDrop = (picture) => {
        this.setState({bFile: this.state.bFile.concat(picture)})
        this.handleImageUpload(picture[0])
    }

    patchFetch = (key, value) => (
        fetch(this.patchUrl(), {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                [key]: value
            })
        })
    )

    saveSocial = ({facebook, instagram, bandcamp, soundcloud}) => {
        fetch(this.patchUrl(), {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                facebook: facebook,
                instagram: instagram,
                bandcamp: bandcamp,
                soundcloud: soundcloud
            })
        }).then(res => res.json())
        .then(profile => this.setState({profile: profile, social: false}))
    }

    saveSummary = (event) => {
        event.preventDefault()
        this.patchFetch("summary", this.state.newSummary)
            .then(res => res.json())
            .then(profile => this.setState({profile: profile, summary: false}))
    }

    saveContact = (event) => {
        event.preventDefault()
        this.patchFetch("email", this.state.newContact)
            .then(res => res.json())
            .then(profile => this.setState({profile: profile, contact: false}))
    }

    saveGear = (event) => {
        event.preventDefault()
        this.patchFetch("gear", this.state.newGear)
            .then(res => res.json())
            .then(profile => this.setState({profile: profile, gear: false}))
    }

    saveMembers = (event) => {
        event.preventDefault()
        this.patchFetch("members", this.state.newMembers)
            .then(res => res.json())
            .then(profile => this.setState({profile: profile, members: false}))
    }

    saveInfluences = (event) => {
        event.preventDefault()
        this.patchFetch("influences", this.state.newInfluences)
            .then(res => res.json())
            .then(profile => this.setState({profile: profile, influences: false}))
    }
    saveGenres = (event) => {
        event.preventDefault()
        this.patchFetch("genres", this.state.newGenres)
            .then(res => res.json())
            .then(profile => this.setState({profile: profile, genres: false}))
    }

    persistAvatar = (url) => {
        this.patchFetch("avatar", url)
            .then(res => res.json())
            .then(profile => this.setState({profile: profile}))
    }

    persistBanner = (url) => {
        this.patchFetch("banner", url)
            .then(res => res.json())
            .then(profile => this.setState({profile: profile}))
    }

    renderSummaryForm = () => (
        <form onSubmit={(event) => this.saveSummary(event)}>
            <input onChange={this.handleChange} type="text" name="newSummary" defaultValue={this.state.profile.summary}/>
            <input type="submit" value="Save" />
        </form>
    )

    renderContactForm = () => (
        <form onSubmit={(event) => this.saveContact(event)}>
            <input onChange={this.handleChange} type="text" name="newContact" defaultValue={this.state.profile.email}/>
            <input type="submit" value="Save" />
        </form>
    )

    renderMembersForm = () => (
        <form onSubmit={(event) => this.saveMembers(event)}>
            <input onChange={this.handleChange} type="text" name="newMembers" defaultValue={this.state.profile.members}/>
            <input type="submit" value="Save" />
        </form>
    )

    renderGearForm = () => (
        <form onSubmit={(event) => this.saveGear(event)}>
            <input onChange={this.handleChange} type="text" name="newGear" defaultValue={this.state.profile.gear}/>
            <input type="submit" value="Save" />
        </form>
    )

    renderInfluencesForm = () => (
        <form onSubmit={(event) => this.saveInfluences(event)}>
            <input onChange={this.handleChange} type="text" name="newInfluences" defaultValue={this.state.profile.influences}/>
            <input type="submit" value="Save" />
        </form>
    )

    renderGenresForm = () => (
        <form onSubmit={(event) => this.saveGenres(event)}>
            <input onChange={this.handleChange} type="text" name="newGenres" defaultValue={this.state.profile.genres}/>
            <input type="submit" value="Save" />
        </form>
    )

    

    handleImageUpload(file) {
        let upload = request.post("https://api.cloudinary.com/v1_1/gigme/image/upload")
                            .field('upload_preset', "gigmepreset")
                            .field('file', file);
    
        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }
        
            if (response.body.secure_url !== '') {
                this.setState({
                uploadedFileCloudinaryUrl: response.body.secure_url
                });
                this.state.avatar
                    ? this.persistAvatar(response.body.secure_url)
                    : this.persistBanner(response.body.secure_url)
                this.setState({avatar: false, banner: false})
            }
        });
      }

    renderSocial = () => (
        <div className="social">
            {this.state.profile.facebook !== ""
                ? <a href={this.state.profile.facebook} target="_blank" rel="noopener noreferrer">
                    <img className="icon" src="http://icons.iconarchive.com/icons/danleech/simple/256/facebook-icon.png" alt="icon" />
                </a>
                : null
            }
            {this.state.profile.instagram !== ""
                ? <a href={this.state.profile.instagram} target="_blank" rel="noopener noreferrer">
                    <img className="icon" src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png" alt="icon" />
                </a>
                : null
            }
            {this.state.profile.bandcamp !== ""
                ? <a href={this.state.profile.bandcamp} target="_blank" rel="noopener noreferrer">
                    <img className="icon" src="https://i.pinimg.com/originals/78/c6/d8/78c6d839394ec3e17cbe8696fc8dcfd8.png" alt="icon" />
                </a>
                : null
            }
            {this.state.profile.soundcloud !== ""
                ? <a href={this.state.profile.soundcloud} target="_blank" rel="noopener noreferrer">
                    <img className="icon" src="https://i1.sndcdn.com/avatars-000681921569-32qkcn-t500x500.jpg" alt="icon" />
                </a>
                : null
            }
        </div>
    )

    renderMembers = () => (
        this.state.memberList.map(member => (
            <li key={member}>{member}</li>
        ))
    )

    render(){
        return(
            <Fragment>
                <div className="profile">
                    {this.state.avatar
                        ? <div className="modal">
                            {this.imageUpload("avatar")}
                        </div>
                        : null
                    }
                    {this.state.banner
                        ? <div className="modal">
                            {this.imageUpload("banner")}
                        </div>
                        : null
                    }
                    <div className="info">
                        <img onClick={this.handleAvatar} className="avatar" src={this.state.profile.avatar} alt="profile" />
                        <h3 className="info-head" onClick={this.handleSocial}>Social Media:</h3>
                        {this.state.social
                            ? <Social profile={this.state.profile} saveSocial={this.saveSocial} />
                            : this.renderSocial()
                        }
                        <h3 onClick={this.handleSummary} className="info-head">Summary:</h3>
                        {this.state.summary
                            ? this.renderSummaryForm()
                            : <p>{this.state.profile.summary}</p>
                        }
                        <h3 onClick={this.handleContact} className="info-head">Contact:</h3>
                        {this.state.contact
                            ? this.renderContactForm()
                            : <p>{this.state.artist.email}</p>
                        }
                        <h3 onClick={this.handleInfluences} className="info-head">Influences:</h3>
                        {this.state.influences
                            ? this.renderInfluencesForm()
                            : <p className="influences">{this.state.profile.influences}</p>
                        }
                    </div>
                    <div className="middle">
                        <div className="header">
                            <div onClick={this.handleBanner} 
                                className="banner" 
                                style={{backgroundImage: `url(${this.state.profile.banner})`}}
                            >
                                <h1 className="band-name">{this.state.artist.artist_name}</h1>
                            </div>
                        </div>
                        <div className="events">
                            <h2 className="instructions-header">Click a Section to Edit</h2>
                            <div className="instructions">
                                This is your editable profile. 
                                Enter or Update your Group's Information, 
                                Click save to save changes per field.  Your Events will show on your Public Profile.
                                <br/>
                            </div>
                        </div>
                    </div>
                    <div className="info">
                        <h3 onClick={this.handleMembers} className="info-head">Members:</h3>
                            {this.state.members
                                ? this.renderMembersForm()
                                : <ul className="member-list">{this.renderMembers()}</ul>
                            }
                        <h3 onClick={this.handleGear} className="info-head">Gear:</h3>
                            {this.state.gear
                                ? this.renderGearForm()
                                : <p>{this.state.profile.gear}</p>
                            }
                        <h3 onClick={this.handleGenres} className="info-head">Genres:</h3>
                            {this.state.genres
                                ? this.renderGenresForm()
                                : <p>{this.state.profile.genres}</p>
                            }
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ArtistProfile
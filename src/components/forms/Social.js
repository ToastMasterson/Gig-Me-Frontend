import React, {Component} from 'react'

class Social extends Component {

    state = {
        facebook: this.props.facebook,
        instagram: this.props.instagram,
        bandcamp: this.props.bandcamp,
        soundcloud: this.props.soundcloud
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        this.props.saveSocial(this.state)
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} className="social-form">
                <div>
                    <img className="icon" src="http://icons.iconarchive.com/icons/danleech/simple/256/facebook-icon.png" />
                    <input onChange={this.handleChange} 
                        placeholder={this.props.profile.facebook ? this.props.profile.facebook : "Enter Link"} 
                        type="text" name="facebook" 
                    />
                </div>
                <div>
                    <img className="icon" src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png" />
                    <input onChange={this.handleChange} 
                        placeholder={this.props.profile.instagram ? this.props.profile.instagram : "Enter Link"} 
                        type="text" name="instagram" 
                    />
                </div>
                <div>
                    <img className="icon" src="https://i.pinimg.com/originals/78/c6/d8/78c6d839394ec3e17cbe8696fc8dcfd8.png" />
                    <input onChange={this.handleChange} 
                        placeholder={this.props.profile.bandcamp ? this.props.profile.bandcamp : "Enter Link"} 
                        type="text" name="bandcamp" 
                    />
                </div>
                <div>
                    <img className="icon" src="https://i1.sndcdn.com/avatars-000681921569-32qkcn-t500x500.jpg" />
                    <input onChange={this.handleChange} 
                        placeholder={this.props.profile.soundcloud ? this.props.profile.soundcloud : "Enter Link"} 
                        type="text" name="soundcloud" 
                    />
                </div>
                <div>
                    <input className="social-save" type="submit" value="Save" />
                </div>
            </form>
        )
    }
}

export default Social
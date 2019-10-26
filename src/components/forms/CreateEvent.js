import React, {Component} from 'react'
import TimePicker from 'react-time-picker'
import DatePicker from 'react-date-picker'
import CurrencyInput from 'react-currency-input'
import ImageUploader from 'react-images-upload'
import request from 'superagent'
require('dotenv').config()


export default class CreateEvent extends Component {

    state = {
        title: "",
        description: "",
        venue: 1,
        time: "",
        date: new Date(),
        flyer: "",
        price: 0.00,
        spots: 0,
        all_ages: false,
        file: [],
        uploadedFileCloudinaryUrl: "",
        amount: "",
    }

    renderVenues = () => {
        return this.props.venues.map(venue => (
            <option value={venue.id} key={venue.id}>{venue.name}</option>
        ))
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleVenueChange = (event) => {
        this.setState({[event.target.name]: parseInt(event.target.value)})
    }

    handleAges = () => {
        this.state.all_ages
            ? this.setState({all_ages: false})
            : this.setState({all_ages: true})
    }

    onTimeChange = time => this.setState({ time })
    onDateChange = date => this.setState({ date })
    onPriceChange =  (event, maskedvalue, floatvalue) => {
        this.setState({price: maskedvalue});
    }

    onDrop = (picture) => {
        this.setState({file: this.state.file.concat(picture)})
        this.handleImageUpload(picture[0])
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch('http://localhost:3001/api/events', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                venue_id: this.state.venue,
                time: this.state.time,
                date: this.state.date,
                flyer: this.state.uploadedFileCloudinaryUrl,
                price: this.state.price,
                spots: parseInt(this.state.spots),
                all_ages: this.state.all_ages,
                booker_id: this.props.bookerId
            })
        }).then(res => res.json())
        .then(event => this.props.handleYourEvents())
    }

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
          }
        });
      }

    imageUpload = () => (
        <ImageUploader 
            singleImage={true}
            withIcon={false}
            withLabel={false}
            buttonText='Upload Image'
            onChange={this.onDrop}
            imgExtension={['.jpg', '.png']}
            maxFileSize={5242880}
        />
    )

 
    render() {
        return (
            <div className="create-event-container">
                <form className="create-event-form" onSubmit={this.handleSubmit}>
                    <h1>New Event</h1>
                    <div>
                        <div className="form-input">
                            <label>Title:</label>
                                <input onChange={this.handleChange} type="text" name="title" placeholder="Event Title" />
                            
                        </div>
                        <div className="form-input">
                            <label>Description:</label>
                                <input onChange={this.handleChange} type="text" name="description" placeholder="Description" />
                            
                        </div>
                        <div className="form-input">
                            <label>Venue:</label>
                                <select name="venue" onChange={this.handleVenueChange}>
                                    {this.renderVenues()}
                                </select>
                            
                        </div>
                        <div className="form-input">
                            <label>Time:</label>
                            <TimePicker
                                onChange={this.onTimeChange}
                                disableClock={true}
                                hourAriaLabel="Hour"
                                amPmAriaLabel="Select AM/PM"
                                value={this.state.time}
                            />
                            
                        </div>
                        <div className="form-input">
                            <label>Date:</label>
                            <DatePicker
                                onChange={this.onDateChange}
                                showLeadingZeros={false}
                                minDate={new Date()}
                                value={this.state.date}
                            />
                            
                        </div>
                        <div className="form-input">
                            <label>Flyer:</label>
                                {this.imageUpload()}
                            
                        </div>
                        <div className="form-input">
                            <label>Price:</label>
                                <CurrencyInput value={this.state.price} onChange={this.onPriceChange}/>
                            
                        </div>
                        <div className="form-input">
                            <label>Slots Open:</label>
                                <input onChange={this.handleChange} type="number" name="spots" placeholder="0" />
                            
                        </div>
                        <div className="form-input">
                            <label>All Ages?</label>
                                <input onClick={this.handleAges} type="checkbox" name="all_ages" />
                            
                        </div>
                        <div className="form-submit">
                            <input onSubmit={this.handleSubmit} className="form-submit-button" type="submit" value="Submit" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
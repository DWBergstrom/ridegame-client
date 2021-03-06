import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import FinishDelete from './FinishDelete'
import FinishUpdate from './FinishUpdate'
import Weather from './Weather'
import './Finishes.scss'
const config = require('../../config.js')
const apiUrl = config.apiUrl
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'



class FinishDetail extends React.Component {

  constructor(props) {
    super(props)

    // add blank variables for weather data
    // detail value helps this component rerender when update/delete are completed
    this.state = {
      detail: true,
      unixTs: '',
      weather: '',
      weatherSummary: '',
      flashMessage: ''
    }

  }

  async componentDidMount() {

    // call to darksky for weather data
    try {
      const response = await axios.get(`${proxyUrl}` + 'https://api.darksky.net/forecast/5002c77972384623b3d6ac4853cbabfb/' + '42,-71,' + `${this.props.location.finishParams.unixTs}`)
      this.setState({weather: response.data})
      const weatherSummary = this.state.weather.hourly.summary
      this.setState({weatherSummary:weatherSummary})
    }
    catch(err) {
      this.setState({flashMessage: <p>Having trouble retrieving weather data...There may be a network issue.</p>})
    }

  }

  // create props to send to update and delete views
  render() {
    const detail = this.state.detail
    const { name, notes, date, duration, points, user, id, ride_id, distance, unixTs, flash } = this.props.location.finishParams
    const changeProps = {
      name,
      user,
      id,
      notes,
      date,
      duration,
      ride_id,
      distance,
      detail,
      flash
    }


    // generate view
    return (
      <div className="user-finishes, finishes-detail-div">
        <h1>Details for Finished Ride</h1>
        <h3>Ride: {name}</h3>
        <p>Notes: {notes}</p>
        <p>Date: {date}</p>
        <p>Duration: {duration}</p>
        <p>Distance: {distance}</p>
        <p>Points: {points}</p>
        <div className="weather-wrapper">
          <h4>Weather on this day was: </h4>
          <p>&nbsp;&nbsp; {this.state.flashMessage} <span className="weather-span">{this.state.weatherSummary}</span></p>
          <p className="weather-link">Weather data provided by <a href="https://darksky.net/dev/docs#time-machine-request" target="_blank" rel="noopener noreferrer">Dark Sky API</a></p>
        </div>
        <FinishDelete {...changeProps}/>
        <br />
        <FinishUpdate {...changeProps}/>
      </div>
    )
  }

}

export default FinishDetail

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import FinishNew from '../../finishes/components/FinishNew'
import Leaderboard from './Leaderboard'
import './Rides.scss'
import messages from '../messages.js'
const config = require('../../config.js')
const apiUrl = config.apiUrl


// Class Component
class Rides extends React.Component {

  constructor(props) {
    super(props)

    // empty rides array for rides returned from API call
    // empty flashMessage for error messages
    this.state = {
      rides: [],
      flashMessage: ''
    }
  }

  // call API to get ride resource (index only)
  async componentDidMount() {
    try {
      const response = await axios.get(`${apiUrl}` + '/rides')
      this.setState({rides: response.data.rides})
    }
    // handle error message to user
    catch(err) {
      this.setState({flashMessage: <p>There may be a network issue...try clicking Rides again</p>})
    }
  }


  render() {
    let individualRide
    const { rides } = this.state
    const { flash, user } = this.props

    // add logic for loading / no rides
    if (rides.length === 0) {
      individualRide = <p>Looking for rides...</p>
      this.componentDidMount()
    } else {
      individualRide = rides.map(ride => {
        // dustructure desired variables
        const { id, name, photo_url, description, distance, points } = ride

        // create object to send as props for the CREATE action
        const finishData = {
          user_id: this.props.user.id,
          ride_id: id,
          distance: distance,
          notes: '',
          date: '',
          duration: '',
          flash
        }

        // create another set of prop data to send through to ride detail view
        const detail_link = {
          pathname: `/rides/${id}`,
          rideParams: {id, name, photo_url, description, distance, points, user, flash}
        }

        // generate the view with the Google Maps iframe of the location
        return (
          <div className="ride-div" key={id}>
            <h1><Link to={detail_link} user={user} replace>Ride: {name}</Link></h1>
            <p>{description}</p>
            <p>Distance: {distance} miles</p>
            <p>Points: {points}</p>
            <iframe src={photo_url} style={{border:0, width:'100%', height:450, frameBorder:0}} allowFullScreen></iframe>
            <FinishNew user={user} {...finishData}/>
            <br />
          </div>
        )
      })
    }

    // leaderboard is disabled for now while re-thinking how to safely get user data from API
    return (
      <React.Fragment>
        <Leaderboard user={user} component={Leaderboard} />

        <div className="">
          <h1>Available Rides <img src="https://image.flaticon.com/icons/svg/130/130066.svg" height="50px"/></h1>
          {individualRide}
          {this.state.flashMessage}
        </div>
      </React.Fragment>
    )
  }

}

export default Rides

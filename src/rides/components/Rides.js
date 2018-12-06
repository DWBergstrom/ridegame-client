import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import FinishNew from '../../finishes/components/FinishNew'
import Leaderboard from './Leaderboard'
import './Rides.scss'
const config = require('../../config.js')
const apiUrl = config.apiUrl


// Class Component
class Rides extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      rides: []
    }
  }

  async componentDidMount() {
    const response = await axios.get(`${apiUrl}` + '/rides')
    this.setState({rides: response.data.rides})
    console.log('componentDidMount in rides has run')
  }

  render() {

    let individualRide
    const { rides } = this.state
    const user = this.props.user

    if (rides.length === 0) {
      individualRide = <p>Loading</p>
      this.componentDidMount()
    } else {
      individualRide = rides.map(ride => {
        const { id, name, photo_url, description, distance, points } = ride


        const finishData = {
          user_id: this.props.user.id,
          ride_id: id,
          distance: distance,
          notes: '',
          date: '',
          duration: ''
        }

        const detail_link = {
          pathname: `/rides/${id}`,
          rideParams: {id, name, photo_url, description, distance, points, user}
        }


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
    console.log('render in rides has run')
    return (
      <React.Fragment>
        <Leaderboard user={user} component={Leaderboard} />
        <div className="ride-container">
          <h1>Available Rides</h1>
          {individualRide}
        </div>
      </React.Fragment>
    )
  }

}

export default Rides

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import FinishNew from '../../finishes/components/FinishNew'
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

  }

  render() {

    let individualRide
    const { rides } = this.state
    const user = this.props.user

    if (rides.length === 0) {
      individualRide = <p>Loading</p>
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
            <p>Distance: {distance}</p>
            <p>Points: {points}</p>
            <img className="ride-image" src={photo_url}></img>
            <FinishNew user={user} {...finishData}/>
            <br />
          </div>
        )
      })
    }
    return (
      <React.Fragment>
        <h2 className="leaderboard-aside">Leaderboard</h2>
        <h1>Rides</h1>
        {individualRide}
      </React.Fragment>
    )
  }

}

export default Rides

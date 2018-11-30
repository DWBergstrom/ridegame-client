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
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39196.08315236001!2d-71.23622179902506!3d42.38258817341337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3782b52ba7537%3A0x515285872b86c6c8!2sCharles+River+Park+1!5e0!3m2!1sen!2sus!4v1544048434412" style={{border:0, width:'90%', height:450, frameBorder:0}} allowFullScreen></iframe>
            <FinishNew user={user} {...finishData}/>
            <br />
          </div>
        )
      })
    }
    return (
      <React.Fragment>
        <Leaderboard user={user} component={Leaderboard} />
        <div className="ride-container">
          <h1>Rides</h1>
          {individualRide}
        </div>
      </React.Fragment>
    )
  }

}

export default Rides

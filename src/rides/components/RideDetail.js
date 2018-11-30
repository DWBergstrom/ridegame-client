import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import FinishNew from '../../finishes/components/FinishNew'
const config = require('../../config.js')
const apiUrl = config.apiUrl


class RideDetail extends React.Component {


  render () {
    console.log('this.props in ride detail is ', this.props)
    const { id, name, photo_url, description, distance, points, user } = this.props.location.rideParams
    const finishData = {
      user_id: user.id,
      ride_id: id,
      distance: distance,
      notes: '',
      date: '',
      duration: ''
    }
    return (
      <div className="ride-div">
        <h2>Ride Detail</h2>
        <h3> Name: {name} </h3>
        <p>{description}</p>
        <p>Distance: {distance}</p>
        <p>Points: {points}</p>
        <img className="ride-image" src={photo_url}></img>
        <FinishNew user={user} {...finishData}/>
      </div>
    )
  }

}

export default RideDetail
